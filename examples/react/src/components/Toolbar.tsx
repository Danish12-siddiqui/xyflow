interface ToolbarProps {
  onAddShape: () => void;
}

export default function Toolbar({ onAddShape }: ToolbarProps) {
  return (
    <div style={styles.toolbar}>
      <button onClick={onAddShape} style={styles.button}>
        Add Shape
      </button>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  toolbar: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60px',
    backgroundColor: '#2c2c2c',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    boxShadow: '0 -2px 10px rgba(0,0,0,0.2)',
    zIndex: 1000,
  },
  button: {
    padding: '12px 24px',
    fontSize: '15px',
    fontWeight: 600,
    backgroundColor: '#4a90d9',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
};
