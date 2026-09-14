/**
 * Archive Service — Abstraction layer for historical website data.
 *
 * Three implementations:
 * - DemoArchiveService: Uses local demo data (original behavior)
 * - WaybackArchiveService: Fetches real data from the Internet Archive
 * - HybridArchiveService: Tries Wayback first, falls back to demo data
 *
 * The exported singleton is a HybridArchiveService.
 */

import { Snapshot, Website } from '../types';
import { getSnapshots as getDemoSnapshots, getSnapshot as getDemoSnapshot, getAvailableYears as getDemoYears } from '../data/snapshots';
import { getWebsite as getDemoWebsite, demoWebsites, searchWebsites as demoSearch } from '../data/websites';
import { getMilestones as getDemoMilestones } from '../data/milestones';
import { Milestone } from '../types';
import * as wayback from './waybackService';

// ─── Archive Service Interface ────────────────────────────────
export interface IArchiveService {
  getSnapshots(domain: string): Promise<Snapshot[]>;
  getSnapshot(domain: string, year: number): Promise<Snapshot | undefined>;
  getAvailableYears(domain: string): Promise<number[]>;
  getWebsite(domain: string): Promise<Website | undefined>;
  getAllWebsites(): Promise<Website[]>;
  searchWebsites(query: string): Promise<Website[]>;
  getMilestones(domain: string): Promise<Milestone[]>;
  checkAvailability(domain: string): Promise<boolean>;
  /** Returns the data source for the most recent query on this domain */
  getDataSource(domain: string): 'wayback' | 'demo' | null;
}

// ─── Demo Implementation ──────────────────────────────────────
class DemoArchiveService implements IArchiveService {
  private simulateDelay(): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 400));
  }

  async getSnapshots(domain: string): Promise<Snapshot[]> {
    await this.simulateDelay();
    return getDemoSnapshots(domain).map(s => ({ ...s, source: 'demo' as const }));
  }

  async getSnapshot(domain: string, year: number): Promise<Snapshot | undefined> {
    await this.simulateDelay();
    const s = getDemoSnapshot(domain, year);
    return s ? { ...s, source: 'demo' as const } : undefined;
  }

  async getAvailableYears(domain: string): Promise<number[]> {
    await this.simulateDelay();
    return getDemoYears(domain);
  }

  async getWebsite(domain: string): Promise<Website | undefined> {
    await this.simulateDelay();
    return getDemoWebsite(domain);
  }

  async getAllWebsites(): Promise<Website[]> {
    await this.simulateDelay();
    return demoWebsites;
  }

  async searchWebsites(query: string): Promise<Website[]> {
    await this.simulateDelay();
    return demoSearch(query);
  }

  async getMilestones(domain: string): Promise<Milestone[]> {
    await this.simulateDelay();
    return getDemoMilestones(domain);
  }

  async checkAvailability(domain: string): Promise<boolean> {
    await this.simulateDelay();
    return getDemoWebsite(domain) !== undefined;
  }

  getDataSource(): 'demo' {
    return 'demo';
  }
}

// ─── Wayback Machine Implementation ──────────────────────────
class WaybackArchiveService {
  /**
   * Fetch real snapshots from the Wayback Machine CDX API.
   * Returns Snapshot[] in the app's format with source='wayback'.
   */
  async getSnapshots(domain: string): Promise<Snapshot[]> {
    const waybackSnapshots = await wayback.getAvailableSnapshots(domain);
    if (waybackSnapshots.length === 0) return [];

    // Get representative years if there are too many
    const representativeYears = wayback.getRepresentativeYears(waybackSnapshots);

    // For each representative year, pick the first snapshot from that year
    const byYear = wayback.getSnapshotsByYear(waybackSnapshots);
    const snapshots: Snapshot[] = [];

    for (const year of representativeYears) {
      const yearSnapshots = byYear.get(year);
      if (!yearSnapshots || yearSnapshots.length === 0) continue;

      const ws = yearSnapshots[0];
      const archiveUrl = wayback.buildSnapshotUrl(ws.timestamp, ws.original);

      snapshots.push({
        id: `wayback-${domain}-${ws.timestamp}`,
        domain,
        year: ws.year,
        date: ws.formattedDate,
        title: `${domain} — ${ws.year}`,
        description: `Archived snapshot from ${ws.formattedDate}`,
        designCharacteristics: [],
        technologies: [],
        archiveUrl,
        isDemo: false,
        waybackTimestamp: ws.timestamp,
        source: 'wayback',
      });
    }

    return snapshots;
  }

  /**
   * Get a snapshot for a specific year, picking the closest available one.
   */
  async getSnapshot(domain: string, year: number): Promise<Snapshot | undefined> {
    const waybackSnapshots = await wayback.getAvailableSnapshots(domain);
    const closest = wayback.getClosestSnapshot(waybackSnapshots, year);
    if (!closest) return undefined;

    const archiveUrl = wayback.buildSnapshotUrl(closest.timestamp, closest.original);

    return {
      id: `wayback-${domain}-${closest.timestamp}`,
      domain,
      year: closest.year,
      date: closest.formattedDate,
      title: `${domain} — ${closest.year}`,
      description: `Archived snapshot from ${closest.formattedDate}`,
      designCharacteristics: [],
      technologies: [],
      archiveUrl,
      isDemo: false,
      waybackTimestamp: closest.timestamp,
      source: 'wayback',
    };
  }

