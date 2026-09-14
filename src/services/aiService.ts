/**
 * AI Service — Abstraction layer for AI-powered insights.
 *
 * Currently uses mocked responses. Designed for future integration with:
 * - OpenAI API
 * - Google Gemini API
 * - Anthropic Claude API
 * - Any LLM provider
 *
 * All demo responses are clearly marked with isDemo: true.
 */

import { AIInsight, AIMessage } from '../types';

// ─── AI Service Interface ─────────────────────────────────────
export interface IAIService {
  askQuestion(domain: string, question: string): Promise<AIInsight>;
  getSummary(domain: string): Promise<string>;
  isConnected(): boolean;
}

// ─── Demo AI Responses ────────────────────────────────────────
const demoResponses: Record<string, Record<string, string>> = {
  'default': {
    'redesign': 'Based on the available demo data, this website has undergone several major redesigns throughout its history. Each redesign typically coincided with broader web design trends, technology platform shifts (like the move to mobile), or significant business strategy changes.\n\n⚠️ This is a demo response. Connect an LLM API for real AI-powered analysis.',
    'mobile': 'The transition to mobile-friendly design was a critical milestone for most websites, typically occurring between 2012-2016. Responsive design techniques, viewport meta tags, and eventually mobile-first design approaches were adopted.\n\n⚠️ This is a demo response. Connect an LLM API for real AI-powered analysis.',
    'technology': 'Web technologies have evolved dramatically — from static HTML and table layouts, through Flash and AJAX, to modern JavaScript frameworks, component architectures, and AI-powered interfaces. Each technology shift enabled new user experiences.\n\n⚠️ This is a demo response. Connect an LLM API for real AI-powered analysis.',
    'evolution': 'This website\'s evolution reflects broader internet trends: from simple, text-heavy pages in the early web to rich, interactive, mobile-first experiences today. Design choices were shaped by user expectations, business goals, and available technology.\n\n⚠️ This is a demo response. Connect an LLM API for real AI-powered analysis.',
    'default': 'That\'s an interesting question about this website\'s history! In a production environment, an AI model would analyze the available historical data, design snapshots, and technology evolution to provide a detailed answer.\n\n⚠️ This is a demo response. Connect an LLM API for real AI-powered analysis.',
  },
};

function matchDemoResponse(question: string): string {
  const q = question.toLowerCase();
  if (q.includes('redesign') || q.includes('change') || q.includes('different')) return demoResponses['default']['redesign'];
  if (q.includes('mobile') || q.includes('responsive') || q.includes('phone')) return demoResponses['default']['mobile'];
  if (q.includes('technolog') || q.includes('stack') || q.includes('built')) return demoResponses['default']['technology'];
  if (q.includes('evolv') || q.includes('summary') || q.includes('history')) return demoResponses['default']['evolution'];
  return demoResponses['default']['default'];
}

// ─── Demo Implementation ──────────────────────────────────────
class DemoAIService implements IAIService {
  async askQuestion(domain: string, question: string): Promise<AIInsight> {
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1200));

    return {
      query: question,
      response: matchDemoResponse(question),
      sources: ['Demo Data — No real AI analysis performed'],
      relatedSnapshots: [],
      isDemo: true,
    };
  }

  async getSummary(domain: string): Promise<string> {
    await new Promise(resolve => setTimeout(resolve, 600));
    return `This is a demo summary for ${domain}. In production, an AI model would analyze the website's historical snapshots, technology evolution, and design changes to generate a comprehensive narrative of its evolution.\n\n⚠️ AI Demo Mode — Connect an LLM API for real analysis.`;
  }

  isConnected(): boolean {
    return false; // Demo mode — no real AI connected
  }
}

// ─── LLM Implementation (Future) ─────────────────────────────
// class LLMService implements IAIService {
//   private apiKey: string;
//   private endpoint: string;
//
//   constructor(apiKey: string, endpoint: string) {
//     this.apiKey = apiKey;
//     this.endpoint = endpoint;
//   }
//
//   async askQuestion(domain: string, question: string): Promise<AIInsight> {
//     const response = await fetch(this.endpoint, {
//       method: 'POST',
//       headers: {
//         'Authorization': `Bearer ${this.apiKey}`,
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         model: 'gpt-4',
//         messages: [
//           { role: 'system', content: `You are a web history analyst. Analyze the evolution of ${domain}.` },
//           { role: 'user', content: question },
//         ],
//       }),
//     });
//     const data = await response.json();
//     return {
//       query: question,
//       response: data.choices[0].message.content,
//       sources: ['AI Analysis'],
//       relatedSnapshots: [],
//       isDemo: false,
//     };
//   }
// }

// ─── Helper to create AI messages ────────────────────────────
export function createMessage(role: 'user' | 'assistant', content: string, isDemo: boolean = true): AIMessage {
  return {
    id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    role,
    content,
    timestamp: new Date(),
    isDemo,
  };
}

// ─── Export singleton instance ────────────────────────────────
export const aiService: IAIService = new DemoAIService();
