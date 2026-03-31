// Updated practice.js with loading state, error handling, and data validationimport { useEffect, useState } from 'react';

export default function Practice() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const res = await fetch('http://localhost:5000/api/questions');
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        
        // Validate data structure
        if (!Array.isArray(data)) throw new Error('Invalid data format');
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

  if (loading) return <div><h2>Loading questions...</h2></div>;
  if (error) return <div style={{ color: 'red' }}><h2>Error: {error}</h2></div>;
  if (questions.length === 0) return <div><h2>No questions available</h2></div>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Practice</h1>
      {questions.map((q, i) => (
        <div key={i} style={{ marginBottom: 20, border: '1px solid #ccc', padding: 10 }}>
          <p><strong>{q.question}</strong></p>
          {q.options && Array.isArray(q.options) ? (
            q.options.map((opt, idx) => (
              <button key={idx} style={{ display: 'block', margin: 5 }}>
                {opt}
              </button>
            ))
          ) : (
            <p style={{ color: 'red' }}>Invalid question format</p>
          )}
        </div>
      ))}
    </div>
  );
}e;
