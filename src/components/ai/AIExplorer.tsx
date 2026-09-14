import { useState } from 'react';
import { aiService, createMessage } from '../../services/aiService';
import type { AIMessage } from '../../types';

interface AIExplorerProps {
  domain: string;
}

const suggestedQuestions = [
  'Why did this website redesign itself?',
  'What changed between the early years and now?',
  'When did the website become mobile-friendly?',
  'How did its design evolve over time?',
  'What technologies likely shaped this website?',
  'Give me a summary of this website\'s evolution.',
];

export default function AIExplorer({ domain }: AIExplorerProps) {
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMsg = createMessage('user', text.trim());
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const insight = await aiService.askQuestion(domain, text);
      const assistantMsg = createMessage('assistant', insight.response, insight.isDemo);
      setMessages(prev => [...prev, assistantMsg]);
    } catch {
      const errMsg = createMessage('assistant', 'Sorry, something went wrong. Please try again.', true);
      setMessages(prev => [...prev, errMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ overflow: 'hidden' }}>
      {/* Header */}
      <div style={{
        padding: '16px 20px',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div>
          <h3 style={{ fontSize: 16, fontWeight: 600 }}>Ask the Time Machine</h3>
          <p style={{ fontSize: 12, color: 'var(--text-tertiary)', marginTop: 2 }}>AI-powered historical analysis</p>
        </div>
        <div className="demo-badge">AI Demo Mode</div>
      </div>

      {/* Messages */}
      <div style={{
        minHeight: 200,
        maxHeight: 400,
        overflowY: 'auto',
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}>
        {messages.length === 0 && (
          <div style={{ padding: '20px 0', textAlign: 'center' }}>
            <p style={{ fontSize: 13, color: 'var(--text-tertiary)', marginBottom: 16 }}>
              Ask questions about {domain}'s history and evolution
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center' }}>
              {suggestedQuestions.slice(0, 4).map(q => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  style={{
                    padding: '6px 12px',
                    fontSize: 12,
                    color: 'var(--text-secondary)',
                    background: 'var(--bg-tertiary)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-full)',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-sans)',
                    transition: 'all var(--transition-fast)',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-hover)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map(msg => (
          <div
            key={msg.id}
            style={{
              display: 'flex',
              justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
            }}
          >
            <div style={{
              maxWidth: '85%',
              padding: '10px 14px',
              borderRadius: msg.role === 'user'
                ? '12px 12px 4px 12px'
                : '12px 12px 12px 4px',
              background: msg.role === 'user' ? 'var(--accent-dim)' : 'var(--bg-tertiary)',
              border: msg.role === 'user' ? '1px solid var(--border-accent)' : '1px solid var(--border)',
              fontSize: 13,
              lineHeight: 1.7,
              color: 'var(--text-primary)',
              whiteSpace: 'pre-wrap',
            }}>
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ display: 'flex', gap: 4, padding: 12 }}>
            {[0, 1, 2].map(i => (
              <div key={i} style={{
                width: 6, height: 6, borderRadius: '50%', background: 'var(--text-muted)',
                animation: 'pulse-glow 1.2s ease infinite',
                animationDelay: `${i * 0.15}s`,
              }} />
            ))}
          </div>
        )}
      </div>

      {/* Input */}
      <form
        onSubmit={e => { e.preventDefault(); sendMessage(input); }}
        style={{
          display: 'flex',
          gap: 8,
          padding: '12px 16px',
          borderTop: '1px solid var(--border)',
        }}
      >
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask about this website's history..."
          disabled={loading}
          style={{
            flex: 1,
            padding: '8px 14px',
            fontSize: 13,
            background: 'var(--bg-tertiary)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-sm)',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-sans)',
            outline: 'none',
          }}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          style={{
            padding: '8px 16px',
            fontSize: 13,
            fontWeight: 600,
            background: 'var(--accent)',
            color: '#000',
            border: 'none',
            borderRadius: 'var(--radius-sm)',
            cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
            opacity: loading || !input.trim() ? 0.5 : 1,
            fontFamily: 'var(--font-sans)',
          }}
        >
          Ask
        </button>
      </form>
    </div>
  );
}
