import React from 'react';

interface ShapeBubbleProps {
  id: string;
  x: number;
  y: number;
  color: string;
  size: number;
  onDrag: (id: string, x: number, y: number) => void;
}

export default function ShapeBubble({ id, x, y, color, size, onDrag }: ShapeBubbleProps) {
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    const startX = e.clientX - x;
    const startY = e.clientY - y;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      onDrag(id, moveEvent.clientX - startX, moveEvent.clientY - startY);
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: color,
        cursor: 'grab',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        border: '3px solid rgba(255,255,255,0.8)',
        userSelect: 'none',
      }}
    />
  );
}
