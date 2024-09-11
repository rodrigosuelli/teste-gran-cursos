import { useRef, useState } from 'react';
import './App.css';

function App() {
  const style = {
    container: {
      padding: '20px',
      border: '1px solid #E0E0E0',
      borderRadius: '15px',
      width: 'max-content',
      marginBottom: '40px',
    },
    question: {
      fontWeight: 'bold',
      marginBottom: '10px',
    },
    options: {
      marginBottom: '5px',
    },
    button: {
      marginTop: '10px',
      padding: '10px 15px',
      border: 'none',
      backgroundColor: '#007BFF',
      color: '#FFF',
      fontSize: '14px',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    feedback: {
      marginTop: '10px',
      fontSize: '14px',
    },
  };

  // do not modify the questions or answers below
  const questions = [
    {
      question: 'What is the capital of France?',
      options: ['London', 'Paris', 'Berlin', 'Madrid'],
      correct: 'Paris',
    },
    {
      question: 'What is the capital of Germany?',
      options: ['Berlin', 'Munich', 'Frankfurt', 'Hamburg'],
      correct: 'Berlin',
    },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [submittedAnswersResult, setSubmittedAnswersResult] = useState({
    correctAmount: 0,
    incorrectAmount: 0,
  });
  const [feedbackText, setFeedbackText] = useState(null);
  const [isFinished, setIsFinished] = useState(false);

  const formRef = useRef(null);

  function handleSubmitAnswer(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    const { selectedOption } = formJson;

    console.log(selectedOption);

    if (selectedOption === questions[currentQuestionIndex].correct) {
      setFeedbackText('Correct');
      setSubmittedAnswersResult({
        correctAmount: submittedAnswersResult.correctAmount + 1,
        incorrectAmount: submittedAnswersResult.incorrectAmount,
      });
    } else {
      setFeedbackText('Incorrect');
      setSubmittedAnswersResult({
        correctAmount: submittedAnswersResult.correctAmount,
        incorrectAmount: submittedAnswersResult.incorrectAmount + 1,
      });
    }

    // Reset selected radio inputs
    formRef.current.reset();

    // Currently in last question
    if (currentQuestionIndex === questions.length - 1) {
      setIsFinished(true);
      return;
    }

    setCurrentQuestionIndex(currentQuestionIndex + 1);
  }

  return (
    <div style={style.container}>
      {!isFinished && (
        <form ref={formRef} onSubmit={handleSubmitAnswer}>
          <div id='question' style={style.question}>
            {questions[currentQuestionIndex].question}
          </div>

          <div style={style.options}>
            {questions[currentQuestionIndex].options.map(
              (option, optionIndex) => (
                <div key={optionIndex}>
                  <input
                    required
                    type='radio'
                    value={option}
                    name='selectedOption'
                    id={optionIndex + 1} // starts at 1
                  />
                  <label htmlFor={optionIndex + 1}>{option}</label>
                </div>
              )
            )}
          </div>

          <button type='submit' style={style.button} id='submitBtn'>
            Submit
          </button>
        </form>
      )}

      <div id='feedback' style={style.feedback}>
        {isFinished
          ? `Quiz Complete! You scored ${submittedAnswersResult.correctAmount} out of ${questions.length}!`
          : feedbackText ?? feedbackText}
      </div>
    </div>
  );
}

export default App;
