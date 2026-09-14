import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { archiveService } from '../services/archiveService';
import { getWebsiteDNA, getChangeReasons, getEvolutionScore } from '../data/dna';
import { eras } from '../data/eras';
import type { Website, Snapshot, Milestone } from '../types';
import HorizontalTimeline from '../components/timeline/HorizontalTimeline';
import BrowserFrame from '../components/snapshot/BrowserFrame';
import ComparisonSlider from '../components/comparison/ComparisonSlider';
import RadarChart from '../components/charts/RadarChart';
import ProgressBar from '../components/charts/ProgressBar';
import AIExplorer from '../components/ai/AIExplorer';

type LoadingState = 'idle' | 'loading' | 'loaded' | 'error';
type ErrorKind = 'not-found' | 'api-error' | 'network-error' | 'invalid-domain' | null;

export default function Explore() {
  const { domain } = useParams<{ domain: string }>();
  const [website, setWebsite] = useState<Website | null>(null);
  const [snapshots, setSnapshots] = useState<Snapshot[]>([]);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [selectedYear, setSelectedYear] = useState<number>(0);
  const [loadingState, setLoadingState] = useState<LoadingState>('idle');
  const [errorKind, setErrorKind] = useState<ErrorKind>(null);
  const [dataSource, setDataSource] = useState<'wayback' | 'demo' | null>(null);

  // ─── Validate domain format ─────────────────────────────────
  const isValidDomain = useCallback((d: string): boolean => {
    return /^[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?(\.[a-zA-Z]{2,})+$/.test(d);
  }, []);

  // ─── Load data ──────────────────────────────────────────────
  useEffect(() => {
    if (!domain) return;

    // Validate domain format
    if (!isValidDomain(domain)) {
      setLoadingState('error');
      setErrorKind('invalid-domain');
      return;
    }

    setLoadingState('loading');
    setErrorKind(null);
    setDataSource(null);

    const loadData = async () => {
      try {
        const [w, s, m] = await Promise.all([
          archiveService.getWebsite(domain),
          archiveService.getSnapshots(domain),
          archiveService.getMilestones(domain),
        ]);

        const source = archiveService.getDataSource(domain);
        setDataSource(source);

        if (!w && s.length === 0) {
          setLoadingState('error');
          setErrorKind('not-found');
          return;
        }

        setWebsite(w || null);
        setSnapshots(s);
        setMilestones(m);
        setSelectedYear(s[s.length - 1]?.year || 0);
        setLoadingState('loaded');
      } catch (err) {
        console.error('[Explore] Failed to load data:', err);
        if (err instanceof TypeError && err.message.includes('fetch')) {
          setErrorKind('network-error');
        } else {
          setErrorKind('api-error');
        }
        setLoadingState('error');
      }
    };

    loadData();
  }, [domain, isValidDomain]);

  // ─── Loading State ──────────────────────────────────────────
  if (loadingState === 'loading') {
    return (
      <div className="section-container" style={{ paddingTop: 40 }}>
        <div className="wayback-loading">
          <div className="wayback-loading__icon">🏛️</div>
          <div className="wayback-loading__spinner" />
          <div className="wayback-loading__text">Searching the Internet Archive...</div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>
            Looking up archived snapshots for <strong style={{ color: 'var(--text-secondary)' }}>{domain}</strong>
          </div>
        </div>
      </div>
    );
  }

  // ─── Error States ───────────────────────────────────────────
  if (loadingState === 'error') {
    return (
      <div className="section-container" style={{
        paddingTop: 80,
        textAlign: 'center',
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <ErrorDisplay domain={domain || ''} errorKind={errorKind} />
      </div>
    );
  }

  // ─── Loaded State ──────────────────────────────────────────
  const currentSnapshot = snapshots.find(s => s.year === selectedYear);
  const isRealData = dataSource === 'wayback';

  // Only show demo-only sections when using demo data
  const dna = !isRealData ? getWebsiteDNA(domain!) : null;
  const reasons = !isRealData ? getChangeReasons(domain!) : null;
  const evolution = !isRealData ? getEvolutionScore(domain!) : null;

  const firstSnapshot = snapshots[0];
  const lastSnapshot = snapshots[snapshots.length - 1];
  const designEras = !isRealData
    ? eras.filter(e => e.startYear <= (lastSnapshot?.year || 2026) && e.endYear >= (firstSnapshot?.year || 1995))
    : [];

  return (
    <div className="section-container" style={{ paddingTop: 20, paddingBottom: 40 }}>
      {/* ─── HEADER ─────────────────────────────────────── */}
      <header style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12, flexWrap: 'wrap' }}>
          <div style={{
            width: 52, height: 52, borderRadius: 'var(--radius-md)',
            background: website ? `${website.color}18` : 'var(--accent-dim)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 28,
          }}>
            {website?.logo || '🌐'}
          </div>
          <div>
            <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.03em' }}>
              {website?.name || domain}
            </h1>
            <p style={{ fontSize: 14, color: 'var(--text-tertiary)' }}>
              {website ? `${website.founded} — Present` : domain}
              {website?.category ? ` · ${website.category}` : ''}
            </p>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <span className={`source-badge ${isRealData ? 'source-badge--wayback' : 'source-badge--demo'}`}>
              {isRealData ? 'Source: Internet Archive' : 'Demo Data'}
            </span>
          </div>
        </div>

        {website?.description && (
          <p style={{ fontSize: 15, color: 'var(--text-secondary)', maxWidth: 700, lineHeight: 1.7, marginBottom: 20 }}>
            {website.description}
          </p>
        )}

        {/* Quick stats */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 24,
          padding: '16px 0',
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
        }}>
          {[
            { label: isRealData ? 'First Archived' : 'Founded', value: (website?.founded || firstSnapshot?.year || '—').toString() },
            { label: 'First Archived', value: (website?.firstArchived || firstSnapshot?.year || '—').toString(), hide: isRealData },
            { label: 'Snapshots', value: snapshots.length.toString() },
            { label: 'Years Tracked', value: (website?.yearsTracked || (lastSnapshot && firstSnapshot ? lastSnapshot.year - firstSnapshot.year : 0)).toString() },
            ...(isRealData ? [] : [{ label: 'Major Redesigns', value: (website?.majorRedesigns || 0).toString() }]),
          ].filter(s => !('hide' in s && s.hide)).map(s => (
            <div key={s.label}>
              <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.label}</div>
              <div style={{ fontSize: 18, fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)', marginTop: 2 }}>{s.value}</div>
            </div>
          ))}
        </div>
      </header>

      {/* ─── TIMELINE ───────────────────────────────────── */}
      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>Historical Timeline</h2>
        <HorizontalTimeline
          snapshots={snapshots}
          selectedYear={selectedYear}
          onSelectYear={setSelectedYear}
          dataSource={dataSource}
        />
      </section>

      {/* ─── SNAPSHOT VIEWER ─────────────────────────────── */}
      <section style={{ marginBottom: 48 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 8 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700 }}>Snapshot Viewer</h2>
          {/* Year selector mini — dynamically generated from archive data */}
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
            {snapshots.map(s => (
              <button
                key={s.year}
                onClick={() => setSelectedYear(s.year)}
                style={{
                  padding: '4px 12px',
                  fontSize: 12,
                  fontWeight: 600,
                  fontFamily: 'var(--font-mono)',
                  background: s.year === selectedYear ? 'var(--accent)' : 'var(--bg-tertiary)',
                  color: s.year === selectedYear ? '#000' : 'var(--text-tertiary)',
                  border: '1px solid ' + (s.year === selectedYear ? 'var(--accent)' : 'var(--border)'),
                  borderRadius: 'var(--radius-full)',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                }}
              >
                {s.year}
              </button>
            ))}
          </div>
        </div>
        <BrowserFrame snapshot={currentSnapshot} domain={domain!} />

        {/* Snapshot details — only show for demo data with characteristics */}
        {currentSnapshot && !isRealData && currentSnapshot.designCharacteristics.length > 0 && (
          <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 16 }}>
            <div className="card" style={{ padding: 20 }}>
              <h4 style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-tertiary)', marginBottom: 8 }}>Design Characteristics</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {currentSnapshot.designCharacteristics.map(c => (
                  <span key={c} style={{
                    padding: '3px 10px', fontSize: 11, fontWeight: 500,
                    background: 'var(--bg-tertiary)', color: 'var(--text-secondary)',
                    borderRadius: 'var(--radius-full)', border: '1px solid var(--border)',
                  }}>{c}</span>
                ))}
              </div>
            </div>
            <div className="card" style={{ padding: 20 }}>
              <h4 style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-tertiary)', marginBottom: 8 }}>Technologies Used</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {currentSnapshot.technologies.map(t => (
                  <span key={t} style={{
                    padding: '3px 10px', fontSize: 11, fontWeight: 500,
                    background: 'var(--accent-dim)', color: 'var(--accent)',
                    borderRadius: 'var(--radius-full)',
                  }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Real data — snapshot metadata card */}
        {currentSnapshot && isRealData && (
          <div style={{ marginTop: 16 }}>
            <div className="card" style={{ padding: 20 }}>
              <h4 style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-tertiary)', marginBottom: 12 }}>Snapshot Details</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Timestamp</div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-primary)' }}>{currentSnapshot.date}</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Domain</div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-primary)' }}>{currentSnapshot.domain}</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Source</div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--success)' }}>Internet Archive</div>
                </div>
                {currentSnapshot.archiveUrl && (
                  <div style={{ gridColumn: '1 / -1' }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Archived URL</div>
                    <a
                      href={currentSnapshot.archiveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontSize: 12,
                        fontFamily: 'var(--font-mono)',
                        color: 'var(--accent)',
                        textDecoration: 'none',
                        wordBreak: 'break-all',
                      }}
                    >
                      {currentSnapshot.archiveUrl}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ─── DESIGN EVOLUTION (demo data only) ────────────── */}
      {!isRealData && designEras.length > 0 && (
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>Design Evolution</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
            {designEras.map(era => (
              <div key={era.id} className="card" style={{ padding: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: era.color }} />
                  <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', fontWeight: 600, color: era.color }}>{era.period}</span>
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>{era.name}</h3>
                <ul style={{ fontSize: 12, color: 'var(--text-tertiary)', lineHeight: 1.8, paddingLeft: 16 }}>
                  {era.characteristics.slice(0, 4).map(c => <li key={c}>{c}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ─── EVOLUTION SCORE (demo data only) ─────────────── */}
      {!isRealData && evolution && (
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>Website Evolution Score</h2>
          <div className="card" style={{ padding: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 24, flexWrap: 'wrap' }}>
              <div style={{
                width: 80, height: 80, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '3px solid var(--accent)', fontSize: 28, fontWeight: 800, fontFamily: 'var(--font-mono)',
              }}>
                {evolution.overall}
              </div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 600 }}>Overall Score</div>
                <div style={{ fontSize: 13, color: 'var(--text-tertiary)' }}>Estimated / Demo Analysis</div>
              </div>
              <span className="source-badge source-badge--demo" style={{ marginLeft: 'auto' }}>Demo Data</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {evolution.metrics.map((m, i) => (
                <ProgressBar key={m.label} label={m.label} score={m.score} color={m.color} delay={i * 150} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── BEFORE/AFTER COMPARISON (demo data only) ─────── */}
      {!isRealData && firstSnapshot && lastSnapshot && firstSnapshot !== lastSnapshot && (
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>See the Difference</h2>
          <p style={{ fontSize: 14, color: 'var(--text-tertiary)', marginBottom: 16 }}>
            {firstSnapshot.year} vs {lastSnapshot.year} — drag the slider to compare
          </p>
          <ComparisonSlider snapshotA={firstSnapshot} snapshotB={lastSnapshot} domain={domain!} />
        </section>
      )}

      {/* ─── MILESTONES (demo data only) ─────────────────── */}
      {!isRealData && milestones.length > 0 && (
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>Major Milestones</h2>
          <div style={{ position: 'relative', paddingLeft: 28 }}>
            {/* Vertical line */}
            <div style={{ position: 'absolute', left: 6, top: 8, bottom: 8, width: 2, background: 'var(--border)' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {milestones.map((m, i) => (
                <div key={i} style={{ position: 'relative' }}>
                  {/* Dot */}
                  <div style={{
                    position: 'absolute', left: -25, top: 6,
                    width: 10, height: 10, borderRadius: '50%',
                    background: 'var(--accent)', border: '2px solid var(--bg-primary)',
                  }} />
                  <div className="card" style={{ padding: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6, flexWrap: 'wrap', gap: 4 }}>
                      <span style={{ fontSize: 12, fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}>{m.year}</span>
                      <span className="source-badge source-badge--demo">{m.source || 'Demo Data'}</span>
                    </div>
                    <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{m.title}</h4>
                    <p style={{ fontSize: 13, color: 'var(--text-tertiary)', lineHeight: 1.6 }}>{m.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── WHY DID IT CHANGE (demo data only) ──────────── */}
      {!isRealData && reasons && reasons.length > 0 && (
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Why did {website?.name || domain} change?</h2>
          <p style={{ fontSize: 14, color: 'var(--text-tertiary)', marginBottom: 16 }}>Potential factors that drove the evolution</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 12 }}>
            {reasons.map(r => (
              <div key={r.category} className="card" style={{ padding: 18 }}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>{r.icon}</div>
                <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{r.title}</h4>
                <p style={{ fontSize: 12, color: 'var(--text-tertiary)', lineHeight: 1.6 }}>{r.description}</p>
                <span className="source-badge source-badge--demo" style={{ marginTop: 8 }}>Demo Data</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ─── WEBSITE DNA (demo data only) ──────────────────── */}
      {!isRealData && dna && (
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Website DNA</h2>
          <p style={{ fontSize: 14, color: 'var(--text-tertiary)', marginBottom: 16 }}>
            A multidimensional view of {website?.name || domain}'s characteristics
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, alignItems: 'center' }}>
            {/* Bars */}
            <div className="card" style={{ padding: 24 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {dna.dimensions.map((d) => (
                  <div key={d.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 16, width: 24 }}>{d.icon}</span>
                    <span style={{ fontSize: 13, color: 'var(--text-secondary)', minWidth: 110 }}>{d.label}</span>
                    <div style={{ flex: 1, height: 8, background: 'var(--bg-tertiary)', borderRadius: 4, overflow: 'hidden' }}>
                      <div style={{
                        height: '100%', width: `${d.value}%`,
                        background: 'var(--accent-gradient)', borderRadius: 4,
                        transition: 'width 1s ease',
                      }} />
                    </div>
                    <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--text-primary)', minWidth: 28 }}>{d.value}</span>
                  </div>
                ))}
              </div>
              <span className="source-badge source-badge--demo" style={{ marginTop: 16 }}>Demo Data</span>
            </div>
            {/* Radar */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <RadarChart dimensions={dna.dimensions} />
            </div>
          </div>
        </section>
      )}

      {/* ─── AI EXPLORER (demo data only) ──────────────────── */}
      {!isRealData && (
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>Ask the Time Machine</h2>
          <AIExplorer domain={domain!} />
        </section>
      )}
    </div>
  );
}

// ─── Error Display Component ─────────────────────────────────
function ErrorDisplay({ domain, errorKind }: { domain: string; errorKind: ErrorKind }) {
  const errorConfig: Record<NonNullable<ErrorKind>, { icon: string; title: string; message: string }> = {
    'not-found': {
      icon: '🔍',
      title: 'No Archived Snapshots Found',
      message: `We couldn't find any archived snapshots for "${domain}" in the Internet Archive or our demo data. The site may not have been archived, or the domain may be incorrect.`,
    },
    'api-error': {
      icon: '⚠️',
      title: 'Unable to Reach the Internet Archive',
      message: 'The Internet Archive API is currently unavailable. Please try again in a moment.',
    },
    'network-error': {
      icon: '🌐',
      title: 'Connection Error',
      message: 'Unable to connect to the Internet Archive. Please check your network connection and try again.',
    },
    'invalid-domain': {
      icon: '❌',
      title: 'Invalid Domain',
      message: `"${domain}" doesn't appear to be a valid domain name. Please enter a domain like "google.com" or "wikipedia.org".`,
    },
  };

  const config = errorConfig[errorKind || 'not-found'];

  return (
    <>
      <div style={{ fontSize: 48, marginBottom: 16 }}>{config.icon}</div>
      <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>{config.title}</h2>
      <p style={{ fontSize: 15, color: 'var(--text-tertiary)', maxWidth: 460, lineHeight: 1.7 }}>
        {config.message}
      </p>
      <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 16 }}>
        Try searching for <strong style={{ color: 'var(--text-secondary)' }}>google.com</strong>,{' '}
        <strong style={{ color: 'var(--text-secondary)' }}>youtube.com</strong>, or{' '}
        <strong style={{ color: 'var(--text-secondary)' }}>wikipedia.org</strong>
      </p>
    </>
  );
}
