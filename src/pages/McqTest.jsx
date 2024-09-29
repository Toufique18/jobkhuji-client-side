import React from 'react';

const McqTest = ({ mcqQuestions, handleAnswerChange, handleTestSubmit }) => (
    <div>
        <h2 className="text-xl font-bold mb-4">MCQ Test</h2>
        <form onSubmit={handleTestSubmit}>
            {mcqQuestions.map((question, index) => (
                <div key={question._id} className="mb-4">
                    <p>{index + 1}. {question.questionText}</p>
                    {question.options.map((option, idx) => (
                        <label key={idx} className="block">
                            <input
                                type="radio"
                                name={`question-${question._id}`}
                                value={option}
                                onChange={(e) => handleAnswerChange(e, question._id)}
                                required
                            />
                            {option}
                        </label>
                    ))}
                </div>
            ))}
            <button type="submit" className="btn">Submit Test</button>
        </form>
    </div>
);


export default McqTest;