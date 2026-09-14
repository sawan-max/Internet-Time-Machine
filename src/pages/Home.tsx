import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { demoWebsites } from '../data/websites';
import { eras } from '../data/eras';
import { getEventsForDate, getEventsForMonth } from '../data/onThisDay';
import WebsiteCard from '../components/cards/WebsiteCard';
import StatsCard from '../components/cards/StatsCard';

const heroYears = [1995, 2000, 2005, 2010, 2015, 2020, 2026];

export default function Home() {
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      const domain = searchInput.includes('.') ? searchInput.trim() : `${searchInput.trim()}.com`;
      navigate(`/explore/${domain}`);
    }
  };

  const now = new Date();
  const todayEvents = getEventsForDate(now.getMonth() + 1, now.getDate());
  const monthEvents = todayEvents.length > 0 ? todayEvents : getEventsForMonth(now.getMonth() + 1);

  return (
    <div>
      {/* ─── HERO ──────────────────────────────────────────── */}
      <section style={{
        minHeight: '85vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '40px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Subtle background gradient */}
        <div style={{
          position: 'absolute',
          top: '-20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 800,
          height: 600,
          background: 'radial-gradient(ellipse, rgba(56, 189, 248, 0.06), transparent 70%)',
          pointerEvents: 'none',
        }} />

        <h1 style={{
          fontSize: 'clamp(36px, 6vw, 72px)',
          fontWeight: 800,
          lineHeight: 1.1,
          letterSpacing: '-0.03em',
          maxWidth: 800,
          marginBottom: 20,
          position: 'relative',
        }}>
          Travel through the{' '}
          <span className="accent-gradient-text">history of the internet.</span>
        </h1>

        <p style={{
          fontSize: 'clamp(16px, 2vw, 20px)',
          color: 'var(--text-secondary)',
          maxWidth: 600,
          lineHeight: 1.7,
          marginBottom: 40,
        }}>
          Explore how websites evolved from simple pages into the digital products we use today.
        </p>

        {/* Search */}
        <form
          onSubmit={handleSearch}
          style={{
            display: 'flex',
            width: '100%',
            maxWidth: 560,
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-hover)',
            borderRadius: 'var(--radius-xl)',
            overflow: 'hidden',
            boxShadow: '0 4px 24px rgba(0, 0, 0, 0.3)',
          }}
        >
          <input
            type="text"
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            placeholder="Enter a website or domain..."
            style={{
              flex: 1,
              padding: '16px 24px',
              fontSize: 16,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-sans)',
            }}
          />
          <button
            type="submit"
            style={{
              padding: '16px 28px',
              fontSize: 14,
              fontWeight: 600,
              background: 'var(--accent)',
              color: '#000',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'var(--font-sans)',
              whiteSpace: 'nowrap',
              transition: 'background var(--transition-fast)',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--accent-hover)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'var(--accent)')}
          >
            Explore History →
          </button>
        </form>

        {/* Example links */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 12,
          justifyContent: 'center',
          marginTop: 16,
          fontSize: 13,
          color: 'var(--text-muted)',
        }}>
          {['google.com', 'youtube.com', 'apple.com', 'wikipedia.org'].map(domain => (
            <button
              key={domain}
              onClick={() => navigate(`/explore/${domain}`)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-tertiary)',
                cursor: 'pointer',
                fontFamily: 'var(--font-mono)',
                fontSize: 12,
                padding: '4px 10px',
                borderRadius: 'var(--radius-full)',
                transition: 'all var(--transition-fast)',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.background = 'var(--accent-dim)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-tertiary)'; e.currentTarget.style.background = 'none'; }}
            >
              {domain}
            </button>
          ))}
        </div>

        <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 12 }}>
          Example: See how YouTube changed from 2005 to today.
        </p>

        {/* Animated timeline */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 0,
          marginTop: 48,
          overflow: 'hidden',
          width: '100%',
          maxWidth: 700,
          justifyContent: 'center',
        }}>
          {heroYears.map((year, i) => (
            <div key={year} style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 6,
              }}>
                <span style={{
                  fontSize: 12,
                  fontWeight: 600,
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--text-muted)',
                  opacity: 0,
                  animation: `fadeIn 0.5s ease ${i * 0.12}s forwards`,
                }}>
                  {year}
                </span>
                <div style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: 'var(--accent)',
                  opacity: 0,
                  animation: `fadeIn 0.5s ease ${i * 0.12 + 0.1}s forwards`,
                  boxShadow: '0 0 8px rgba(56, 189, 248, 0.3)',
                }} />
              </div>
              {i < heroYears.length - 1 && (
                <div style={{
                  width: 'clamp(30px, 6vw, 70px)',
                  height: 1,
                  background: 'var(--border-hover)',
                  margin: '0 4px',
                  marginTop: 18,
                }} />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ─── POPULAR WEBSITES ──────────────────────────────── */}
      <section className="section-container" style={{ paddingTop: 40, paddingBottom: 60 }}>
        <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, textAlign: 'center' }}>
          Explore Popular Websites
        </h2>
        <p style={{ fontSize: 15, color: 'var(--text-tertiary)', textAlign: 'center', marginBottom: 40 }}>
          Discover how the biggest websites on the internet have evolved.
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
          gap: 16,
        }}>
          {demoWebsites.map(w => (
            <WebsiteCard key={w.domain} website={w} />
          ))}
        </div>
      </section>

      {/* ─── HOW IT WORKS ──────────────────────────────────── */}
      <section className="section-container" style={{ paddingTop: 60, paddingBottom: 60 }}>
        <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 48, textAlign: 'center' }}>
          How It Works
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 32,
        }}>
          {[
            { num: '01', title: 'Search', desc: 'Enter any website domain to begin exploring its history.', icon: '🔍' },
            { num: '02', title: 'Travel Through Time', desc: 'Navigate an interactive timeline of historical snapshots.', icon: '⌛' },
            { num: '03', title: 'Understand the Evolution', desc: 'Use comparisons, technology analysis, and AI insights.', icon: '📊' },
          ].map(step => (
            <div key={step.num} className="card" style={{ padding: 28 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <span style={{
                  fontSize: 28, fontWeight: 800, color: 'var(--accent)',
                  fontFamily: 'var(--font-mono)', opacity: 0.5,
                }}>{step.num}</span>
                <span style={{ fontSize: 24 }}>{step.icon}</span>
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>{step.title}</h3>
              <p style={{ fontSize: 14, color: 'var(--text-tertiary)', lineHeight: 1.7 }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── FEATURED TRANSFORMATION ───────────────────────── */}
      <section className="section-container" style={{ paddingTop: 60, paddingBottom: 60 }}>
        <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, textAlign: 'center' }}>
          Websites didn't always look like this.
        </h2>
        <p style={{ fontSize: 15, color: 'var(--text-tertiary)', textAlign: 'center', marginBottom: 40 }}>
          See how the world's most popular websites transformed over the decades.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 20,
          alignItems: 'stretch',
        }}>
          {/* Before */}
          <div className="card" style={{
            padding: 28,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12,
            minHeight: 260,
            background: 'rgba(16, 16, 28, 0.8)',
          }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Then</span>
            <span style={{ fontSize: 48, fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.06)' }}>2005</span>
            <div style={{ fontSize: 13, color: 'var(--text-tertiary)', textAlign: 'center' }}>
              Table layouts • Flash • 800×600 screens
            </div>
          </div>

          {/* Arrow */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, color: 'var(--accent)' }}>
            →
          </div>

          {/* After */}
          <div className="card" style={{
            padding: 28,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12,
            minHeight: 260,
            background: 'rgba(16, 16, 28, 0.8)',
            borderColor: 'var(--border-accent)',
          }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Now</span>
            <span style={{ fontSize: 48, fontWeight: 800, fontFamily: 'var(--font-mono)' }} className="accent-gradient-text">2026</span>
            <div style={{ fontSize: 13, color: 'var(--text-tertiary)', textAlign: 'center' }}>
              React • AI • Responsive • WebGPU
            </div>
          </div>
        </div>

        <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-secondary)', textAlign: 'center', marginTop: 24 }}>
          21 years of change
        </p>
      </section>

      {/* ─── INTERNET ERAS PREVIEW ─────────────────────────── */}
      <section className="section-container" style={{ paddingTop: 60, paddingBottom: 60 }}>
        <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, textAlign: 'center' }}>
          The Eras of the Web
        </h2>
        <p style={{ fontSize: 15, color: 'var(--text-tertiary)', textAlign: 'center', marginBottom: 40 }}>
          From static HTML pages to AI-powered experiences.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 16,
        }}>
          {eras.map(era => (
            <button
              key={era.id}
              onClick={() => navigate('/eras')}
              className="card"
              style={{
                padding: 24,
                cursor: 'pointer',
                textAlign: 'left',
                width: '100%',
                fontFamily: 'var(--font-sans)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <div style={{
                  width: 10, height: 10, borderRadius: '50%', background: era.color,
                  boxShadow: `0 0 8px ${era.color}40`,
                }} />
                <span style={{ fontSize: 11, fontWeight: 600, color: era.color, fontFamily: 'var(--font-mono)' }}>
                  {era.period}
                </span>
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>{era.name}</h3>
              <p style={{ fontSize: 13, color: 'var(--text-tertiary)', lineHeight: 1.6 }}>
                {era.subtitle}
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* ─── ON THIS DAY ───────────────────────────────────── */}
      <section className="section-container" style={{ paddingTop: 60, paddingBottom: 60 }}>
        <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, textAlign: 'center' }}>
          On This Day in Internet History
        </h2>
        <p style={{ fontSize: 15, color: 'var(--text-tertiary)', textAlign: 'center', marginBottom: 32 }}>
          {now.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
        </p>

        <div style={{ maxWidth: 640, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {monthEvents.slice(0, 4).map((event, i) => (
            <div key={i} className="card" style={{ padding: 20, display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <div style={{
                fontSize: 11, fontWeight: 700, fontFamily: 'var(--font-mono)',
                color: 'var(--accent)', whiteSpace: 'nowrap', paddingTop: 2,
              }}>
                {event.year}
              </div>
              <div>
                <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{event.title}</h4>
                <p style={{ fontSize: 13, color: 'var(--text-tertiary)', lineHeight: 1.6 }}>{event.description}</p>
                <div className="demo-badge" style={{ marginTop: 8 }}>{event.source || 'Demo Data'}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── STATS ─────────────────────────────────────────── */}
      <section className="section-container" style={{ paddingTop: 60, paddingBottom: 60 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 16,
        }}>
          <StatsCard icon="🌐" label="Websites Explored" value="12,482" />
          <StatsCard icon="📸" label="Snapshots Analyzed" value="1.8M" />
          <StatsCard icon="📅" label="Years Covered" value="1991–2026" />
          <StatsCard icon="⚙️" label="Technologies Tracked" value="340+" />
        </div>
      </section>

      {/* ─── FINAL CTA ─────────────────────────────────────── */}
      <section style={{
        textAlign: 'center',
        padding: '80px 24px',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 600,
          height: 400,
          background: 'radial-gradient(ellipse, rgba(56, 189, 248, 0.04), transparent 70%)',
          pointerEvents: 'none',
        }} />
        <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, marginBottom: 16, letterSpacing: '-0.02em' }}>
          Ready to go back in time?
        </h2>
        <p style={{ fontSize: 16, color: 'var(--text-tertiary)', marginBottom: 32 }}>
          Search a website and discover how it evolved.
        </p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            padding: '16px 36px',
            fontSize: 16,
            fontWeight: 600,
            background: 'var(--accent)',
            color: '#000',
            border: 'none',
            borderRadius: 'var(--radius-xl)',
            cursor: 'pointer',
            fontFamily: 'var(--font-sans)',
            transition: 'all var(--transition-fast)',
            boxShadow: '0 0 24px rgba(56, 189, 248, 0.2)',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent-hover)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(0)'; }}
        >
          Enter the Time Machine →
        </button>
      </section>
    </div>
  );
}
