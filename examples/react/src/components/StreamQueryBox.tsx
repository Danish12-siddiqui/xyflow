import { useState, useCallback } from 'react';

const MOCK_RESPONSE = "Hello! This is a mock streamed response coming from the server...";

export default function StreamQueryBox() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);

  const mockStreamResponse = useCallback(async () => {
    setResponse('');
    setIsStreaming(true);

    for (let i = 0; i < MOCK_RESPONSE.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setResponse((prev) => prev + MOCK_RESPONSE[i]);
    }

    setIsStreaming(false);
  }, []);

  const handleSend = () => {
    if (query.trim() && !isStreaming) {
      mockStreamResponse();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isStreaming) {
      handleSend();
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.inputRow}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter your query..."
          style={styles.input}
          disabled={isStreaming}
        />
        <button
          onClick={handleSend}
          disabled={isStreaming || !query.trim()}
          style={{
            ...styles.button,
            opacity: isStreaming || !query.trim() ? 0.6 : 1,
            cursor: isStreaming || !query.trim() ? 'not-allowed' : 'pointer',
          }}
        >
          {isStreaming ? 'Streaming...' : 'Send'}
        </button>
      </div>
      <div style={styles.responseArea}>
        <pre style={styles.responseText}>
          {response}
          {isStreaming && <span style={styles.cursor}>|</span>}
        </pre>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    padding: '20px',
    maxWidth: '600px',
    margin: '0 auto',
    fontFamily: 'sans-serif',
  },
  inputRow: {
    display: 'flex',
    gap: '10px',
  },
  input: {
    flex: 1,
    padding: '12px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '6px',
    outline: 'none',
  },
  button: {
    padding: '12px 24px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontWeight: 600,
  },
  responseArea: {
    minHeight: '150px',
    padding: '16px',
    backgroundColor: '#f5f5f5',
    borderRadius: '6px',
    border: '1px solid #e0e0e0',
  },
  responseText: {
    margin: 0,
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    fontSize: '15px',
    lineHeight: 1.6,
  },
  cursor: {
    animation: 'blink 1s infinite',
    fontWeight: 'bold',
  },
};
