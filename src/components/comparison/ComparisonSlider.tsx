import { useState, useRef, useCallback } from 'react';
import type { Snapshot } from '../../types';
import { generateSnapshotPlaceholder } from '../../utils';

interface ComparisonSliderProps {
  snapshotA: Snapshot;
  snapshotB: Snapshot;
  domain: string;
}

export default function ComparisonSlider({ snapshotA, snapshotB, domain }: ComparisonSliderProps) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.max(5, Math.min(95, x)));
  }, []);

  const handleMouseDown = () => { isDraggingRef.current = true; };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDraggingRef.current) updatePosition(e.clientX);
  };
  const handleMouseUp = () => { isDraggingRef.current = false; };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) updatePosition(e.touches[0].clientX);
  };

  const bgA = generateSnapshotPlaceholder(domain, snapshotA.year);
  const bgB = generateSnapshotPlaceholder(domain, snapshotB.year);

  return (
    <div>
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchMove={handleTouchMove}
        style={{
          position: 'relative',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          border: '1px solid var(--border)',
          height: 400,
          cursor: 'col-resize',
          userSelect: 'none',
        }}
      >
        {/* Right panel (full background) */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: bgB,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 12,
        }}>
          <div style={{
            fontSize: 48, fontWeight: 800, color: 'rgba(255,255,255,0.08)',
            fontFamily: 'var(--font-mono)',
          }}>{snapshotB.year}</div>
          <div style={{ fontSize: 14, color: 'var(--text-tertiary)' }}>{snapshotB.title}</div>
          <div style={{ position: 'absolute', top: 12, right: 12, padding: '4px 12px', borderRadius: 'var(--radius-full)', background: 'rgba(0,0,0,0.5)', fontSize: 12, color: 'var(--text-secondary)' }}>
            {snapshotB.year}
          </div>
        </div>

        {/* Left panel (clipped) */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: bgA,
          clipPath: `inset(0 ${100 - position}% 0 0)`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 12,
        }}>
          <div style={{
            fontSize: 48, fontWeight: 800, color: 'rgba(255,255,255,0.08)',
            fontFamily: 'var(--font-mono)',
          }}>{snapshotA.year}</div>
          <div style={{ fontSize: 14, color: 'var(--text-tertiary)' }}>{snapshotA.title}</div>
          <div style={{ position: 'absolute', top: 12, left: 12, padding: '4px 12px', borderRadius: 'var(--radius-full)', background: 'rgba(0,0,0,0.5)', fontSize: 12, color: 'var(--text-secondary)' }}>
            {snapshotA.year}
          </div>
        </div>

        {/* Slider handle */}
        <div
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: `${position}%`,
            transform: 'translateX(-50%)',
            width: 4,
            background: 'var(--accent)',
            boxShadow: '0 0 12px rgba(56, 189, 248, 0.5)',
            zIndex: 5,
            cursor: 'col-resize',
          }}
        >
          {/* Handle grip */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: 'var(--accent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(56, 189, 248, 0.4)',
            fontSize: 14,
            color: '#000',
            fontWeight: 700,
          }}>
            ⟺
          </div>
        </div>
      </div>

      {/* Years comparison label */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '12px 0',
        fontSize: 13,
        fontWeight: 600,
      }}>
        <span style={{ color: 'var(--accent)' }}>{snapshotA.year} — {snapshotA.title}</span>
        <span style={{ color: 'var(--text-secondary)' }}>
          {snapshotB.year - snapshotA.year} years of change
        </span>
        <span style={{ color: 'var(--accent)' }}>{snapshotB.year} — {snapshotB.title}</span>
      </div>
    </div>
  );
}
