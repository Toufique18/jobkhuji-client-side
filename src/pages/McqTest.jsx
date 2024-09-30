import React from 'react';

const McqTest = ({ mcqQuestions, handleAnswerChange, handleTestSubmit }) => {
  return (
    <form onSubmit={handleTestSubmit}>
      <h2 className="text-lg font-bold mb-4">MCQ Test</h2>
      {mcqQuestions.map((question) => (
        <div key={question._id} className="mb-4">
          <p className="font-medium">{question.questionText}</p>
          {question.options.map((option) => (
            <div key={option} className="flex items-center mb-2">
              <input
                type="radio"
                id={option}
                name={question._id}
                value={option}
                onChange={(e) => handleAnswerChange(e, question._id)}
                className="mr-2"
              />
              <label htmlFor={option} className="text-base">{option}</label>
            </div>
          ))}
        </div>
      ))}
      <button type="submit" className="btn bg-blue-500 text-white">
        Submit Test
      </button>
    </form>
  );
};

export default McqTest;
