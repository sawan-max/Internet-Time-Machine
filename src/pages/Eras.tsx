import { useState } from 'react';
import { eras } from '../data/eras';
import type { Era } from '../types';

export default function Eras() {
  const [expanded, setExpanded] = useState<string | null>(eras[0]?.id || null);

  return (
    <div className="section-container" style={{ paddingTop: 40, paddingBottom: 60 }}>
      <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 8 }}>
        Explore the Eras of the Web
      </h1>
      <p style={{ fontSize: 15, color: 'var(--text-tertiary)', marginBottom: 40 }}>
        From Tim Berners-Lee's first webpage to AI-powered experiences — the web has been through remarkable transformations.
      </p>

      {/* Timeline overview */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 0,
        overflowX: 'auto',
        padding: '16px 0',
        marginBottom: 40,
        scrollbarWidth: 'none',
      }}>
        {eras.map((era, i) => (
          <div key={era.id} style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <button
              onClick={() => setExpanded(era.id)}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                padding: '12px 20px',
                background: expanded === era.id ? `${era.color}15` : 'transparent',
                border: expanded === era.id ? `1px solid ${era.color}30` : '1px solid transparent',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
                fontFamily: 'var(--font-sans)',
                transition: 'all var(--transition-base)',
                minWidth: 120,
              }}
            >
              <div style={{
                width: 14, height: 14, borderRadius: '50%', background: era.color,
                boxShadow: expanded === era.id ? `0 0 12px ${era.color}60` : 'none',
                transition: 'box-shadow var(--transition-base)',
              }} />
              <span style={{ fontSize: 11, fontWeight: 600, fontFamily: 'var(--font-mono)', color: era.color }}>{era.period}</span>
              <span style={{ fontSize: 12, fontWeight: 500, color: expanded === era.id ? 'var(--text-primary)' : 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                {era.name}
              </span>
            </button>
            {i < eras.length - 1 && (
              <div style={{ width: 30, height: 2, background: 'var(--border)', flexShrink: 0 }} />
            )}
          </div>
        ))}
      </div>

      {/* Era details */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {eras.map(era => (
          <div
            key={era.id}
            className="card"
            style={{
              overflow: 'hidden',
              borderColor: expanded === era.id ? `${era.color}30` : 'var(--border)',
              transition: 'all var(--transition-base)',
            }}
          >
            {/* Header */}
            <button
              onClick={() => setExpanded(expanded === era.id ? null : era.id)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '20px 24px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'var(--font-sans)',
                textAlign: 'left',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{
                  width: 16, height: 16, borderRadius: '50%', background: era.color,
                  boxShadow: `0 0 8px ${era.color}40`,
                  flexShrink: 0,
                }} />
                <div>
                  <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 2 }}>{era.name}</h2>
                  <span style={{ fontSize: 13, color: era.color, fontFamily: 'var(--font-mono)', fontWeight: 500 }}>{era.period}</span>
                </div>
              </div>
              <span style={{
                fontSize: 18, color: 'var(--text-muted)',
                transform: expanded === era.id ? 'rotate(180deg)' : 'none',
                transition: 'transform var(--transition-base)',
              }}>
                ▾
              </span>
            </button>

            {/* Expanded content */}
            {expanded === era.id && (
              <div style={{ padding: '0 24px 24px', animation: 'fadeIn 0.3s ease' }}>
                <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 24 }}>
                  {era.description}
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
                  {/* Characteristics */}
                  <div>
                    <h4 style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
                      Characteristics
                    </h4>
                    <ul style={{ fontSize: 13, color: 'var(--text-tertiary)', lineHeight: 2, paddingLeft: 16 }}>
                      {era.characteristics.map(c => <li key={c}>{c}</li>)}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h4 style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
                      Key Technologies
                    </h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {era.technologies.map(t => (
                        <span key={t} style={{
                          padding: '4px 10px', fontSize: 11, fontWeight: 500,
                          background: `${era.color}15`, color: era.color,
                          borderRadius: 'var(--radius-full)',
                        }}>{t}</span>
                      ))}
                    </div>
                  </div>

                  {/* Popular websites */}
                  <div>
                    <h4 style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
                      Popular Websites
                    </h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {era.popularWebsites.map(w => (
                        <span key={w} style={{
                          padding: '4px 10px', fontSize: 11, fontWeight: 500,
                          background: 'var(--bg-tertiary)', color: 'var(--text-secondary)',
                          borderRadius: 'var(--radius-full)', border: '1px solid var(--border)',
                        }}>{w}</span>
                      ))}
                    </div>
                  </div>

                  {/* Design trends */}
                  <div>
                    <h4 style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
                      Design Trends
                    </h4>
                    <ul style={{ fontSize: 13, color: 'var(--text-tertiary)', lineHeight: 2, paddingLeft: 16 }}>
                      {era.designTrends.map(d => <li key={d}>{d}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
