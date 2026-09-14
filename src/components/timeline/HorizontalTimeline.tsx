import { useRef, useState, useEffect } from 'react';
import type { Snapshot } from '../../types';

interface HorizontalTimelineProps {
  snapshots: Snapshot[];
  selectedYear: number;
  onSelectYear: (year: number) => void;
  dataSource?: 'wayback' | 'demo' | null;
}

export default function HorizontalTimeline({ snapshots, selectedYear, onSelectYear, dataSource }: HorizontalTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Scroll to selected node
  useEffect(() => {
    if (containerRef.current) {
      const selectedIdx = snapshots.findIndex(s => s.year === selectedYear);
      if (selectedIdx >= 0) {
        const nodeWidth = 160;
        const containerWidth = containerRef.current.clientWidth;
        const targetScroll = selectedIdx * nodeWidth - containerWidth / 2 + nodeWidth / 2;
        containerRef.current.scrollTo({ left: targetScroll, behavior: 'smooth' });
      }
    }
  }, [selectedYear, snapshots]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (containerRef.current?.offsetLeft || 0));
    setScrollLeft(containerRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (containerRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 1.5;
    if (containerRef.current) containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const currentIdx = snapshots.findIndex(s => s.year === selectedYear);
    if (e.key === 'ArrowRight' && currentIdx < snapshots.length - 1) {
      e.preventDefault();
      onSelectYear(snapshots[currentIdx + 1].year);
    } else if (e.key === 'ArrowLeft' && currentIdx > 0) {
      e.preventDefault();
      onSelectYear(snapshots[currentIdx - 1].year);
    }
  };

  if (snapshots.length === 0) return null;

  return (
    <div style={{ position: 'relative' }}>
      {/* Data source indicator */}
      {dataSource && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '0 16px 4px', gap: 8 }}>
          <span className={`source-badge ${dataSource === 'wayback' ? 'source-badge--wayback' : 'source-badge--demo'}`}>
            {dataSource === 'wayback' ? 'Source: Internet Archive' : 'Demo Data'}
          </span>
        </div>
      )}
    <div style={{ position: 'relative' }}>
      {/* Fade edges */}
      <div style={{
        position: 'absolute', top: 0, left: 0, bottom: 0, width: 60, zIndex: 2,
        background: 'linear-gradient(to right, var(--bg-primary), transparent)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: 0, right: 0, bottom: 0, width: 60, zIndex: 2,
        background: 'linear-gradient(to left, var(--bg-primary), transparent)',
        pointerEvents: 'none',
      }} />

      <div
        ref={containerRef}
        role="tablist"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{
          display: 'flex',
          alignItems: 'center',
          overflowX: 'auto',
          scrollbarWidth: 'none',
          padding: '24px 60px',
          cursor: isDragging ? 'grabbing' : 'grab',
          userSelect: 'none',
          position: 'relative',
        }}
      >
        {/* Timeline line */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: 60,
          right: 60,
          height: 2,
          background: 'var(--border)',
          transform: 'translateY(-50%)',
        }} />

        {snapshots.map((snapshot, i) => {
          const isSelected = snapshot.year === selectedYear;
          return (
            <div key={snapshot.id} style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
              <button
                role="tab"
                aria-selected={isSelected}
                aria-label={`${snapshot.year} — ${snapshot.title}`}
                onClick={() => onSelectYear(snapshot.year)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 8,
                  padding: '16px 20px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  position: 'relative',
                  zIndex: 3,
                  fontFamily: 'var(--font-sans)',
                  transition: 'all var(--transition-base)',
                  minWidth: 120,
                }}
              >
                {/* Year label top */}
                <span style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: isSelected ? 'var(--accent)' : 'var(--text-muted)',
                  fontFamily: 'var(--font-mono)',
                  transition: 'color var(--transition-fast)',
                }}>
                  {snapshot.year}
                </span>

                {/* Node */}
                <div style={{
                  width: isSelected ? 18 : 12,
                  height: isSelected ? 18 : 12,
                  borderRadius: '50%',
                  background: isSelected ? 'var(--accent)' : 'var(--bg-tertiary)',
                  border: isSelected ? '3px solid var(--accent)' : '2px solid var(--text-muted)',
                  boxShadow: isSelected ? '0 0 16px rgba(56, 189, 248, 0.4)' : 'none',
                  transition: 'all var(--transition-base)',
                }} />

                {/* Title below */}
                <span style={{
                  fontSize: 11,
                  fontWeight: 500,
                  color: isSelected ? 'var(--text-primary)' : 'var(--text-tertiary)',
                  maxWidth: 110,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  transition: 'color var(--transition-fast)',
                }}>
                  {snapshot.title}
                </span>
              </button>

              {/* Connector line */}
              {i < snapshots.length - 1 && (
                <div style={{
                  width: 40,
                  height: 2,
                  background: 'var(--border-hover)',
                  flexShrink: 0,
                }} />
              )}
            </div>
          );
        })}
      </div>

      <style>{`
        [role="tablist"]::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
    </div>
  );
}
