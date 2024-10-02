import React, { useEffect, useState } from 'react';
import CoverLetterModal from './CoverLetterModal';

const MCQModal = ({ onClose, onScore, onCoverLetterOpen, category,jobId }) => {
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [loading, setLoading] = useState(true); // State for loading

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`http://localhost:5000/mcq-questions/${category}`);
        const data = await response.json();
        if (Array.isArray(data) && data[0]?.questions) {
          setQuestions(data[0].questions);
        } else {
          setQuestions([]);
        }
      } catch (error) {
        console.error('Error fetching MCQ questions:', error);
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      fetchQuestions();
    }
  }, [category]);

  const handleChange = (questionIndex, answer) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: answer,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let correctAnswers = 0;

    // Assuming each question has an 'answer' property for the correct answer
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.answer) {
        correctAnswers += 1;
      }
    });

    const calculatedScore = (correctAnswers / questions.length) * 100;
    onScore(calculatedScore); // Send the score back to the parent

    // Show alert based on the score
    if (calculatedScore < 70) {
      alert(`Your Score: ${calculatedScore}%. You didn't pass the test.`);
      window.location.href = `/customerSupports?category=${category}&jobId=${jobId}`; // Redirect to customer support page
    } else {
      alert(`Congratulations! Your Score: ${calculatedScore}%`);
      CoverLetterModal(); // Open the cover letter modal
    }
  };

  // Render loading state if questions are still being fetched
  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-bold">Loading questions...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-y-auto">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl max-h-screen overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">MCQ Test</h2>
        {questions.length > 0 ? (
          <form onSubmit={handleSubmit}>
            {questions.map((q, index) => (
              <div key={index} className="mb-4">
                <p className="font-medium">{q.question}</p>
                {q.options.map((option, idx) => (
                  <label key={idx} className="block mt-2">
                    <input
                      type="radio"
                      name={`question${index}`}
                      value={option}
                      onChange={() => handleChange(index, option)}
                      className="mr-2"
                    />
                    {option}
                  </label>
                ))}
              </div>
            ))}
            <button
              type="submit"
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded"
            >
              Submit
            </button>
          </form>
        ) : (
          <p>No questions available</p>
        )}
      </div>
    </div>
  );
};

export default MCQModal;
