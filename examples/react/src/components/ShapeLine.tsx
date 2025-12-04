import React from 'react';

interface ShapeLineProps {
  id: string;
  x: number;
  y: number;
  color: string;
  length: number;
  onDrag: (id: string, x: number, y: number) => void;
}

export default function ShapeLine({ id, x, y, color, length, onDrag }: ShapeLineProps) {
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
        width: length,
        height: '4px',
        backgroundColor: color,
        cursor: 'grab',
        boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
        borderRadius: '2px',
        userSelect: 'none',
      }}
    />
  );
}
