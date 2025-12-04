import { useState, useCallback } from 'react';
import CanvasArea from '../../components/CanvasArea';
import BottomToolbar from '../../components/BottomToolbar';
import ShapeCircle from '../../components/ShapeCircle';
import ShapeRectangle from '../../components/ShapeRectangle';
import ShapeLine from '../../components/ShapeLine';
import ShapeArrow from '../../components/ShapeArrow';
import ShapeText from '../../components/ShapeText';

type ShapeType = 'circle' | 'rectangle' | 'line' | 'arrow' | 'text';

interface Shape {
  id: string;
  type: ShapeType;
  x: number;
  y: number;
  color: string;
  size?: number;
  width?: number;
  height?: number;
  length?: number;
  text?: string;
}

const COLORS = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#a29bfe', '#fd79a8', '#6c5ce7'];

export default function CollaborativeCanvas() {
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [counter, setCounter] = useState(1);

  const getRandomPosition = () => ({
    x: Math.floor(Math.random() * (window.innerWidth - 300)) + 100,
    y: Math.floor(Math.random() * (window.innerHeight - 400)) + 100,
  });

  const getRandomColor = () => COLORS[Math.floor(Math.random() * COLORS.length)];

  const handleAddCircle = useCallback(() => {
    const pos = getRandomPosition();
    const newShape: Shape = {
      id: `circle-${counter}`,
      type: 'circle',
      x: pos.x,
      y: pos.y,
      color: getRandomColor(),
      size: Math.floor(Math.random() * 40) + 50,
    };
    setShapes((prev) => [...prev, newShape]);
    setCounter((prev) => prev + 1);
  }, [counter]);

  const handleAddRectangle = useCallback(() => {
    const pos = getRandomPosition();
    const newShape: Shape = {
      id: `rect-${counter}`,
      type: 'rectangle',
      x: pos.x,
      y: pos.y,
      color: getRandomColor(),
      width: Math.floor(Math.random() * 60) + 80,
      height: Math.floor(Math.random() * 40) + 50,
    };
    setShapes((prev) => [...prev, newShape]);
    setCounter((prev) => prev + 1);
  }, [counter]);

  const handleAddLine = useCallback(() => {
    const pos = getRandomPosition();
    const newShape: Shape = {
      id: `line-${counter}`,
      type: 'line',
      x: pos.x,
      y: pos.y,
      color: getRandomColor(),
      length: Math.floor(Math.random() * 100) + 100,
    };
    setShapes((prev) => [...prev, newShape]);
    setCounter((prev) => prev + 1);
  }, [counter]);

  const handleAddArrow = useCallback(() => {
    const pos = getRandomPosition();
    const newShape: Shape = {
      id: `arrow-${counter}`,
      type: 'arrow',
      x: pos.x,
      y: pos.y,
      color: getRandomColor(),
      length: Math.floor(Math.random() * 80) + 100,
    };
    setShapes((prev) => [...prev, newShape]);
    setCounter((prev) => prev + 1);
  }, [counter]);

  const handleAddText = useCallback(() => {
    const pos = getRandomPosition();
    const newShape: Shape = {
      id: `text-${counter}`,
      type: 'text',
      x: pos.x,
      y: pos.y,
      color: getRandomColor(),
      text: 'Text',
    };
    setShapes((prev) => [...prev, newShape]);
    setCounter((prev) => prev + 1);
  }, [counter]);

  const handleClear = useCallback(() => {
    setShapes([]);
    setCounter(1);
  }, []);

  const handleDrag = useCallback((id: string, x: number, y: number) => {
    setShapes((prev) =>
      prev.map((shape) => (shape.id === id ? { ...shape, x, y } : shape))
    );
  }, []);

  const handleTextChange = useCallback((id: string, text: string) => {
    setShapes((prev) =>
      prev.map((shape) => (shape.id === id ? { ...shape, text } : shape))
    );
  }, []);

  const renderShape = (shape: Shape) => {
    switch (shape.type) {
      case 'circle':
        return (
          <ShapeCircle
            key={shape.id}
            id={shape.id}
            x={shape.x}
            y={shape.y}
            color={shape.color}
            size={shape.size || 60}
            onDrag={handleDrag}
          />
        );
      case 'rectangle':
        return (
          <ShapeRectangle
            key={shape.id}
            id={shape.id}
            x={shape.x}
            y={shape.y}
            color={shape.color}
            width={shape.width || 100}
            height={shape.height || 60}
            onDrag={handleDrag}
          />
        );
      case 'line':
        return (
          <ShapeLine
            key={shape.id}
            id={shape.id}
            x={shape.x}
            y={shape.y}
            color={shape.color}
            length={shape.length || 150}
            onDrag={handleDrag}
          />
        );
      case 'arrow':
        return (
          <ShapeArrow
            key={shape.id}
            id={shape.id}
            x={shape.x}
            y={shape.y}
            color={shape.color}
            length={shape.length || 120}
            onDrag={handleDrag}
          />
        );
      case 'text':
        return (
          <ShapeText
            key={shape.id}
            id={shape.id}
            x={shape.x}
            y={shape.y}
            color={shape.color}
            text={shape.text || 'Text'}
            onDrag={handleDrag}
            onTextChange={handleTextChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <CanvasArea>
        {shapes.map(renderShape)}
      </CanvasArea>
      <BottomToolbar
        onAddCircle={handleAddCircle}
        onAddRectangle={handleAddRectangle}
        onAddLine={handleAddLine}
        onAddArrow={handleAddArrow}
        onAddText={handleAddText}
        onClear={handleClear}
      />
    </>
  );
}
