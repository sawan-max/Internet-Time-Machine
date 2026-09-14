import { useState, useEffect } from 'react';
import { demoWebsites } from '../data/websites';
import { getSnapshots } from '../data/snapshots';
import { getWebsiteDNA } from '../data/dna';
import RadarChart from '../components/charts/RadarChart';
import ComparisonSlider from '../components/comparison/ComparisonSlider';
import type { Website } from '../types';

export default function Compare() {
  const [websiteA, setWebsiteA] = useState<Website | null>(null);
  const [websiteB, setWebsiteB] = useState<Website | null>(null);

  const dnaA = websiteA ? getWebsiteDNA(websiteA.domain) : undefined;
  const dnaB = websiteB ? getWebsiteDNA(websiteB.domain) : undefined;
  const snapshotsA = websiteA ? getSnapshots(websiteA.domain) : [];
  const snapshotsB = websiteB ? getSnapshots(websiteB.domain) : [];

  const bothSelected = websiteA && websiteB;

  const comparisons = bothSelected ? [
    { label: 'Founded', a: websiteA.founded.toString(), b: websiteB.founded.toString() },
    { label: 'Category', a: websiteA.category, b: websiteB.category },
    { label: 'Years Tracked', a: websiteA.yearsTracked.toString(), b: websiteB.yearsTracked.toString() },
    { label: 'Major Redesigns', a: websiteA.majorRedesigns.toString(), b: websiteB.majorRedesigns.toString() },
    { label: 'Snapshots', a: websiteA.snapshotCount.toString(), b: websiteB.snapshotCount.toString() },
  ] : [];

  return (
    <div className="section-container" style={{ paddingTop: 40, paddingBottom: 60 }}>
      <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 8 }}>
        Compare Websites
      </h1>
      <p style={{ fontSize: 15, color: 'var(--text-tertiary)', marginBottom: 32 }}>
        Select two websites to compare their evolution side by side.
      </p>

      {/* Selectors */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 16, alignItems: 'start', marginBottom: 40 }}>
        <div>
          <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: 8 }}>
            Website A
          </label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {demoWebsites.map(w => (
              <button
                key={w.domain}
                onClick={() => setWebsiteA(w)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '10px 14px',
                  background: websiteA?.domain === w.domain ? 'var(--accent-dim)' : 'var(--bg-card)',
                  border: `1px solid ${websiteA?.domain === w.domain ? 'var(--border-accent)' : 'var(--border)'}`,
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-sans)',
                  fontSize: 13,
                  fontWeight: 500,
                  color: websiteA?.domain === w.domain ? 'var(--accent)' : 'var(--text-secondary)',
                  textAlign: 'left',
                  transition: 'all var(--transition-fast)',
                }}
              >
                <span>{w.logo}</span>
                {w.name}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 40, fontSize: 24, color: 'var(--text-muted)', fontWeight: 700 }}>
          vs
        </div>

        <div>
          <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: 8 }}>
            Website B
          </label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {demoWebsites.map(w => (
              <button
                key={w.domain}
                onClick={() => setWebsiteB(w)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '10px 14px',
                  background: websiteB?.domain === w.domain ? 'rgba(244,114,182,0.1)' : 'var(--bg-card)',
                  border: `1px solid ${websiteB?.domain === w.domain ? 'rgba(244,114,182,0.3)' : 'var(--border)'}`,
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-sans)',
                  fontSize: 13,
                  fontWeight: 500,
                  color: websiteB?.domain === w.domain ? '#f472b6' : 'var(--text-secondary)',
                  textAlign: 'left',
                  transition: 'all var(--transition-fast)',
                }}
              >
                <span>{w.logo}</span>
                {w.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Comparison results */}
      {bothSelected && (
        <div style={{ animation: 'fadeInUp 0.4s ease' }}>
          {/* Comparison table */}
          <section style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>Comparison</h2>
            <div className="card" style={{ overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border)' }}>
                    <th style={{ padding: '12px 16px', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 600, fontSize: 12 }}>Metric</th>
                    <th style={{ padding: '12px 16px', textAlign: 'center', color: 'var(--accent)', fontWeight: 600 }}>
                      {websiteA.logo} {websiteA.name}
                    </th>
                    <th style={{ padding: '12px 16px', textAlign: 'center', color: '#f472b6', fontWeight: 600 }}>
                      {websiteB.logo} {websiteB.name}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisons.map(c => (
                    <tr key={c.label} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '12px 16px', color: 'var(--text-secondary)' }}>{c.label}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'center', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{c.a}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'center', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{c.b}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{ padding: '8px 16px', borderTop: '1px solid var(--border)' }}>
                <div className="demo-badge">Demo Data</div>
              </div>
            </div>
          </section>

          {/* DNA Radar comparison */}
          {dnaA && dnaB && (
            <section style={{ marginBottom: 48 }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>Website DNA Comparison</h2>
              <div className="card" style={{ padding: 32, display: 'flex', justifyContent: 'center' }}>
                <RadarChart
                  dimensions={dnaA.dimensions}
                  dimensionsB={dnaB.dimensions}
                  labelA={websiteA.name}
                  labelB={websiteB.name}
                  size={320}
                />
              </div>
            </section>
          )}

          {/* Snapshot comparison */}
          {snapshotsA.length > 0 && snapshotsB.length > 0 && (
            <section>
              <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>Latest Snapshots Comparison</h2>
              <ComparisonSlider
                snapshotA={snapshotsA[snapshotsA.length - 1]}
                snapshotB={snapshotsB[snapshotsB.length - 1]}
                domain={`${websiteA.domain} vs ${websiteB.domain}`}
              />
            </section>
          )}
        </div>
      )}

      {!bothSelected && (
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>⚖️</div>
          <p style={{ fontSize: 15 }}>Select two websites above to start comparing</p>
        </div>
      )}
    </div>
  );
}
