import { useNavigate } from 'react-router-dom';
import type { Website } from '../../types';

interface WebsiteCardProps {
  website: Website;
}

export default function WebsiteCard({ website }: WebsiteCardProps) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/explore/${website.domain}`)}
      className="card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 12,
        padding: 24,
        cursor: 'pointer',
        textAlign: 'left',
        width: '100%',
        fontFamily: 'var(--font-sans)',
      }}
    >
      {/* Logo & Domain */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%' }}>
        <div style={{
          width: 44,
          height: 44,
          borderRadius: 'var(--radius-md)',
          background: `${website.color}18`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 22,
          flexShrink: 0,
        }}>
          {website.logo}
        </div>
        <div>
          <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)' }}>{website.name}</div>
          <div style={{ fontSize: 12, color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>{website.domain}</div>
        </div>
      </div>

      {/* Meta */}
      <div style={{ display: 'flex', gap: 16, fontSize: 12, color: 'var(--text-tertiary)' }}>
        <span>Founded {website.founded}</span>
        <span>•</span>
        <span>{website.category.split('/')[0].trim()}</span>
      </div>

      {/* CTA */}
      <div style={{
        marginTop: 'auto',
        paddingTop: 8,
        fontSize: 13,
        fontWeight: 500,
        color: 'var(--accent)',
        display: 'flex',
        alignItems: 'center',
        gap: 6,
      }}>
        Explore history
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
        </svg>
      </div>
    </button>
  );
}
