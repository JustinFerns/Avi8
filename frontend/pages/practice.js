import { useEffect, useState } from 'react';

export default function Practice() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/questions')
      .then(res => res.json())
      .then(data => setQuestions(data));
  }, []);

  return (
    <div>
      <h1>Practice</h1>
      {questions.map((q, i) => (
        <div key={i}>
          <p>{q.question}</p>
          {q.options.map((opt, idx) => (
            <button key={idx}>{opt}</button>
          ))}
        </div>
      ))}
    </div>
  );
}
