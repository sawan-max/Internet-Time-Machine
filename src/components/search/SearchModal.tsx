import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchAll } from '../../services/searchService';
import type { SearchResult } from '../../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setResults([]);
      setSelected(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.trim()) {
      setResults(searchAll(query));
      setSelected(0);
    } else {
      setResults([]);
    }
  }, [query]);

  const handleSelect = (result: SearchResult) => {
    navigate(result.url);
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelected(s => Math.min(s + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelected(s => Math.max(s - 1, 0));
    } else if (e.key === 'Enter' && results[selected]) {
      handleSelect(results[selected]);
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (results[selected]) {
      handleSelect(results[selected]);
    } else if (query.trim()) {
      const domain = query.includes('.') ? query.trim() : `${query.trim()}.com`;
      navigate(`/explore/${domain}`);
      onClose();
    }
  };

  if (!isOpen) return null;

  const typeColors: Record<string, string> = {
    website: 'var(--accent)',
    year: '#34d399',
    technology: '#f472b6',
    event: '#fbbf24',
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '15vh',
        background: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(8px)',
        animation: 'fadeIn 0.15s ease',
      }}
      onClick={onClose}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: 580,
          margin: '0 16px',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-hover)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: '0 24px 64px rgba(0, 0, 0, 0.6)',
          overflow: 'hidden',
        }}
      >
        {/* Search Input */}
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', alignItems: 'center', padding: '16px 20px', gap: 12, borderBottom: '1px solid var(--border)' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search websites, years, technologies..."
              style={{
                flex: 1,
                background: 'none',
                border: 'none',
                outline: 'none',
                fontSize: 15,
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-sans)',
              }}
            />
            <kbd style={{
              padding: '2px 8px',
              fontSize: 11,
              color: 'var(--text-muted)',
              background: 'var(--bg-tertiary)',
              borderRadius: 4,
              border: '1px solid var(--border)',
            }}>
              ESC
            </kbd>
          </div>
        </form>

        {/* Results */}
        {results.length > 0 && (
          <div style={{ padding: '8px', maxHeight: 360, overflowY: 'auto' }}>
            {results.map((result, i) => (
              <button
                key={`${result.type}-${result.title}-${i}`}
                onClick={() => handleSelect(result)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '10px 12px',
                  background: i === selected ? 'var(--bg-tertiary)' : 'transparent',
                  border: 'none',
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'background var(--transition-fast)',
                  fontFamily: 'var(--font-sans)',
                }}
                onMouseEnter={() => setSelected(i)}
              >
                <span style={{ fontSize: 20, width: 28, textAlign: 'center' }}>{result.icon}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-primary)' }}>{result.title}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-tertiary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{result.subtitle}</div>
                </div>
                <span style={{
                  fontSize: 10,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: typeColors[result.type] || 'var(--text-muted)',
                  padding: '2px 8px',
                  borderRadius: 'var(--radius-full)',
                  background: `${typeColors[result.type] || 'var(--text-muted)'}15`,
                }}>
                  {result.type}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Empty state */}
        {query.trim() && results.length === 0 && (
          <div style={{ padding: '32px 20px', textAlign: 'center' }}>
            <p style={{ fontSize: 14, color: 'var(--text-tertiary)' }}>No results found for "{query}"</p>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>Press Enter to explore {query.includes('.') ? query : `${query}.com`}</p>
          </div>
        )}

        {/* Hint */}
        {!query.trim() && (
          <div style={{ padding: '20px', display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            <span style={{ fontSize: 12, color: 'var(--text-muted)', width: '100%', marginBottom: 4 }}>Try searching:</span>
            {['google.com', 'youtube', '2008', 'React', 'social media'].map(hint => (
              <button
                key={hint}
                onClick={() => setQuery(hint)}
                style={{
                  padding: '4px 12px',
                  fontSize: 12,
                  color: 'var(--text-secondary)',
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-full)',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-sans)',
                }}
              >
                {hint}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
