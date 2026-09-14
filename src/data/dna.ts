import { WebsiteDNA, ChangeReason, EvolutionScore } from '../types';

export const websiteDNAData: Record<string, WebsiteDNA> = {
  'google.com': {
    domain: 'google.com',
    dimensions: [
      { label: 'Simplicity', value: 92, icon: '✨' },
      { label: 'Interactivity', value: 78, icon: '🖱️' },
      { label: 'Visual Density', value: 25, icon: '📊' },
      { label: 'Mobile Focus', value: 95, icon: '📱' },
      { label: 'Social Features', value: 35, icon: '👥' },
      { label: 'AI Integration', value: 90, icon: '🤖' },
    ],
    isDemo: true,
  },
  'youtube.com': {
    domain: 'youtube.com',
    dimensions: [
      { label: 'Simplicity', value: 55, icon: '✨' },
      { label: 'Interactivity', value: 92, icon: '🖱️' },
      { label: 'Visual Density', value: 75, icon: '📊' },
      { label: 'Mobile Focus', value: 90, icon: '📱' },
      { label: 'Social Features', value: 85, icon: '👥' },
      { label: 'AI Integration', value: 80, icon: '🤖' },
    ],
    isDemo: true,
  },
  'apple.com': {
    domain: 'apple.com',
    dimensions: [
      { label: 'Simplicity', value: 88, icon: '✨' },
      { label: 'Interactivity', value: 70, icon: '🖱️' },
      { label: 'Visual Density', value: 40, icon: '📊' },
      { label: 'Mobile Focus', value: 92, icon: '📱' },
      { label: 'Social Features', value: 15, icon: '👥' },
      { label: 'AI Integration', value: 65, icon: '🤖' },
    ],
    isDemo: true,
  },
  'amazon.com': {
    domain: 'amazon.com',
    dimensions: [
      { label: 'Simplicity', value: 30, icon: '✨' },
      { label: 'Interactivity', value: 85, icon: '🖱️' },
      { label: 'Visual Density', value: 90, icon: '📊' },
      { label: 'Mobile Focus', value: 88, icon: '📱' },
      { label: 'Social Features', value: 55, icon: '👥' },
      { label: 'AI Integration', value: 82, icon: '🤖' },
    ],
    isDemo: true,
  },
  'wikipedia.org': {
    domain: 'wikipedia.org',
    dimensions: [
      { label: 'Simplicity', value: 75, icon: '✨' },
      { label: 'Interactivity', value: 45, icon: '🖱️' },
      { label: 'Visual Density', value: 65, icon: '📊' },
      { label: 'Mobile Focus', value: 78, icon: '📱' },
      { label: 'Social Features', value: 40, icon: '👥' },
      { label: 'AI Integration', value: 20, icon: '🤖' },
    ],
    isDemo: true,
  },
  'facebook.com': {
    domain: 'facebook.com',
    dimensions: [
      { label: 'Simplicity', value: 40, icon: '✨' },
      { label: 'Interactivity', value: 95, icon: '🖱️' },
      { label: 'Visual Density', value: 80, icon: '📊' },
      { label: 'Mobile Focus', value: 92, icon: '📱' },
      { label: 'Social Features', value: 98, icon: '👥' },
      { label: 'AI Integration', value: 85, icon: '🤖' },
    ],
    isDemo: true,
  },
  'netflix.com': {
    domain: 'netflix.com',
    dimensions: [
      { label: 'Simplicity', value: 72, icon: '✨' },
      { label: 'Interactivity', value: 80, icon: '🖱️' },
      { label: 'Visual Density', value: 70, icon: '📊' },
      { label: 'Mobile Focus', value: 90, icon: '📱' },
      { label: 'Social Features', value: 30, icon: '👥' },
      { label: 'AI Integration', value: 88, icon: '🤖' },
    ],
    isDemo: true,
  },
  'reddit.com': {
    domain: 'reddit.com',
    dimensions: [
      { label: 'Simplicity', value: 50, icon: '✨' },
      { label: 'Interactivity', value: 88, icon: '🖱️' },
      { label: 'Visual Density', value: 72, icon: '📊' },
      { label: 'Mobile Focus', value: 80, icon: '📱' },
      { label: 'Social Features', value: 92, icon: '👥' },
      { label: 'AI Integration', value: 55, icon: '🤖' },
    ],
    isDemo: true,
  },
};

