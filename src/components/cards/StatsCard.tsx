interface StatsCardProps {
  label: string;
  value: string;
  icon: string;
  suffix?: string;
}

export default function StatsCard({ label, value, icon, suffix }: StatsCardProps) {
  return (
    <div className="card" style={{ padding: 24, textAlign: 'center' }}>
      <div style={{ fontSize: 28, marginBottom: 8 }}>{icon}</div>
      <div style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>
        {value}
        {suffix && <span style={{ fontSize: 18, color: 'var(--text-tertiary)', fontWeight: 500 }}>{suffix}</span>}
      </div>
      <div style={{ fontSize: 13, color: 'var(--text-tertiary)', marginTop: 4 }}>{label}</div>
      <div className="demo-badge" style={{ margin: '12px auto 0' }}>Demo Statistics</div>
    </div>
  );
}
