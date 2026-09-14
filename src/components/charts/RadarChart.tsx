import { useEffect, useState } from 'react';
import type { DNADimension } from '../../types';

interface RadarChartProps {
  dimensions: DNADimension[];
  dimensionsB?: DNADimension[];
  labelA?: string;
  labelB?: string;
  size?: number;
}

export default function RadarChart({ dimensions, dimensionsB, labelA, labelB, size = 280 }: RadarChartProps) {
  const [animated, setAnimated] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(t);
  }, []);

  const center = size / 2;
  const radius = size * 0.38;
  const n = dimensions.length;

  const getPoint = (index: number, value: number): [number, number] => {
    const angle = (Math.PI * 2 * index) / n - Math.PI / 2;
    const r = (value / 100) * radius;
    return [center + r * Math.cos(angle), center + r * Math.sin(angle)];
  };

  const getPath = (dims: DNADimension[]) => {
    return dims
      .map((d, i) => {
        const [x, y] = getPoint(i, animated ? d.value : 0);
        return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
      })
      .join(' ') + ' Z';
  };

  // Grid circles
  const gridLevels = [25, 50, 75, 100];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Grid */}
        {gridLevels.map(level => (
          <polygon
            key={level}
            points={dimensions.map((_, i) => getPoint(i, level).join(',')).join(' ')}
            fill="none"
            stroke="var(--border)"
            strokeWidth={0.5}
          />
        ))}

        {/* Axis lines */}
        {dimensions.map((_, i) => {
          const [x, y] = getPoint(i, 100);
          return <line key={i} x1={center} y1={center} x2={x} y2={y} stroke="var(--border)" strokeWidth={0.5} />;
        })}

        {/* Data polygon A */}
        <polygon
          points={dimensions.map((d, i) => getPoint(i, animated ? d.value : 0).join(',')).join(' ')}
          fill="rgba(56, 189, 248, 0.15)"
          stroke="var(--accent)"
          strokeWidth={2}
          style={{ transition: 'all 0.8s ease' }}
        />

        {/* Data polygon B */}
        {dimensionsB && (
          <polygon
            points={dimensionsB.map((d, i) => getPoint(i, animated ? d.value : 0).join(',')).join(' ')}
            fill="rgba(244, 114, 182, 0.12)"
            stroke="#f472b6"
            strokeWidth={2}
            style={{ transition: 'all 0.8s ease' }}
          />
        )}

        {/* Data points A */}
        {dimensions.map((d, i) => {
          const [x, y] = getPoint(i, animated ? d.value : 0);
          return <circle key={i} cx={x} cy={y} r={4} fill="var(--accent)" style={{ transition: 'all 0.8s ease' }} />;
        })}

        {/* Labels */}
        {dimensions.map((d, i) => {
          const [x, y] = getPoint(i, 115);
          return (
            <text
              key={`label-${i}`}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="var(--text-tertiary)"
              fontSize={11}
              fontFamily="var(--font-sans)"
            >
              {d.label}
            </text>
          );
        })}
      </svg>

      {/* Legend */}
      {dimensionsB && labelA && labelB && (
        <div style={{ display: 'flex', gap: 24, fontSize: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 12, height: 3, background: 'var(--accent)', borderRadius: 2 }} />
            <span style={{ color: 'var(--text-secondary)' }}>{labelA}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 12, height: 3, background: '#f472b6', borderRadius: 2 }} />
            <span style={{ color: 'var(--text-secondary)' }}>{labelB}</span>
          </div>
        </div>
      )}
    </div>
  );
}
