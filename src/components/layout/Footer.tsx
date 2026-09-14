import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--border)',
        padding: '48px 24px 32px',
        marginTop: 80,
      }}
    >
      <div
        className="section-container"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: 32,
        }}
      >
        {/* Brand */}
        <div style={{ maxWidth: 320 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, fontSize: 16, fontWeight: 700 }}>
            <span style={{ fontSize: 20 }}>⌛</span>
            Internet Time Machine
          </div>
          <p style={{ fontSize: 13, color: 'var(--text-tertiary)', lineHeight: 1.7 }}>
            Exploring how the web became what it is today. A digital archaeology platform for understanding website evolution.
          </p>
        </div>

        {/* Links */}
        <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap' }}>
          <div>
            <h4 style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
              Explore
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Link to="/" style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Home</Link>
              <Link to="/eras" style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Internet Eras</Link>
              <Link to="/compare" style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Compare</Link>
            </div>
          </div>
          <div>
            <h4 style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
              Project
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Link to="/about" style={{ fontSize: 13, color: 'var(--text-secondary)' }}>About</Link>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: 'var(--text-secondary)' }}>GitHub</a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="section-container"
        style={{
          marginTop: 40,
          paddingTop: 20,
          borderTop: '1px solid var(--border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 12,
        }}
      >
        <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>
          Internet Time Machine — Exploring how the web became what it is today.
        </p>
        <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>
          Built by Sawan Kaushik
        </p>
      </div>
    </footer>
  );
}
