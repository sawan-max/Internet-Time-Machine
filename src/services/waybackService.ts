/**
 * Wayback Machine Service — Handles all Internet Archive API interactions.
 *
 * Uses the Vite dev server proxy to bypass CORS restrictions:
 * - /api/cdx  → proxies to https://web.archive.org/cdx/search/cdx
 * - /api/wayback → proxies to https://archive.org/wayback/available
 *
 * For production, configure equivalent proxy routes on the production server.
 */

import type { WaybackSnapshot } from '../types';

// ─── Cache ──────────────────────────────────────────────────────
interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes
const cache = new Map<string, CacheEntry<unknown>>();

function getCached<T>(key: string): T | null {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.timestamp > CACHE_TTL_MS) {
    cache.delete(key);
    return null;
  }
  return entry.data as T;
}

function setCache<T>(key: string, data: T): void {
  cache.set(key, { data, timestamp: Date.now() });
}

// ─── Timestamp Parsing ──────────────────────────────────────────
function parseTimestamp(ts: string): { year: number; formattedDate: string } {
  const year = parseInt(ts.substring(0, 4), 10);
  const month = parseInt(ts.substring(4, 6), 10);
  const day = parseInt(ts.substring(6, 8), 10);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const monthName = monthNames[month - 1] || 'Unknown';
  const formattedDate = `${monthName} ${day}, ${year}`;
  return { year, formattedDate };
}

// ─── CDX API ────────────────────────────────────────────────────

/**
 * Fetch all available snapshots for a domain from the CDX API.
 * Uses `collapse=timestamp:4` to get one snapshot per year.
 */
export async function getAvailableSnapshots(
  domain: string,
): Promise<WaybackSnapshot[]> {
  const cacheKey = `cdx:${domain}`;
  const cached = getCached<WaybackSnapshot[]>(cacheKey);
  if (cached) return cached;

  const params = new URLSearchParams({
    url: domain,
    output: 'json',
    fl: 'timestamp,original,statuscode',
    filter: 'statuscode:200',
    collapse: 'timestamp:4', // One per year
    limit: '100',
  });

  const response = await fetch(`/api/cdx?${params.toString()}`);

  if (!response.ok) {
    throw new Error(`CDX API returned status ${response.status}`);
  }

  const text = await response.text();
  if (!text.trim()) return [];

  let data: string[][];
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error('Failed to parse CDX API response');
  }

  // First row is headers: ["timestamp", "original", "statuscode"]
  if (data.length <= 1) return [];

  const snapshots: WaybackSnapshot[] = data.slice(1).map((row) => {
    const [timestamp, original, statuscode] = row;
    const { year, formattedDate } = parseTimestamp(timestamp);
    return { timestamp, original, statuscode, year, formattedDate };
  });

  setCache(cacheKey, snapshots);
  return snapshots;
}

/**
 * Group snapshots by year.
 */
export function getSnapshotsByYear(
  snapshots: WaybackSnapshot[],
): Map<number, WaybackSnapshot[]> {
  const map = new Map<number, WaybackSnapshot[]>();
  for (const snap of snapshots) {
    const existing = map.get(snap.year) || [];
    existing.push(snap);
    map.set(snap.year, existing);
  }
  return map;
}

/**
 * Find the closest snapshot to a given year from a list of snapshots.
 */
export function getClosestSnapshot(
  snapshots: WaybackSnapshot[],
  year: number,
): WaybackSnapshot | undefined {
  if (snapshots.length === 0) return undefined;
  return snapshots.reduce((closest, snap) =>
    Math.abs(snap.year - year) < Math.abs(closest.year - year) ? snap : closest,
  );
}

/**
 * Build the Wayback Machine replay URL for a given timestamp and domain.
 */
export function buildSnapshotUrl(timestamp: string, url: string): string {
  // Ensure the URL has a protocol
  const fullUrl = url.startsWith('http') ? url : `https://${url}`;
  return `https://web.archive.org/web/${timestamp}/${fullUrl}`;
}

/**
 * Select representative years from a list of snapshots.
 * If ≤ 15 years, returns all. Otherwise picks evenly-spaced years,
 * always including the first and last.
 */
export function getRepresentativeYears(
  snapshots: WaybackSnapshot[],
  maxYears = 15,
): number[] {
  const allYears = [...new Set(snapshots.map((s) => s.year))].sort(
    (a, b) => a - b,
  );

  if (allYears.length <= maxYears) return allYears;

  // Always include first and last
  const result: number[] = [allYears[0]];
  const step = (allYears.length - 1) / (maxYears - 1);

  for (let i = 1; i < maxYears - 1; i++) {
    const idx = Math.round(i * step);
    const year = allYears[idx];
    if (!result.includes(year)) {
      result.push(year);
    }
  }

  result.push(allYears[allYears.length - 1]);
  return [...new Set(result)].sort((a, b) => a - b);
}

/**
 * Use the Wayback Availability API to find the closest snapshot
 * to a specific timestamp.
 */
export async function checkAvailability(
  domain: string,
  timestamp?: string,
): Promise<{ available: boolean; url?: string; timestamp?: string } | null> {
  const cacheKey = `avail:${domain}:${timestamp || 'latest'}`;
  const cached = getCached<{
    available: boolean;
    url?: string;
    timestamp?: string;
  }>(cacheKey);
  if (cached) return cached;

  const params = new URLSearchParams({ url: domain });
  if (timestamp) params.set('timestamp', timestamp);

  const response = await fetch(`/api/wayback?${params.toString()}`);

  if (!response.ok) {
    throw new Error(`Availability API returned status ${response.status}`);
  }

  const data = await response.json();
  const snap = data?.archived_snapshots?.closest;

  const result = snap
    ? { available: snap.available === true, url: snap.url, timestamp: snap.timestamp }
    : { available: false };

  setCache(cacheKey, result);
  return result;
}
