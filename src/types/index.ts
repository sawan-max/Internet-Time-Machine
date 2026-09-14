// ─── Core Website Types ────────────────────────────────────────
export interface Website {
  domain: string;
  name: string;
  founded: number;
  category: string;
  description: string;
  logo: string;
  color: string;
  firstArchived: number;
  snapshotCount: number;
  yearsTracked: number;
  majorRedesigns: number;
  isDemo: boolean;
}

// ─── Snapshot Types ────────────────────────────────────────────
export interface Snapshot {
  id: string;
  domain: string;
  year: number;
  date: string;
  title: string;
  description: string;
  designCharacteristics: string[];
  technologies: string[];
  imageUrl?: string;
  archiveUrl?: string;
  isDemo: boolean;
  /** Raw Wayback CDX timestamp, e.g. "20221015123456" */
  waybackTimestamp?: string;
  /** Where this snapshot data came from */
  source?: 'wayback' | 'demo';
}

// ─── Wayback Machine Types ─────────────────────────────────────
export interface WaybackSnapshot {
  timestamp: string;
  original: string;
  statuscode: string;
  year: number;
  formattedDate: string;
}

// ─── Timeline Types ───────────────────────────────────────────
export interface TimelineEvent {
  year: number;
  title: string;
  description: string;
  type: 'launch' | 'redesign' | 'feature' | 'milestone' | 'acquisition';
  source?: string;
  isDemo: boolean;
}

// ─── Technology Types ─────────────────────────────────────────
export interface Technology {
  name: string;
  period: string;
  startYear: number;
  endYear?: number;
  icon: string;
  description: string;
  category: 'frontend' | 'backend' | 'infrastructure' | 'paradigm';
  significance: string;
}

// ─── Milestone Types ──────────────────────────────────────────
export interface Milestone {
  year: number;
  title: string;
  description: string;
  source?: string;
  isDemo: boolean;
}

// ─── Comparison Types ─────────────────────────────────────────
export interface ComparisonDimension {
  label: string;
  websiteA: number;
  websiteB: number;
}

export interface Comparison {
  websiteA: Website;
  websiteB: Website;
  dimensions: ComparisonDimension[];
  changes: string[];
}

// ─── AI Types ─────────────────────────────────────────────────
export interface AIMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  sources?: string[];
  relatedYears?: number[];
  isDemo: boolean;
}

export interface AIInsight {
  query: string;
  response: string;
  sources: string[];
  relatedSnapshots: number[];
  isDemo: boolean;
}

// ─── Website DNA Types ────────────────────────────────────────
export interface DNADimension {
  label: string;
  value: number; // 0-100
  icon: string;
}

export interface WebsiteDNA {
  domain: string;
  dimensions: DNADimension[];
  isDemo: boolean;
}

// ─── Era Types ────────────────────────────────────────────────
export interface Era {
  id: string;
  name: string;
  subtitle: string;
  period: string;
  startYear: number;
  endYear: number;
  description: string;
  characteristics: string[];
  technologies: string[];
  popularWebsites: string[];
  designTrends: string[];
  color: string;
}

// ─── Historical Event Types ──────────────────────────────────
export interface HistoricalEvent {
  date: string;
  month: number;
  day: number;
  year: number;
  title: string;
  description: string;
  source?: string;
  isDemo: boolean;
}

// ─── Change Reason Types ─────────────────────────────────────
export interface ChangeReason {
  category: string;
  icon: string;
  title: string;
  description: string;
  isDemo: boolean;
}

// ─── Stats Types ─────────────────────────────────────────────
export interface StatCard {
  label: string;
  value: string;
  suffix?: string;
  icon: string;
  isDemo: boolean;
}

// ─── Search Types ────────────────────────────────────────────
export interface SearchResult {
  type: 'website' | 'year' | 'technology' | 'event';
  title: string;
  subtitle: string;
  url: string;
  icon: string;
}

// ─── Evolution Score ─────────────────────────────────────────
export interface EvolutionMetric {
  label: string;
  score: number; // 0-100
  color: string;
}

export interface EvolutionScore {
  overall: number;
  metrics: EvolutionMetric[];
  isDemo: boolean;
}
