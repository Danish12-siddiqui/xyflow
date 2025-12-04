import { ReactNode } from 'react';

interface CanvasAreaProps {
  children: ReactNode;
}

export default function CanvasArea({ children }: CanvasAreaProps) {
  return (
    <div style={styles.canvas}>
      {children}
      {!children || (Array.isArray(children) && children.length === 0) ? (
        <div style={styles.placeholder}>
          Click "Add Shape" (circle icon) in the toolbar below to add shapes
        </div>
      ) : null}
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  canvas: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#f5f5f5',
    backgroundImage: 'radial-gradient(circle, #ddd 1px, transparent 1px)',
    backgroundSize: '20px 20px',
    overflow: 'hidden',
  },
  placeholder: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: '#999',
    fontSize: '16px',
    textAlign: 'center',
    pointerEvents: 'none',
  },
};