  /**
   * Build a synthetic Website object from Wayback data.
   */
  buildWebsiteFromSnapshots(domain: string, snapshots: Snapshot[]): Website {
    const years = snapshots.map(s => s.year).sort((a, b) => a - b);
    const firstYear = years[0] || new Date().getFullYear();
    const lastYear = years[years.length - 1] || new Date().getFullYear();

    // Try to extract a readable name from the domain
    const namePart = domain.split('.')[0];
    const name = namePart.charAt(0).toUpperCase() + namePart.slice(1);

    return {
      domain,
      name,
      founded: firstYear,
      category: 'Website',
      description: `Archived history of ${domain} from the Internet Archive Wayback Machine.`,
      logo: '🌐',
      color: '#38bdf8',
      firstArchived: firstYear,
      snapshotCount: snapshots.length,
      yearsTracked: lastYear - firstYear,
      majorRedesigns: 0,
      isDemo: false,
    };
  }
}

// ─── Hybrid Implementation ───────────────────────────────────
class HybridArchiveService implements IArchiveService {
  private waybackService = new WaybackArchiveService();
  private demoService = new DemoArchiveService();
  private dataSourceMap = new Map<string, 'wayback' | 'demo'>();
  private snapshotCache = new Map<string, Snapshot[]>();

  /**
   * Try Wayback first, fall back to demo data.
   */
  async getSnapshots(domain: string): Promise<Snapshot[]> {
    // Check snapshot cache first
    const cached = this.snapshotCache.get(domain);
    if (cached) return cached;

    // Try Wayback Machine
    try {
      const waybackSnapshots = await this.waybackService.getSnapshots(domain);
      if (waybackSnapshots.length > 0) {
        this.dataSourceMap.set(domain, 'wayback');
        this.snapshotCache.set(domain, waybackSnapshots);
        return waybackSnapshots;
      }
    } catch (err) {
      console.warn(`[HybridArchiveService] Wayback failed for ${domain}:`, err);
    }

    // Fall back to demo
    const demoSnapshots = await this.demoService.getSnapshots(domain);
    if (demoSnapshots.length > 0) {
      this.dataSourceMap.set(domain, 'demo');
      this.snapshotCache.set(domain, demoSnapshots);
    }
    return demoSnapshots;
  }

  async getSnapshot(domain: string, year: number): Promise<Snapshot | undefined> {
    // Ensure snapshots are loaded (populates dataSourceMap)
    const all = await this.getSnapshots(domain);

    // Find exact match or closest
    const exact = all.find(s => s.year === year);
    if (exact) return exact;

    // Closest
    if (all.length === 0) return undefined;
    return all.reduce((closest, s) =>
      Math.abs(s.year - year) < Math.abs(closest.year - year) ? s : closest,
    );
  }

  async getAvailableYears(domain: string): Promise<number[]> {
    const snapshots = await this.getSnapshots(domain);
    return snapshots.map(s => s.year);
  }

  async getWebsite(domain: string): Promise<Website | undefined> {
    const source = this.dataSourceMap.get(domain);

    if (source === 'wayback') {
      const snapshots = this.snapshotCache.get(domain) || [];
      return this.waybackService.buildWebsiteFromSnapshots(domain, snapshots);
    }

    // If source is unknown, try to resolve snapshots first
    if (!source) {
      const snapshots = await this.getSnapshots(domain);
      if (snapshots.length > 0 && this.dataSourceMap.get(domain) === 'wayback') {
        return this.waybackService.buildWebsiteFromSnapshots(domain, snapshots);
      }
    }

    return this.demoService.getWebsite(domain);
  }

  async getAllWebsites(): Promise<Website[]> {
    return this.demoService.getAllWebsites();
  }

  async searchWebsites(query: string): Promise<Website[]> {
    return this.demoService.searchWebsites(query);
  }

  async getMilestones(domain: string): Promise<Milestone[]> {
    const source = this.dataSourceMap.get(domain);
    if (source === 'wayback') {
      // No fabricated milestones for real data
      return [];
    }
    return this.demoService.getMilestones(domain);
  }

  async checkAvailability(domain: string): Promise<boolean> {
    // Try wayback first
    try {
      const result = await wayback.checkAvailability(domain);
      if (result?.available) return true;
    } catch {
      // Fall through
    }
    return this.demoService.checkAvailability(domain);
  }

  getDataSource(domain: string): 'wayback' | 'demo' | null {
    return this.dataSourceMap.get(domain) || null;
  }
}

// ─── Export singleton instance ────────────────────────────────
export const archiveService: IArchiveService = new HybridArchiveService();
