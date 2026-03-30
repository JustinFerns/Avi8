import { useEffect, useState } from 'react';

export default function MockTest() {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetch('http://localhost:5000/api/questions/mock')
      .then(res => res.json())
      .then(data => setQuestions(data));
  }, []);

  const handleAnswer = (opt) => {
    if (opt === questions[current].correctAnswer) {
      setScore(score + 1);
    }
    setCurrent(current + 1);
  };

  if (current >= questions.length) {
    return <h1>Score: {score}</h1>;
  }

  return (
    <div>
      <h2>Mock Test</h2>
      <p>{questions[current]?.question}</p>
      {questions[current]?.options.map((opt, i) => (
        <button key={i} onClick={() => handleAnswer(opt)}>
          {opt}
        </button>
      ))}
    </div>
  );
}
