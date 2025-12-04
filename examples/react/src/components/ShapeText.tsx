import React, { useState } from 'react';

interface ShapeTextProps {
  id: string;
  x: number;
  y: number;
  color: string;
  text: string;
  onDrag: (id: string, x: number, y: number) => void;
  onTextChange: (id: string, text: string) => void;
}

export default function ShapeText({ id, x, y, color, text, onDrag, onTextChange }: ShapeTextProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(text);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isEditing) return;
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

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    onTextChange(id, value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setIsEditing(false);
      onTextChange(id, value);
    }
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      onDoubleClick={handleDoubleClick}
      style={{
        position: 'absolute',
        left: x,
        top: y,
        cursor: isEditing ? 'text' : 'grab',
        userSelect: 'none',
        padding: '8px 12px',
        backgroundColor: 'rgba(255,255,255,0.9)',
        borderRadius: '6px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
        border: `2px solid ${color}`,
        minWidth: '60px',
      }}
    >
      {isEditing ? (
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          autoFocus
          style={{
            border: 'none',
            outline: 'none',
            fontSize: '16px',
            fontWeight: 500,
            color: color,
            backgroundColor: 'transparent',
            width: '100%',
            minWidth: '80px',
          }}
        />
      ) : (
        <span style={{ fontSize: '16px', fontWeight: 500, color: color }}>
          {value || 'Double-click to edit'}
        </span>
      )}
    </div>
  );
}
