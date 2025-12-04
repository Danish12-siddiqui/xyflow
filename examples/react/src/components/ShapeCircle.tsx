import React from 'react';

interface ShapeCircleProps {
  id: string;
  x: number;
  y: number;
  color: string;
  size: number;
  onDrag: (id: string, x: number, y: number) => void;
}

export default function ShapeCircle({ id, x, y, color, size, onDrag }: ShapeCircleProps) {
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
        boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
        border: '2px solid rgba(255,255,255,0.3)',
        userSelect: 'none',
        transition: 'box-shadow 0.15s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.25)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.15)';
      }}
    />
  );
}
