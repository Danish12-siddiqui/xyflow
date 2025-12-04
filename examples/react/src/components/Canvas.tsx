import { ReactNode } from 'react';

interface CanvasProps {
  children: ReactNode;
}

export default function Canvas({ children }: CanvasProps) {
  return (
    <div style={styles.canvas}>
      {children}
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  canvas: {
    position: 'relative',
    width: '100%',
    height: 'calc(100vh - 120px)',
    backgroundColor: '#e8e8e8',
    overflow: 'hidden',
    border: '2px dashed #ccc',
    marginTop: '10px',
  },
};
