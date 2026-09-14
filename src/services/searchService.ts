/**
 * Search Service — Unified search across domains, years, technologies, and events.
 */

import { SearchResult } from '../types';
import { demoWebsites } from '../data/websites';
import { technologies } from '../data/technologies';
import { onThisDayEvents } from '../data/onThisDay';

export function searchAll(query: string): SearchResult[] {
  if (!query || query.trim().length === 0) return [];

  const q = query.toLowerCase().trim();
  const results: SearchResult[] = [];

  // Search websites
  demoWebsites
    .filter(w => w.name.toLowerCase().includes(q) || w.domain.toLowerCase().includes(q) || w.category.toLowerCase().includes(q))
    .forEach(w => {
      results.push({
        type: 'website',
        title: w.name,
        subtitle: `${w.domain} — ${w.category}`,
        url: `/explore/${w.domain}`,
        icon: w.logo,
      });
    });

  // Search by year
  const yearMatch = q.match(/^(19|20)\d{2}$/);
  if (yearMatch) {
    const year = parseInt(q);
    results.push({
      type: 'year',
      title: `Year ${year}`,
      subtitle: `Explore websites from ${year}`,
      url: `/explore/google.com?year=${year}`,
      icon: '📅',
    });
  }

  // Search technologies
  technologies
    .filter(t => t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q))
    .forEach(t => {
      results.push({
        type: 'technology',
        title: t.name,
        subtitle: `${t.period} — ${t.category}`,
        url: `/eras`,
        icon: t.icon,
      });
    });

  // Search events
  onThisDayEvents
    .filter(e => e.title.toLowerCase().includes(q) || e.description.toLowerCase().includes(q))
    .slice(0, 3)
    .forEach(e => {
      results.push({
        type: 'event',
        title: e.title,
        subtitle: e.date,
        url: '/',
        icon: '📰',
      });
    });

  return results.slice(0, 10);
}
