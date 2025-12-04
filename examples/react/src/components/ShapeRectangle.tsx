import React from 'react';

interface ShapeRectangleProps {
  id: string;
  x: number;
  y: number;
  color: string;
  width: number;
  height: number;
  onDrag: (id: string, x: number, y: number) => void;
}

export default function ShapeRectangle({ id, x, y, color, width, height, onDrag }: ShapeRectangleProps) {
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
        width: width,
        height: height,
        backgroundColor: color,
        borderRadius: '8px',
        cursor: 'grab',
        boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
        border: '2px solid rgba(255,255,255,0.3)',
        userSelect: 'none',
      }}
    />
  );
}
