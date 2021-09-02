function AllQuestions(props) {
  return (
    <div className="app">
      {props.questions.map((question) => {
        return (
          <>
            {question.id}. {question.title}
            <ul>
              <li className="correct">Answer: {question.correct}</li>
              <li>{question.details}</li>
            </ul>
          </>
        );
      })}
    </div>
  );
}

export default AllQuestions;
