import * as React from "react";

const reducer = (currentState, action) => {
  return {
    ...currentState,
    ...action,
  };
};

const initialState = {
  currentQuestion: 0,
  score: 0,
  endGame: false,
  questions: [],
};

export default function App() {
  const [quizState, updateQuizState] = React.useReducer(reducer, initialState);

  const getQuestions = () => {
    fetch("/api/questions")
      .then((res) => res.json())
      .then((res) => {
        updateQuizState({ questions: res });
      });
  };

  const handleAnswerOptionClick = (choice) => {
    if (choice === quizState.questions[quizState.currentQuestion].correct) {
      updateQuizState({ score: quizState.score + 1 });
    }

    const nextQuestion = quizState.currentQuestion + 1;
    if (nextQuestion < quizState.questions.length) {
      updateQuizState({currentQuestion: nextQuestion});
    } else {
      updateQuizState({endGame: true});
    }
  };

  return (
    <div className="app">
      {quizState.endGame ? (
        <div className="score">
          You scored {quizState.score} out of {quizState.questions.length}
        </div>
      ) : !Object.entries(quizState.questions).length ? (
        <button className="start" onClick={() => getQuestions()}>
          Start the Quiz
        </button>
      ) : (
        <>
          {" "}
          <div className="question">
            <div className="question-number">
              <span>Question {quizState.currentQuestion + 1}</span>/
              {quizState.questions.length}
            </div>
            <div className="question-text">
              {quizState.questions[quizState.currentQuestion].title}
            </div>
          </div>
          <div className="answer">
            {quizState.questions[quizState.currentQuestion].choices.map(
              (choice) => (
                <button
                  key={choice}
                  onClick={() => handleAnswerOptionClick(choice)}
                >
                  {choice}
                </button>
              )
            )}
          </div>
        </>
      )}
    </div>
  );
}
