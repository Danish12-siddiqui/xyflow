import { ReactNode } from 'react';

interface CanvasBoardProps {
  children: ReactNode;
}

export default function CanvasBoard({ children }: CanvasBoardProps) {
  return (
    <div style={styles.canvas} className="canvas-board">
      {children}
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  canvas: {
    flex: 1,
    position: 'relative',
    backgroundSize: '24px 24px',
    overflow: 'hidden',
    minHeight: '300px',
  },
};
