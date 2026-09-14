export default function About() {
  return (
    <div className="section-container" style={{ paddingTop: 40, paddingBottom: 60, maxWidth: 720 }}>
      <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 24 }}>
        What is Internet Time Machine?
      </h1>

      <p style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 32 }}>
        The web changes constantly. Websites are redesigned, technologies evolve, and entire design paradigms emerge and fade. 
        Internet Time Machine helps us see what changed, when it changed, and why it mattered.
      </p>

      {/* Mission */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>Mission</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          Internet Time Machine is a digital archaeology platform built to make the web's history accessible, visual, 
          and understandable. By combining historical snapshots, timeline visualization, technology detection, 
          and AI-powered analysis, it provides a comprehensive view of how websites have evolved over decades.
        </p>
      </section>

      {/* Technology */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>Technology</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
          {['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'React Router'].map(tech => (
            <span key={tech} style={{
              padding: '4px 14px', fontSize: 12, fontWeight: 500,
              background: 'var(--accent-dim)', color: 'var(--accent)',
              borderRadius: 'var(--radius-full)',
            }}>{tech}</span>
          ))}
        </div>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          Built with a modern, modular architecture. The service layer is designed for seamless integration 
          with external APIs including the Internet Archive's Wayback Machine and LLM providers for AI-powered 
          historical analysis.
        </p>
      </section>

      {/* Data Sources */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>Data Sources</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { name: 'Internet Archive / Wayback Machine', status: 'Planned Integration', color: 'var(--warning)' },
            { name: 'Technology Detection APIs', status: 'Planned', color: 'var(--text-muted)' },
            { name: 'LLM / AI Analysis', status: 'Demo Mode', color: 'var(--warning)' },
            { name: 'Demo Dataset', status: 'Active', color: 'var(--success)' },
          ].map(source => (
            <div key={source.name} className="card" style={{ padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{source.name}</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: source.color }}>{source.status}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Limitations */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>Limitations</h2>
        <ul style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 2, paddingLeft: 20 }}>
          <li>Currently uses demo data — real historical snapshots require Wayback Machine API integration</li>
          <li>AI responses are mocked — connect an LLM API for real analysis</li>
          <li>Technology detection is estimated, not verified</li>
          <li>Evolution scores are illustrative, not scientifically measured</li>
          <li>Historical events and milestones are demo content and should be independently verified</li>
        </ul>
      </section>

      {/* Developer */}
      <section style={{
        padding: 28,
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border)',
        background: 'var(--bg-card)',
      }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>Built By</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
          <div style={{
            width: 56, height: 56, borderRadius: '50%',
            background: 'var(--accent-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 24, fontWeight: 700, color: 'var(--accent)',
          }}>
            SK
          </div>
          <div>
            <h3 style={{ fontSize: 18, fontWeight: 700 }}>Sawan Kaushik</h3>
            <p style={{ fontSize: 13, color: 'var(--text-tertiary)' }}>
              B.Tech — Computer Science & Engineering (AI & Data Science)
            </p>
          </div>
        </div>

        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 20 }}>
          A digital archaeology platform exploring website evolution through data visualization, 
          systems architecture, and AI-powered analysis. Focused on building products at the 
          intersection of data engineering, historical analysis, and modern web technology.
        </p>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {[
            { label: 'GitHub', icon: '💻', url: 'https://github.com' },
            { label: 'LinkedIn', icon: '🔗', url: 'https://linkedin.com' },
            { label: 'Resume', icon: '📄', url: '#' },
          ].map(link => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '8px 16px',
                fontSize: 13, fontWeight: 500,
                color: 'var(--text-secondary)',
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)',
                transition: 'all var(--transition-fast)',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-hover)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
            >
              <span>{link.icon}</span>
              {link.label}
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
