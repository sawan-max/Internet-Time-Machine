import { Website } from '../types';

export const demoWebsites: Website[] = [
  {
    domain: 'google.com',
    name: 'Google',
    founded: 1998,
    category: 'Search / Technology',
    description: 'The world\'s most-used search engine, evolving from a Stanford research project into a global technology ecosystem.',
    logo: '🔍',
    color: '#4285F4',
    firstArchived: 1998,
    snapshotCount: 245,
    yearsTracked: 28,
    majorRedesigns: 8,
    isDemo: true,
  },
  {
    domain: 'youtube.com',
    name: 'YouTube',
    founded: 2005,
    category: 'Video / Social Platform',
    description: 'From a dating-site pivot to the world\'s largest video platform, YouTube redefined how we create and consume media.',
    logo: '▶️',
    color: '#FF0000',
    firstArchived: 2005,
    snapshotCount: 189,
    yearsTracked: 21,
    majorRedesigns: 6,
    isDemo: true,
  },
  {
    domain: 'apple.com',
    name: 'Apple',
    founded: 1976,
    category: 'Technology / Consumer Electronics',
    description: 'Apple\'s website mirrors the company\'s design philosophy — evolving from cluttered product pages to a masterclass in minimal, editorial web design.',
    logo: '🍎',
    color: '#A2AAAD',
    firstArchived: 1996,
    snapshotCount: 312,
    yearsTracked: 30,
    majorRedesigns: 10,
    isDemo: true,
  },
  {
    domain: 'amazon.com',
    name: 'Amazon',
    founded: 1994,
    category: 'E-commerce / Cloud',
    description: 'From an online bookstore to the "Everything Store," Amazon\'s web presence evolved alongside its business transformation.',
    logo: '📦',
    color: '#FF9900',
    firstArchived: 1995,
    snapshotCount: 421,
    yearsTracked: 31,
    majorRedesigns: 9,
    isDemo: true,
  },
  {
    domain: 'wikipedia.org',
    name: 'Wikipedia',
    founded: 2001,
    category: 'Reference / Encyclopedia',
    description: 'The free encyclopedia that anyone can edit — Wikipedia\'s design prioritized content accessibility over visual trends.',
    logo: '📚',
    color: '#636466',
    firstArchived: 2001,
    snapshotCount: 167,
    yearsTracked: 25,
    majorRedesigns: 4,
    isDemo: true,
  },
  {
    domain: 'facebook.com',
    name: 'Facebook',
    founded: 2004,
    category: 'Social Network',
    description: 'From a Harvard dorm room project to Meta\'s social platform, Facebook\'s interface evolved through every major web design era.',
    logo: '👥',
    color: '#1877F2',
    firstArchived: 2004,
    snapshotCount: 198,
    yearsTracked: 22,
    majorRedesigns: 7,
    isDemo: true,
  },
  {
    domain: 'netflix.com',
    name: 'Netflix',
    founded: 1997,
    category: 'Entertainment / Streaming',
    description: 'Netflix transitioned from a DVD mail service to the streaming giant — its website tells the story of digital entertainment\'s evolution.',
    logo: '🎬',
    color: '#E50914',
    firstArchived: 1999,
    snapshotCount: 203,
    yearsTracked: 27,
    majorRedesigns: 8,
    isDemo: true,
  },
  {
    domain: 'reddit.com',
    name: 'Reddit',
    founded: 2005,
    category: 'Social / Community',
    description: 'The "front page of the internet" evolved from a bare-bones link aggregator into a rich community platform.',
    logo: '🤖',
    color: '#FF4500',
    firstArchived: 2005,
    snapshotCount: 156,
    yearsTracked: 21,
    majorRedesigns: 3,
    isDemo: true,
  },
];

export function getWebsite(domain: string): Website | undefined {
  return demoWebsites.find(w => w.domain === domain);
}

export function searchWebsites(query: string): Website[] {
  const q = query.toLowerCase();
  return demoWebsites.filter(
    w =>
      w.domain.toLowerCase().includes(q) ||
      w.name.toLowerCase().includes(q) ||
      w.category.toLowerCase().includes(q)
  );
}
