import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CoverLetterModal = ({ jobId, userEmail, onClose, posterEmail }) => {
  const [coverLetter, setCoverLetter] = useState('');
  const [cvUrl, setCvUrl] = useState('');

  // Fetch the user's CV/Resume by their email
  useEffect(() => {
    const fetchCvResume = async () => {
      try {
        const response = await fetch(`http://localhost:5000/user-cv?email=${userEmail}`);
        const data = await response.json();
        if (data.success && data.cvUrl) {
            
          setCvUrl(data.cvUrl);
        } else {
          console.error('Failed to fetch CV/resume.');
        }
      } catch (error) {
        console.error('Error fetching CV/resume:', error);
      }
    };

    fetchCvResume();
  }, [userEmail]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Ensure the CV/Resume has been fetched
    if (!cvUrl) {
      alert('CV/Resume not found. Please try again.');
      return;
    }
console.log(cvUrl)
    const applicationData = {
      jobId,
      coverLetter,
      applicantEmail: userEmail,
      posterEmail,
      cvUrl, // Include the CV/Resume URL in the application data
    };

    try {
      const response = await fetch('http://localhost:5000/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(applicationData),
      });

      const result = await response.json();
      if (result.success) {
        toast.success('Application submitted successfully!');
      } else {
        toast.error('Failed to submit application.');
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('There was an error, please try again.');
    }

    //onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-y-auto">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl max-h-screen overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Submit Cover Letter</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <textarea
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            placeholder="Write your cover letter here..."
            rows="6"
            required
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
          <div className="flex justify-end space-x-4">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition duration-300"
            >
              Close
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CoverLetterModal;
