import { useState, useCallback } from 'react';
import Canvas from '../../components/Canvas';
import Toolbar from '../../components/Toolbar';
import Circle from '../../components/Circle';

interface Shape {
  id: string;
  x: number;
  y: number;
  color: string;
  size: number;
}

const COLORS = ['#e74c3c', '#3498db', '#2ecc71', '#9b59b6', '#f39c12', '#1abc9c'];

export default function ShapeCanvas() {
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [counter, setCounter] = useState(1);

  const handleAddShape = useCallback(() => {
    const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)];
    const randomX = Math.floor(Math.random() * 400) + 50;
    const randomY = Math.floor(Math.random() * 300) + 50;

    const newShape: Shape = {
      id: `${counter}`,
      x: randomX,
      y: randomY,
      color: randomColor,
      size: 60,
    };

    setShapes((prev) => [...prev, newShape]);
    setCounter((prev) => prev + 1);
  }, [counter]);

  const handleDrag = useCallback((id: string, x: number, y: number) => {
    setShapes((prev) =>
      prev.map((shape) =>
        shape.id === id ? { ...shape, x, y } : shape
      )
    );
  }, []);

  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
      <Canvas>
        {shapes.map((shape) => (
          <Circle
            key={shape.id}
            id={shape.id}
            x={shape.x}
            y={shape.y}
            color={shape.color}
            size={shape.size}
            onDrag={handleDrag}
          />
        ))}
      </Canvas>
      <Toolbar onAddShape={handleAddShape} />
    </div>
  );
}
