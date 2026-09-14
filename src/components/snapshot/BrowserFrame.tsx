import { useState, useRef, useCallback, useEffect } from 'react';
import type { Snapshot } from '../../types';
import { generateSnapshotPlaceholder } from '../../utils';

interface BrowserFrameProps {
  snapshot: Snapshot | undefined;
  domain: string;
}

// ─── Iframe Load Timeout (ms) ─────────────────────────────────
const IFRAME_LOAD_TIMEOUT = 8000;

export default function BrowserFrame({ snapshot, domain }: BrowserFrameProps) {
  const [iframeStatus, setIframeStatus] = useState<'loading' | 'loaded' | 'failed'>('loading');
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Reset iframe status when snapshot changes
  useEffect(() => {
    if (snapshot?.source === 'wayback' && snapshot.archiveUrl) {
      setIframeStatus('loading');
      // Set a timeout — if iframe doesn't load in time, show fallback
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setIframeStatus(prev => prev === 'loading' ? 'failed' : prev);
      }, IFRAME_LOAD_TIMEOUT);
    }
    return () => clearTimeout(timeoutRef.current);
  }, [snapshot?.id, snapshot?.source, snapshot?.archiveUrl]);

  const handleIframeLoad = useCallback(() => {
    clearTimeout(timeoutRef.current);
    // The iframe fired "load" but might have been blocked.
    // We treat it as loaded — the user will see the content or a blank page.
    // We can't reliably detect X-Frame-Options blocking from JS.
    // To be safe, we always show the "Open Snapshot" link below the iframe.
    setIframeStatus('loaded');
  }, []);

  const handleIframeError = useCallback(() => {
    clearTimeout(timeoutRef.current);
    setIframeStatus('failed');
  }, []);

  if (!snapshot) {
    return (
      <div className="card" style={{ padding: 40, textAlign: 'center' }}>
        <p style={{ color: 'var(--text-tertiary)' }}>Select a year to view a snapshot</p>
      </div>
    );
  }

  const isWayback = snapshot.source === 'wayback' && snapshot.archiveUrl;
  const addressUrl = isWayback
    ? snapshot.archiveUrl!
    : `https://web.archive.org/web/${snapshot.year}/${domain}`;

  return (
    <div style={{
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      border: '1px solid var(--border)',
      background: 'var(--bg-secondary)',
      transition: 'all var(--transition-base)',
    }}>
      {/* Browser Chrome */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '10px 16px',
        background: 'var(--bg-tertiary)',
        borderBottom: '1px solid var(--border)',
      }}>
        {/* Traffic lights */}
        <div style={{ display: 'flex', gap: 6, marginRight: 8 }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57' }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e' }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840' }} />
        </div>

        {/* Nav buttons */}
        <button aria-label="Back" style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: 14 }}>←</button>
        <button aria-label="Forward" style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: 14 }}>→</button>
        <button aria-label="Reload" style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: 14 }}>↻</button>

        {/* Address bar */}
        <div style={{
          flex: 1,
          padding: '5px 12px',
          background: 'var(--bg-secondary)',
          borderRadius: 'var(--radius-sm)',
          fontSize: 12,
          fontFamily: 'var(--font-mono)',
          color: 'var(--text-tertiary)',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}>
          {addressUrl}
        </div>
      </div>

      {/* Snapshot Content */}
      {isWayback ? (
        <WaybackContent
          snapshot={snapshot}
          domain={domain}
          iframeStatus={iframeStatus}
          iframeRef={iframeRef}
          onIframeLoad={handleIframeLoad}
          onIframeError={handleIframeError}
        />
      ) : (
        <DemoContent snapshot={snapshot} domain={domain} />
      )}

      {/* Snapshot info bar */}
      <SnapshotInfoBar snapshot={snapshot} />
    </div>
  );
}

// ─── Wayback Content (iframe + fallback) ─────────────────────
interface WaybackContentProps {
  snapshot: Snapshot;
  domain: string;
  iframeStatus: 'loading' | 'loaded' | 'failed';
  iframeRef: React.RefObject<HTMLIFrameElement | null>;
  onIframeLoad: () => void;
  onIframeError: () => void;
}

function WaybackContent({
  snapshot,
  iframeStatus,
  iframeRef,
  onIframeLoad,
  onIframeError,
}: WaybackContentProps) {
  const showIframe = iframeStatus !== 'failed';

  return (
    <div style={{ position: 'relative' }}>
      {/* Source badge */}
      <div style={{ position: 'absolute', top: 12, right: 12, zIndex: 5 }}>
        <span className="source-badge source-badge--wayback">Source: Internet Archive</span>
      </div>

      {/* Loading overlay */}
      {iframeStatus === 'loading' && (
        <div style={{
          position: 'absolute',
          inset: 0,
          zIndex: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 16,
          background: 'var(--bg-secondary)',
        }}>
          <div className="wayback-loading__spinner" />
          <span className="wayback-loading__text">Loading archived snapshot...</span>
        </div>
      )}

      {/* Iframe — best-effort rendering */}
      {showIframe && snapshot.archiveUrl && (
        <div className="iframe-container">
          <iframe
            ref={iframeRef}
            src={snapshot.archiveUrl}
            title={`Archived snapshot of ${snapshot.domain} from ${snapshot.date}`}
            sandbox="allow-scripts allow-same-origin"
            onLoad={onIframeLoad}
            onError={onIframeError}
            loading="lazy"
            style={{
              opacity: iframeStatus === 'loaded' ? 1 : 0,
              transition: 'opacity 0.3s ease',
            }}
          />
        </div>
      )}

      {/* Fallback — always shown when iframe fails */}
      {iframeStatus === 'failed' && (
        <FallbackCard snapshot={snapshot} />
      )}

      {/* Always show "Open Snapshot" link, even when iframe loads.
          iframe might render blank due to CSP/X-Frame-Options blocking
          that we can't detect from JavaScript. */}
      {iframeStatus === 'loaded' && snapshot.archiveUrl && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          padding: '8px 16px',
          background: 'var(--bg-tertiary)',
          borderTop: '1px solid var(--border)',
          fontSize: 12,
          color: 'var(--text-tertiary)',
        }}>
          <span>If the snapshot appears blank:</span>
          <a
            href={snapshot.archiveUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: 'var(--accent)',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            Open Snapshot ↗
          </a>
        </div>
      )}
    </div>
  );
}

