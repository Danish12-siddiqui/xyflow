import { useState, useCallback } from 'react';
import CanvasBoard from '../../components/CanvasBoard';
import ChatInput from '../../components/ChatInput';
import ToolbarUnderChat from '../../components/ToolbarUnderChat';
import ShapeBubble from '../../components/ShapeBubble';

interface Shape {
  id: string;
  x: number;
  y: number;
  color: string;
  size: number;
}

const COLORS = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#a29bfe', '#fd79a8', '#6c5ce7'];

export default function ChatCanvas() {
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [counter, setCounter] = useState(1);

  const handleAddShape = useCallback(() => {
    const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)];
    const randomX = Math.floor(Math.random() * 400) + 50;
    const randomY = Math.floor(Math.random() * 200) + 50;
    const randomSize = Math.floor(Math.random() * 30) + 50;

    const newShape: Shape = {
      id: `shape-${counter}`,
      x: randomX,
      y: randomY,
      color: randomColor,
      size: randomSize,
    };

    setShapes((prev) => [...prev, newShape]);
    setCounter((prev) => prev + 1);
  }, [counter]);

  const handleDrag = useCallback((id: string, x: number, y: number) => {
    setShapes((prev) =>
      prev.map((shape) => (shape.id === id ? { ...shape, x, y } : shape))
    );
  }, []);

  const handleSendMessage = (message: string) => {
    console.log('Message sent:', message);
  };

  return (
    <div style={styles.container} className="chat-canvas-container">
      {/* Canvas Area - Top */}
      <CanvasBoard>
        {shapes.map((shape) => (
          <ShapeBubble
            key={shape.id}
            id={shape.id}
            x={shape.x}
            y={shape.y}
            color={shape.color}
            size={shape.size}
            onDrag={handleDrag}
          />
        ))}
      </CanvasBoard>

      {/* Bottom Section: Chat + Toolbar */}
      <div style={styles.bottomSection} className="chat-canvas-bottom">
        {/* Chat Input */}
        <ChatInput onSend={handleSendMessage} />

        {/* Toolbar Under Chat */}
        <ToolbarUnderChat onAddShape={handleAddShape} />
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: '100%',
  },
  bottomSection: {
    borderTop: '1px solid #eee',
  },
};
