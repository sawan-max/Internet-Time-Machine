import { useEffect, useState } from 'react';

interface ProgressBarProps {
  label: string;
  score: number;
  color: string;
  delay?: number;
}

export default function ProgressBar({ label, score, color, delay = 0 }: ProgressBarProps) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setWidth(score), delay + 100);
    return () => clearTimeout(t);
  }, [score, delay]);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <span style={{ fontSize: 13, color: 'var(--text-secondary)', minWidth: 160, whiteSpace: 'nowrap' }}>{label}</span>
      <div style={{
        flex: 1,
        height: 8,
        background: 'var(--bg-tertiary)',
        borderRadius: 4,
        overflow: 'hidden',
      }}>
        <div style={{
          height: '100%',
          width: `${width}%`,
          background: color,
          borderRadius: 4,
          transition: 'width 1s ease',
        }} />
      </div>
      <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', minWidth: 28 }}>
        {score}
      </span>
    </div>
  );
}
