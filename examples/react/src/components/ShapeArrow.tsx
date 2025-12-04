import React from 'react';

interface ShapeArrowProps {
  id: string;
  x: number;
  y: number;
  color: string;
  length: number;
  onDrag: (id: string, x: number, y: number) => void;
}

export default function ShapeArrow({ id, x, y, color, length, onDrag }: ShapeArrowProps) {
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
    <svg
      onMouseDown={handleMouseDown}
      style={{
        position: 'absolute',
        left: x,
        top: y,
        cursor: 'grab',
        userSelect: 'none',
        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
      }}
      width={length}
      height="24"
      viewBox={`0 0 ${length} 24`}
    >
      <line
        x1="0"
        y1="12"
        x2={length - 12}
        y2="12"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <polygon
        points={`${length - 16},4 ${length},12 ${length - 16},20`}
        fill={color}
      />
    </svg>
  );
}
