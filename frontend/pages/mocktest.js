import { useEffect, useState } from 'react';

export default function MockTest() {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const res = await fetch('http://localhost:5000/api/questions/mock');
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        
        // Validate data structure
        if (!Array.isArray(data) || data.length === 0) {
          throw new Error('No questions available');
        }
        setQuestions(data);
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to load questions');
        setQuestions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleAnswer = (opt) => {
    if (opt === questions[current].correctAnswer) {
      setScore(score + 1);
    }
    setCurrent(current + 1);
  };

  if (loading) return <div style={{ padding: 20 }}><h2>Loading mock test...</h2></div>;
  if (error) return <div style={{ padding: 20, color: 'red' }}><h2>Error: {error}</h2></div>;
  if (questions.length === 0) return <div style={{ padding: 20 }}><h2>No questions available</h2></div>;

  if (current >= questions.length) {
    return (
      <div style={{ padding: 20, textAlign: 'center' }}>
        <h1>Test Complete!</h1>
        <h2>Your Score: {score} / {questions.length}</h2>
        <p>Percentage: {((score / questions.length) * 100).toFixed(2)}%</p>
        <button onClick={() => window.location.reload()}>Retake Test</button>
      </div>
    );
  }

  const currentQuestion = questions[current];
  return (
    <div style={{ padding: 20 }}>
      <h2>Mock Test</h2>
      <p style={{ color: '#666' }}>Question {current + 1} of {questions.length}</p>
      <p style={{ fontSize: 18, marginBottom: 20 }}><strong>{currentQuestion?.question}</strong></p>
      {currentQuestion?.options && Array.isArray(currentQuestion.options) ? (
        currentQuestion.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(opt)}
            style={{
              display: 'block',
              margin: 10,
              padding: 10,
              width: '100%',
              textAlign: 'left',
              cursor: 'pointer'
            }}
          >
            {opt}
          </button>
        ))
      ) : (
        <p style={{ color: 'red' }}>Error loading question options</p>
      )}
    </div>
  );
}
