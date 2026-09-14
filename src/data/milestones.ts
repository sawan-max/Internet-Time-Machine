import { Milestone } from '../types';

const milestoneData: Record<string, Milestone[]> = {
  'google.com': [
    { year: 1998, title: 'Google Founded', description: 'Larry Page and Sergey Brin incorporate Google Inc. in a Menlo Park garage.', source: 'Demo Data', isDemo: true },
    { year: 2000, title: 'AdWords Launches', description: 'Google launches its advertising platform, which becomes its primary revenue source.', source: 'Demo Data', isDemo: true },
    { year: 2004, title: 'Gmail & IPO', description: 'Google launches Gmail and goes public on the NASDAQ.', source: 'Demo Data', isDemo: true },
    { year: 2008, title: 'Chrome Browser Launches', description: 'Google enters the browser market with Chrome, eventually becoming the dominant browser.', source: 'Demo Data', isDemo: true },
    { year: 2012, title: 'Knowledge Graph', description: 'Google introduces the Knowledge Graph, making search results more intelligent.', source: 'Demo Data', isDemo: true },
    { year: 2015, title: 'Alphabet Restructuring', description: 'Google restructures under Alphabet Inc., separating core products from moonshot projects.', source: 'Demo Data', isDemo: true },
    { year: 2023, title: 'Bard / Gemini AI Launch', description: 'Google launches its AI assistant, competing in the generative AI space.', source: 'Demo Data', isDemo: true },
    { year: 2026, title: 'AI-First Search', description: 'Google Search transitions to an AI-first experience with Gemini integration.', source: 'Demo Data', isDemo: true },
  ],
  'youtube.com': [
    { year: 2005, title: 'YouTube Founded', description: 'Chad Hurley, Steve Chen, and Jawed Karim create YouTube. "Me at the zoo" becomes the first video.', source: 'Demo Data', isDemo: true },
    { year: 2006, title: 'Google Acquires YouTube', description: 'Google acquires YouTube for $1.65 billion in stock.', source: 'Demo Data', isDemo: true },
    { year: 2010, title: '1080p & Monetization', description: 'YouTube supports 1080p video and expands the Partner Program for creator monetization.', source: 'Demo Data', isDemo: true },
    { year: 2013, title: 'One Billion Users', description: 'YouTube reaches one billion monthly users, becoming the dominant video platform.', source: 'Demo Data', isDemo: true },
    { year: 2017, title: 'Material Design & YouTube TV', description: 'YouTube gets a Material Design makeover and launches YouTube TV.', source: 'Demo Data', isDemo: true },
    { year: 2021, title: 'Shorts Launch', description: 'YouTube launches Shorts to compete with TikTok\'s short-form video format.', source: 'Demo Data', isDemo: true },
    { year: 2026, title: 'AI-Enhanced Platform', description: 'AI-powered features transform content discovery, creation, and accessibility.', source: 'Demo Data', isDemo: true },
  ],
  'apple.com': [
    { year: 1976, title: 'Apple Founded', description: 'Steve Jobs, Steve Wozniak, and Ronald Wayne found Apple Computer Company.', source: 'Demo Data', isDemo: true },
    { year: 1997, title: 'Steve Jobs Returns', description: 'Jobs returns to Apple and begins the company\'s turnaround.', source: 'Demo Data', isDemo: true },
    { year: 2001, title: 'iPod Launch', description: 'The iPod revolutionizes portable music and begins Apple\'s consumer electronics dominance.', source: 'Demo Data', isDemo: true },
    { year: 2007, title: 'iPhone Launch', description: 'The iPhone launches, fundamentally changing mobile computing and web design.', source: 'Demo Data', isDemo: true },
    { year: 2010, title: 'iPad Launch', description: 'The iPad creates the tablet category and drives responsive web design adoption.', source: 'Demo Data', isDemo: true },
    { year: 2015, title: 'Apple Watch', description: 'Apple enters wearables, adding another device category to its ecosystem.', source: 'Demo Data', isDemo: true },
    { year: 2023, title: 'Vision Pro Announced', description: 'Apple announces its spatial computing headset, Vision Pro.', source: 'Demo Data', isDemo: true },
    { year: 2026, title: 'Apple Intelligence', description: 'Apple Intelligence integrates AI deeply across all products and the website.', source: 'Demo Data', isDemo: true },
  ],
  'amazon.com': [
    { year: 1994, title: 'Amazon Founded', description: 'Jeff Bezos founds Amazon as an online bookstore in his Bellevue garage.', source: 'Demo Data', isDemo: true },
    { year: 2002, title: 'AWS Begins', description: 'Amazon Web Services launches, eventually becoming the world\'s largest cloud platform.', source: 'Demo Data', isDemo: true },
    { year: 2005, title: 'Amazon Prime', description: 'Amazon Prime launches with free two-day shipping, transforming e-commerce expectations.', source: 'Demo Data', isDemo: true },
    { year: 2007, title: 'Kindle Launch', description: 'The Kindle e-reader launches, disrupting the book publishing industry.', source: 'Demo Data', isDemo: true },
    { year: 2014, title: 'Alexa & Echo', description: 'Amazon launches Echo with Alexa, pioneering the smart speaker category.', source: 'Demo Data', isDemo: true },
    { year: 2020, title: 'Pandemic Essential', description: 'Amazon becomes an essential service during COVID-19, with unprecedented demand.', source: 'Demo Data', isDemo: true },
    { year: 2026, title: 'AI Shopping', description: 'Generative AI transforms the Amazon shopping experience with virtual assistants.', source: 'Demo Data', isDemo: true },
  ],
  'wikipedia.org': [
    { year: 2001, title: 'Wikipedia Launches', description: 'Jimmy Wales and Larry Sanger launch Wikipedia as a free online encyclopedia.', source: 'Demo Data', isDemo: true },
    { year: 2003, title: 'Wikimedia Foundation', description: 'The Wikimedia Foundation is established as a nonprofit to support Wikipedia.', source: 'Demo Data', isDemo: true },
    { year: 2007, title: 'Top 10 Website', description: 'Wikipedia becomes one of the top 10 most-visited websites globally.', source: 'Demo Data', isDemo: true },
    { year: 2010, title: 'Vector Skin', description: 'Wikipedia launches the Vector skin, its biggest visual update to date.', source: 'Demo Data', isDemo: true },
    { year: 2016, title: 'HTTPS by Default', description: 'Wikipedia switches to HTTPS, improving security and privacy for all users.', source: 'Demo Data', isDemo: true },
    { year: 2023, title: 'Vector 2022 Rollout', description: 'The new Vector 2022 skin rolls out globally after years of development.', source: 'Demo Data', isDemo: true },
  ],
  'facebook.com': [
    { year: 2004, title: 'TheFacebook Launches', description: 'Mark Zuckerberg launches TheFacebook from his Harvard dorm room.', source: 'Demo Data', isDemo: true },
    { year: 2006, title: 'News Feed Launch', description: 'Facebook introduces the News Feed, which initially faces backlash but becomes core to the experience.', source: 'Demo Data', isDemo: true },
    { year: 2012, title: 'IPO & 1 Billion Users', description: 'Facebook goes public and reaches one billion monthly active users.', source: 'Demo Data', isDemo: true },
    { year: 2014, title: 'Oculus Acquisition', description: 'Facebook acquires Oculus VR, beginning its push into virtual reality.', source: 'Demo Data', isDemo: true },
    { year: 2021, title: 'Meta Rebrand', description: 'Facebook rebrands to Meta, signaling a focus on the metaverse.', source: 'Demo Data', isDemo: true },
    { year: 2026, title: 'Meta AI Integration', description: 'Meta AI becomes central to the Facebook experience across all surfaces.', source: 'Demo Data', isDemo: true },
  ],
  'netflix.com': [
    { year: 1997, title: 'Netflix Founded', description: 'Reed Hastings and Marc Randolph found Netflix as a DVD-by-mail service.', source: 'Demo Data', isDemo: true },
    { year: 2007, title: 'Streaming Launches', description: 'Netflix introduces streaming video, beginning the shift from physical to digital media.', source: 'Demo Data', isDemo: true },
    { year: 2013, title: 'House of Cards', description: 'Netflix releases House of Cards, its first major original series.', source: 'Demo Data', isDemo: true },
    { year: 2016, title: 'Global Expansion', description: 'Netflix expands to 190 countries, becoming a truly global streaming service.', source: 'Demo Data', isDemo: true },
    { year: 2022, title: 'Ad-Supported Tier', description: 'Netflix introduces a lower-cost ad-supported subscription tier.', source: 'Demo Data', isDemo: true },
    { year: 2026, title: 'AI Entertainment', description: 'Netflix uses AI for personalized experiences, dynamic content, and interactive storytelling.', source: 'Demo Data', isDemo: true },
  ],
  'reddit.com': [
    { year: 2005, title: 'Reddit Founded', description: 'Steve Huffman and Alexis Ohanian found Reddit, originally written in Lisp.', source: 'Demo Data', isDemo: true },
    { year: 2008, title: 'Subreddits Launch', description: 'Reddit introduces subreddits, allowing users to create topic-specific communities.', source: 'Demo Data', isDemo: true },
    { year: 2010, title: 'Reddit Gold', description: 'Reddit launches its premium membership, Reddit Gold, for ad-free experience and features.', source: 'Demo Data', isDemo: true },
    { year: 2018, title: 'The Redesign', description: 'Reddit launches its controversial redesign with a modern card-based interface.', source: 'Demo Data', isDemo: true },
    { year: 2024, title: 'IPO', description: 'Reddit goes public, becoming one of the first major social platforms to IPO in years.', source: 'Demo Data', isDemo: true },
    { year: 2026, title: 'AI-Powered Reddit', description: 'Reddit integrates AI for content discovery, moderation, and community management.', source: 'Demo Data', isDemo: true },
  ],
};

export function getMilestones(domain: string): Milestone[] {
  return milestoneData[domain] || [];
}
