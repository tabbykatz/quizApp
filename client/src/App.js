import * as React from "react";

export default function App() {
  const reducer = (action, payload) => {
    return {
      ...quizState,
      [action]: payload,
    };
  };
  const initialState = {
    currentQuestion: 0,
    score: 0,
    endGame: false,
    questions: [],
  };

  const [quizState, updateQuizState] = React.useReducer(reducer, initialState);

  const getQuestions = () => {
    fetch("/api/questions")
      .then((res) => res.json())
      .then((res) => {
        updateQuizState("questions", res);
        // console.log(quizState.questions);
      });
  };

  const handleAnswerOptionClick = (choice) => {
    if (choice === quizState.questions[quizState.currentQuestion].correct) {
      updateQuizState("score", score + 1);
      // console.log(quizState.score);
    }

    const nextQuestion = quizState.currentQuestion + 1;
    if (nextQuestion < quizState.questions.length) {
      updateQuizState("currentQuestion", nextQuestion);
    } else {
      updateQuizState("endGame", true);
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
