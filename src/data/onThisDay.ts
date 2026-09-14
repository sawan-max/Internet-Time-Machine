import { HistoricalEvent } from '../types';

export const onThisDayEvents: HistoricalEvent[] = [
  // September events (for demo purposes — the app launches in September)
  { date: 'Sep 12, 1998', month: 9, day: 12, year: 1998, title: 'Google incorporates as a company', description: 'Larry Page and Sergey Brin officially incorporate Google Inc. in Menlo Park, California.', source: 'Demo Data', isDemo: true },
  { date: 'Sep 12, 2012', month: 9, day: 12, year: 2012, title: 'iPhone 5 announced', description: 'Apple unveils the iPhone 5, the first iPhone with a 4-inch display and Lightning connector.', source: 'Demo Data', isDemo: true },
  { date: 'Sep 12, 2017', month: 9, day: 12, year: 2017, title: 'iPhone X revealed', description: 'Apple introduces the iPhone X with Face ID and an edge-to-edge OLED display, reshaping smartphone design.', source: 'Demo Data', isDemo: true },
  { date: 'Sep 4, 1998', month: 9, day: 4, year: 1998, title: 'Google Founded', description: 'Larry Page and Sergey Brin found Google in a garage in Menlo Park, California.', source: 'Demo Data', isDemo: true },
  { date: 'Sep 9, 2014', month: 9, day: 9, year: 2014, title: 'Apple Watch announced', description: 'Apple introduces the Apple Watch, marking its entry into wearable technology.', source: 'Demo Data', isDemo: true },
  { date: 'Sep 15, 2008', month: 9, day: 15, year: 2008, title: 'Lehman Brothers collapses', description: 'The financial crisis accelerates, impacting tech valuations and web startups globally.', source: 'Demo Data', isDemo: true },
  { date: 'Sep 20, 2013', month: 9, day: 20, year: 2013, title: 'iOS 7 released', description: 'Apple releases iOS 7, introducing flat design that influences web design trends worldwide.', source: 'Demo Data', isDemo: true },
  // Other notable internet events for demo
  { date: 'Jan 9, 2007', month: 1, day: 9, year: 2007, title: 'iPhone announced', description: 'Steve Jobs unveils the iPhone, beginning the mobile revolution that transformed the web.', source: 'Demo Data', isDemo: true },
  { date: 'Feb 4, 2004', month: 2, day: 4, year: 2004, title: 'Facebook launches', description: 'Mark Zuckerberg launches TheFacebook from his Harvard dorm room.', source: 'Demo Data', isDemo: true },
  { date: 'Apr 23, 2005', month: 4, day: 23, year: 2005, title: 'First YouTube video', description: '"Me at the zoo" — the first video ever uploaded to YouTube.', source: 'Demo Data', isDemo: true },
  { date: 'Aug 6, 1991', month: 8, day: 6, year: 1991, title: 'First website goes live', description: 'Tim Berners-Lee publishes the world\'s first website at CERN, describing the World Wide Web project.', source: 'Demo Data', isDemo: true },
  { date: 'Nov 30, 2022', month: 11, day: 30, year: 2022, title: 'ChatGPT launches', description: 'OpenAI releases ChatGPT, sparking the generative AI revolution that reshapes the web.', source: 'Demo Data', isDemo: true },
];

export function getEventsForDate(month: number, day: number): HistoricalEvent[] {
  return onThisDayEvents.filter(e => e.month === month && e.day === day);
}

export function getEventsForMonth(month: number): HistoricalEvent[] {
  return onThisDayEvents.filter(e => e.month === month);
}
