import React, { useContext, useState } from 'react';
import { useLoaderData, useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import McqTest from './McqTest';
import ApplicationForm from './ApplicationForm';
import img from '../assets/image/briefcase.svg';
import img2 from '../assets/image/CalendarBlank.svg';
import img3 from '../assets/image/Timer.svg';
import img4 from '../assets/image/Wallet.svg';
import img5 from '../assets/image/MapPinLine.svg';
import img6 from '../assets/image/fi_link.svg';
import img7 from '../assets/image/Envelope.svg';
import img8 from '../assets/image/phone.svg';
import img9 from '../assets/image/fi_arrow-right.svg';
import { AuthContext } from '../provider/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Details = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTestPassed, setIsTestPassed] = useState(false);
  const [mcqQuestions, setMcqQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});

  const { user } = useContext(AuthContext);
  const jobs = useLoaderData();
  const { _id } = useParams();
  const job = jobs.find((job) => job._id === _id);

  const navigate = useNavigate(); // Initialize navigate hook

  const userEmail = user ? user.email : '';

  if (!job) {
    return <div>Job not found</div>;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
  };

  const fetchMcqQuestions = async () => {
    try {
      const response = await fetch(`http://localhost:5000/mcq-questions`);
      const data = await response.json();
      setMcqQuestions(data.questions);
    } catch (error) {
      console.error('Error fetching MCQ questions:', error);
    }
  };

  const handleApplyNow = () => {
    fetchMcqQuestions();
    setIsModalOpen(true);
  };

  const handleAnswerChange = (e, questionId) => {
    setUserAnswers({
      ...userAnswers,
      [questionId]: e.target.value,
    });
  };

  const handleTestSubmit = (e) => {
    e.preventDefault();
    let correctAnswers = 0;

    mcqQuestions.forEach((question) => {
      if (userAnswers[question._id] === question.correctAnswer) {
        correctAnswers += 1;
      }
    });

    const score = (correctAnswers / mcqQuestions.length) * 100;

    if (score >= 70) {
      setIsTestPassed(true);
      alert(`Congratulations! You scored ${score}%. You can now apply.`);
    } else {
      alert(`You scored ${score}%. You need at least 70% to apply.`);
      setIsModalOpen(false);
      setUserAnswers({});
      setIsTestPassed(false);
      navigate('/customerSupports'); // Redirect to customer support page
    }
  };

  const handleApplicationSubmit = (formData) => {
    fetch('http://localhost:5000/apply', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),

    })
      .then((response) => response.text()) // Parse the response as text
      .then((message) => {
        alert(message); // Show the message from the server
        setIsModalOpen(false);
        setIsTestPassed(false);
        setUserAnswers({});
        console.log('Form data:', formData);
      })
      .catch((error) => {
        console.error('Error submitting application:', error);
      });
  };
  // Function to handle adding job to favourites
  const handleAddToFavourite = async () => {
    const favouriteData = {
      jobId: job._id,
      email: userEmail,
    };

    try {
      const response = await fetch('http://localhost:5000/add-favourite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(favouriteData),
      });

      const result = await response.json();
      if (result.success) {
        toast.success('Job added to favourites successfully!');
      } else {
        toast.error('Failed to add job to favourites.');
      }
    } catch (error) {
      console.error('Error adding job to favourites:', error);
      toast.error('There was an error, please try again.');
    }
  };

  return (
    <div>
      <div className="bg-[#f1f2f4]  w-full">
        <div className='container mx-auto lg:px-12 px-5 py-5 justify-between items-center inline-flex'>
          <h3 className="text-[#18191c] text-lg font-medium ">Job Details</h3>
          <button className='btn ' onClick={handleAddToFavourite}>Add to Favourite</button>
        </div>
      </div>
      <div className="container mx-auto lg:px-12 px-5 py-5">
        <div className="flex items-center justify-between py-5">
          <div className="gap-3 flex items-center">
            <img className="w-16 h-16 p-5 bg-gray-400 rounded-[100px]" src={job.companyLogoUrl} alt={job.companyName} />
            <div>
              <div className="gap-1 flex items-center">
                <h2 className="text-[#18191c] text-2xl font-medium">{job.jobPostName}</h2>
                <p className="text-[#0065ff] text-sm bg-[#e8f1ff] rounded-[52px] px-3 py-1">{job.jobType}</p>
              </div>
              <div className="gap-1 flex items-center pt-3">
                <p className="flex items-center gap-1 text-[#474c54] text-base">
                  <img className="h-5 w-5" src={img6} alt="website" />
                  <a href={job.companyWebsite} target="_blank" rel="noopener noreferrer">
                    {job.companyWebsite}
                  </a>
                </p>
                <p className="flex items-center gap-1 text-[#474c54] text-base px-2">
                  <img className="h-5 w-5" src={img8} alt="phone" />
                  {job.phoneNumber}
                </p>
                <p className="flex items-center gap-1 text-[#474c54] text-base">
                  <img className="h-5 w-5" src={img7} alt="email" />
                  {job.emailAddress}
                </p>
              </div>
            </div>
          </div>
          <div className="text-end">
            <button
              className="btn text-white text-base font-semibold px-10 py-3 bg-[#0a65cc] rounded flex items-center gap-3"
              onClick={handleApplyNow}
            >
              Apply now <img src={img9} alt="arrow" />
            </button>
            <p className="text-[#767f8c] text-sm">Job expires on: {formatDate(job.vacancyExpireDate)}</p>
          </div>
        </div>

        {isModalOpen && (
          <div className="modal modal-open">
            <div className="modal-box w-11/12 max-w-5xl">
              {!isTestPassed ? (
                <McqTest
                  mcqQuestions={mcqQuestions}
                  handleAnswerChange={handleAnswerChange}
                  handleTestSubmit={handleTestSubmit}
                />
              ) : (
                <ApplicationForm
                  jobId={job._id}
                  posterEmail={job.posterEmail}
                  applicantEmail={userEmail}
                  handleApplicationSubmit={handleApplicationSubmit}
                />
              )}
              <div className="modal-action">
                <button className="btn" onClick={() => setIsModalOpen(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="flex items-start">
          <div className="w-3/5">
            <h5 className="text-black text-lg font-medium font-['Inter'] pb-4">Job Description</h5>
            <p className="text-[#5e6670] text-base font-normal font-['Inter']">{job.jobDescription}</p>

            <h5 className="text-black text-lg font-medium font-['Inter'] pt-4">Responsibilities</h5>
            <ul className="list-disc pl-5">
              {job.jobResponsibilities.map((responsibility, index) => (
                <li key={index} className="text-[#5e6670] text-base font-normal font-['Inter']">{responsibility}</li>
              ))}
            </ul>
          </div>
          <div className="w-2/5 p-8 bg-white rounded-lg border-2 border-[#e7f0fa] justify-start items-start">
            <h5 className="text-[#181f33] text-xl font-medium font-['Inter'] pb-5">Job Overview</h5>
            <div className="grid grid-cols-3 gap-6">
              <div className="text-start">
                <img className="h-9 w-9 pb-3" src={img2} alt="calendar" />
                <p className="text-[#767f8c] text-xs font-normal font-['Inter'] uppercase">Job Posted:</p>
                <h6 className="text-[#18191c] text-sm font-medium font-['Inter']">{formatDate(job.vacancyPostedDate)}</h6>
              </div>
              <div>
                <img className="h-9 w-9 pb-3" src={img3} alt="timer" />
                <p className="text-[#767f8c] text-xs font-normal font-['Inter'] uppercase">Job expires on:</p>
                <h6 className="text-[#18191c] text-sm font-medium font-['Inter']">{formatDate(job.vacancyExpireDate)}</h6>
              </div>
              <div>
                <img className="h-9 w-9 pb-3" src={img} alt="briefcase" />
                <p className="text-[#767f8c] text-xs font-normal font-['Inter'] uppercase">Education</p>
                <h6 className="text-[#18191c] text-sm font-medium font-['Inter']">{job.educationQualification}</h6>
              </div>
              <div>
                <img className="h-9 w-9 pb-3" src={img4} alt="wallet" />
                <p className="text-[#767f8c] text-xs font-normal font-['Inter'] uppercase">Salary:</p>
                <h6 className="text-[#18191c] text-sm font-medium font-['Inter']">BDT {job.salary}</h6>
              </div>
              <div>
                <img className="h-9 w-9 pb-3" src={img5} alt="location" />
                <p className="text-[#767f8c] text-xs font-normal font-['Inter'] uppercase">Location:</p>
                <h6 className="text-[#18191c] text-sm font-medium font-['Inter']">{job.location}</h6>
              </div>
              <div>
                <img className="h-9 w-9 pb-3" src={img} alt="briefcase" />
                <p className="text-[#767f8c] text-xs font-normal font-['Inter'] uppercase">Job Type:</p>
                <h6 className="text-[#18191c] text-sm font-medium font-['Inter']">{job.jobType}</h6>
              </div>
              <div>
                <img className="h-9 w-9 pb-3" src={img} alt="briefcase" />
                <p className="text-[#767f8c] text-xs font-normal font-['Inter'] uppercase">Experience:</p>
                <h6 className="text-[#18191c] text-sm font-medium font-['Inter']">{job.experience}</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Details;