// ─── Fallback Card ───────────────────────────────────────────
function FallbackCard({ snapshot }: { snapshot: Snapshot }) {
  return (
    <div className="fallback-card">
      <div className="fallback-card__icon">📦</div>
      <div className="fallback-card__title">Archived snapshot available</div>

      <div className="fallback-card__meta">
        <div>
          <strong>Timestamp:</strong> {snapshot.date}
        </div>
        <div>
          <strong>Domain:</strong> {snapshot.domain}
        </div>
        <div>
          <strong>Source:</strong> Internet Archive / Wayback Machine
        </div>
      </div>

      {snapshot.archiveUrl && (
        <div className="fallback-card__url" title={snapshot.archiveUrl}>
          {snapshot.archiveUrl}
        </div>
      )}

      {snapshot.archiveUrl && (
        <a
          href={snapshot.archiveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="fallback-card__button"
        >
          Open Snapshot ↗
        </a>
      )}

      <p style={{ fontSize: 11, color: 'var(--text-muted)', maxWidth: 380 }}>
        This snapshot cannot be embedded due to browser restrictions (CSP, X-Frame-Options).
        Click the button above to view it directly on the Internet Archive.
      </p>
    </div>
  );
}

// ─── Demo Content (preserved original placeholder) ───────────
function DemoContent({ snapshot, domain }: { snapshot: Snapshot; domain: string }) {
  const bgColor = generateSnapshotPlaceholder(domain, snapshot.year);

  return (
    <div style={{
      minHeight: 380,
      background: bgColor,
      padding: 32,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 16,
      position: 'relative',
    }}>
      {/* Demo badge */}
      <div className="source-badge source-badge--demo" style={{ position: 'absolute', top: 12, right: 12 }}>
        Demo Data
      </div>

      {/* Simulated page representation */}
      <div style={{
        width: '100%',
        maxWidth: 480,
        padding: 24,
        background: 'rgba(255,255,255,0.03)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid rgba(255,255,255,0.06)',
      }}>
        {/* Fake nav */}
        <div style={{ display: 'flex', gap: 16, marginBottom: 20, paddingBottom: 12, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>
            {domain.split('.')[0].charAt(0).toUpperCase() + domain.split('.')[0].slice(1)}
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            {['Home', 'About', 'More'].map(l => (
              <div key={l} style={{ fontSize: 11, color: 'var(--text-muted)' }}>{l}</div>
            ))}
          </div>
        </div>

        {/* Era-specific placeholder content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-secondary)' }}>
            {snapshot.title}
          </div>
          <div className="skeleton" style={{ height: 8, width: '90%', opacity: 0.3 }} />
          <div className="skeleton" style={{ height: 8, width: '75%', opacity: 0.3 }} />
          <div className="skeleton" style={{ height: 8, width: '60%', opacity: 0.3 }} />
          <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
            <div className="skeleton" style={{ height: 40, width: 80, opacity: 0.2 }} />
            <div className="skeleton" style={{ height: 40, width: 80, opacity: 0.2 }} />
          </div>
        </div>
      </div>

      <p style={{ fontSize: 11, color: 'var(--text-muted)', textAlign: 'center', maxWidth: 400, marginTop: 8 }}>
        This is a demo representation. Search any domain to load real archived snapshots from the Internet Archive.
      </p>
    </div>
  );
}

// ─── Snapshot Info Bar ───────────────────────────────────────
function SnapshotInfoBar({ snapshot }: { snapshot: Snapshot }) {
  const isWayback = snapshot.source === 'wayback';

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 16px',
      borderTop: '1px solid var(--border)',
      fontSize: 12,
      color: 'var(--text-tertiary)',
      flexWrap: 'wrap',
      gap: 8,
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <span>{snapshot.date} — {snapshot.title}</span>
        {isWayback && snapshot.archiveUrl && (
          <span style={{
            fontSize: 10,
            fontFamily: 'var(--font-mono)',
            color: 'var(--text-muted)',
            maxWidth: 400,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
            title={snapshot.archiveUrl}
          >
            {snapshot.archiveUrl}
          </span>
        )}
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
        {!isWayback && snapshot.technologies.slice(0, 4).map(tech => (
          <span key={tech} style={{
            padding: '2px 8px',
            fontSize: 10,
            fontWeight: 500,
            background: 'var(--accent-dim)',
            color: 'var(--accent)',
            borderRadius: 'var(--radius-full)',
          }}>{tech}</span>
        ))}
        <span className={`source-badge ${isWayback ? 'source-badge--wayback' : 'source-badge--demo'}`}>
          {isWayback ? 'Internet Archive' : 'Demo Data'}
        </span>
      </div>
    </div>
  );
}
