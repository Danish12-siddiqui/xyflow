import StreamQueryBox from '../../components/StreamQueryBox';

export default function StreamQueryExample() {
  return (
    <div style={{ padding: '40px 20px', height: '100%', boxSizing: 'border-box' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px', fontFamily: 'sans-serif' }}>
        Stream Query Box
      </h2>
      <StreamQueryBox />
    </div>
  );
}