export const changeReasons: Record<string, ChangeReason[]> = {
  'youtube.com': [
    { category: 'User Growth', icon: '📈', title: 'Massive User Growth', description: 'YouTube\'s user base grew from millions to billions, requiring constant UI optimization for scale.', isDemo: true },
    { category: 'Mobile Adoption', icon: '📱', title: 'Mobile-First Shift', description: 'Mobile watch time surpassed desktop, driving responsive redesigns and the mobile app focus.', isDemo: true },
    { category: 'Advertising', icon: '💰', title: 'Ad Revenue Model', description: 'The advertising business model shaped the UI to support pre-rolls, mid-rolls, and sponsored content.', isDemo: true },
    { category: 'UX Improvements', icon: '🎯', title: 'Creator Economy', description: 'Features for creators (Studio, monetization, analytics) became central to the platform\'s value.', isDemo: true },
    { category: 'Competition', icon: '⚔️', title: 'TikTok Competition', description: 'Short-form video competition led to YouTube Shorts and feed algorithm changes.', isDemo: true },
    { category: 'Technology', icon: '🔧', title: 'Technology Evolution', description: 'Flash to HTML5, SD to 4K/8K, standard to HDR — technology drove continuous platform evolution.', isDemo: true },
  ],
  'google.com': [
    { category: 'User Growth', icon: '📈', title: 'Global Scale', description: 'Google scaled from serving thousands to billions of queries daily, requiring constant optimization.', isDemo: true },
    { category: 'Technology', icon: '🔧', title: 'Search Intelligence', description: 'From keyword matching to semantic understanding to AI — the search algorithm drove UI changes.', isDemo: true },
    { category: 'Competition', icon: '⚔️', title: 'Search Competition', description: 'Competition from Bing, DuckDuckGo, and AI chatbots pushed Google to innovate its interface.', isDemo: true },
    { category: 'Mobile Adoption', icon: '📱', title: 'Mobile Search', description: 'More than half of searches now happen on mobile, driving responsive and voice-first design.', isDemo: true },
    { category: 'AI Integration', icon: '🤖', title: 'AI-First Transformation', description: 'Generative AI is fundamentally reshaping how Google presents search results.', isDemo: true },
    { category: 'Branding', icon: '🎨', title: 'Material Design', description: 'Google\'s Material Design language unified the visual experience across all products.', isDemo: true },
  ],
};

export const evolutionScores: Record<string, EvolutionScore> = {
  'google.com': {
    overall: 91,
    metrics: [
      { label: 'Design Evolution', score: 88, color: '#60a5fa' },
      { label: 'Technology Evolution', score: 95, color: '#34d399' },
      { label: 'Mobile Adaptation', score: 92, color: '#f472b6' },
      { label: 'Content Evolution', score: 90, color: '#fbbf24' },
    ],
    isDemo: true,
  },
  'youtube.com': {
    overall: 87,
    metrics: [
      { label: 'Design Evolution', score: 90, color: '#60a5fa' },
      { label: 'Technology Evolution', score: 82, color: '#34d399' },
      { label: 'Mobile Adaptation', score: 95, color: '#f472b6' },
      { label: 'Content Evolution', score: 84, color: '#fbbf24' },
    ],
    isDemo: true,
  },
  'apple.com': {
    overall: 94,
    metrics: [
      { label: 'Design Evolution', score: 98, color: '#60a5fa' },
      { label: 'Technology Evolution', score: 90, color: '#34d399' },
      { label: 'Mobile Adaptation', score: 95, color: '#f472b6' },
      { label: 'Content Evolution', score: 92, color: '#fbbf24' },
    ],
    isDemo: true,
  },
  'amazon.com': {
    overall: 78,
    metrics: [
      { label: 'Design Evolution', score: 65, color: '#60a5fa' },
      { label: 'Technology Evolution', score: 90, color: '#34d399' },
      { label: 'Mobile Adaptation', score: 82, color: '#f472b6' },
      { label: 'Content Evolution', score: 75, color: '#fbbf24' },
    ],
    isDemo: true,
  },
  'wikipedia.org': {
    overall: 62,
    metrics: [
      { label: 'Design Evolution', score: 45, color: '#60a5fa' },
      { label: 'Technology Evolution', score: 60, color: '#34d399' },
      { label: 'Mobile Adaptation', score: 72, color: '#f472b6' },
      { label: 'Content Evolution', score: 70, color: '#fbbf24' },
    ],
    isDemo: true,
  },
  'facebook.com': {
    overall: 85,
    metrics: [
      { label: 'Design Evolution', score: 82, color: '#60a5fa' },
      { label: 'Technology Evolution', score: 92, color: '#34d399' },
      { label: 'Mobile Adaptation', score: 88, color: '#f472b6' },
      { label: 'Content Evolution', score: 78, color: '#fbbf24' },
    ],
    isDemo: true,
  },
  'netflix.com': {
    overall: 89,
    metrics: [
      { label: 'Design Evolution', score: 92, color: '#60a5fa' },
      { label: 'Technology Evolution', score: 88, color: '#34d399' },
      { label: 'Mobile Adaptation', score: 90, color: '#f472b6' },
      { label: 'Content Evolution', score: 85, color: '#fbbf24' },
    ],
    isDemo: true,
  },
  'reddit.com': {
    overall: 68,
    metrics: [
      { label: 'Design Evolution', score: 55, color: '#60a5fa' },
      { label: 'Technology Evolution', score: 75, color: '#34d399' },
      { label: 'Mobile Adaptation', score: 72, color: '#f472b6' },
      { label: 'Content Evolution', score: 68, color: '#fbbf24' },
    ],
    isDemo: true,
  },
};

export function getWebsiteDNA(domain: string): WebsiteDNA | undefined {
  return websiteDNAData[domain];
}

export function getChangeReasons(domain: string): ChangeReason[] {
  return changeReasons[domain] || changeReasons['youtube.com']!;
}

export function getEvolutionScore(domain: string): EvolutionScore | undefined {
  return evolutionScores[domain];
}
