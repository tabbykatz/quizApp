import * as React from "react";
import AllQuestions from "./components/AllQuestions";
import "./App.css";

const reducer = (currentState, action) => {
  return {
    ...currentState,
    ...action,
  };
};

const initialState = {
  currentQuestion: 0,
  score: 0,
  questions: [],
};

export default function App() {
  const [quizState, updateQuizState] = React.useReducer(reducer, initialState);
  const endGame = quizState.currentQuestion === quizState.questions.length - 1;

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
      updateQuizState({ currentQuestion: nextQuestion });
    }
  };

  return (
    <div className="all">
      {endGame ? (
        <>
          <div className="score">
            You scored {quizState.score} out of {quizState.questions.length}
          </div>
          <AllQuestions
            questions={quizState.questions}
            getQuestions={getQuestions}
          />
        </>
      ) : !Object.entries(quizState.questions).length ? (
        <div className="app">
          <button className="start" onClick={() => getQuestions()}>
            Start the Quiz
          </button>
        </div>
      ) : (
        <>
          <div className="app">
            <div className="question">
              <div className="question-number">
                <span>{quizState.currentQuestion + 1}</span>/
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
          </div>
        </>
      )}
    </div>
  );
}
