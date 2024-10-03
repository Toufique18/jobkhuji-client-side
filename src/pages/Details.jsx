import React, { useContext, useState } from 'react';
import { useLoaderData, useParams, useNavigate } from 'react-router-dom';
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

import CoverLetterModal from './CoverLetterModal'; // Import the Cover Letter Modal component
import MCQModal from './MCQModal';

const Details = () => {
  const { user } = useContext(AuthContext);
  const jobs = useLoaderData();
  const { _id } = useParams();
  const job = jobs.find((job) => job._id === _id);

  const navigate = useNavigate();
  const userEmail = user ? user.email : '';
  
  const [showMCQModal, setShowMCQModal] = useState(false);
  const [showCoverLetterModal, setShowCoverLetterModal] = useState(false);
  const [mcqScore, setMcqScore] = useState(0); // To store the user's score

  if (!job) {
    return <div>Job not found</div>;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
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

  // Function to handle Apply Now button click
  const handleApplyNow = () => {
    setShowMCQModal(true);
  };

  // Function to handle score from the MCQ Modal
  const handleMcqScore = (score) => {
    setMcqScore(score);
    if (score >= 70) {
      setShowMCQModal(false);
      setShowCoverLetterModal(true);
    } else {
      navigate('/customer-support'); // Redirect to customer support page
    }
  };

  return (
    <div>
      <div className="bg-[#f1f2f4] w-full">
        <div className='container mx-auto lg:px-12 px-5 py-5 justify-between items-center inline-flex'>
          <h3 className="text-[#18191c] text-lg font-medium">Job Details</h3>
          <button className='btn' onClick={handleAddToFavourite}>Add to Favourite</button>
        </div>
      </div>
      <div className="container mx-auto lg:px-12 px-5 py-5">
        <div className="flex items-center justify-between py-5">
          <div className="gap-3 flex items-center">
            <img className="w-16 h-16 bg-gray-400 rounded-[5px]" src={job.companyLogo} alt={job.companyName} />
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
              onClick={handleApplyNow} // Trigger the MCQ Modal on click
            >
              Apply now <img src={img9} alt="arrow" />
            </button>
            <p className="text-[#767f8c] text-sm">Job expires on: {formatDate(job.vacancyExpireDate)}</p>
          </div>
        </div>
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
                <h6 className="text-[#18191c] text-sm font-medium font-['Inter']">{job.salary}BDT</h6>
              </div>
              <div>
                <img className="h-9 w-9 pb-3" src={img5} alt="location" />
                <p className="text-[#767f8c] text-xs font-normal font-['Inter'] uppercase">Location:</p>
                <h6 className="text-[#18191c] text-sm font-medium font-['Inter']">{job.location}</h6>
              </div>
              <div>
                <img className="h-9 w-9 pb-3" src={img8} alt="experience" />
                <p className="text-[#767f8c] text-xs font-normal font-['Inter'] uppercase">Experience:</p>
                <h6 className="text-[#18191c] text-sm font-medium font-['Inter']">{job.experience}</h6>
              </div>
              <div>
                <img className="h-9 w-9 pb-3" src={img6} alt="vacancy" />
                <p className="text-[#767f8c] text-xs font-normal font-['Inter'] uppercase">Vacancies:</p>
                <h6 className="text-[#18191c] text-sm font-medium font-['Inter']">{job.vacancyCount}</h6>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MCQ Modal */}
      {showMCQModal && (
        <MCQModal 
        onClose={() => setShowMCQModal(false)} 
        onScore={handleMcqScore} 
        category={job.categoryName}
        jobId={job._id} 
      />
      )}

      {/* Cover Letter Modal */}
      {showCoverLetterModal && (
        <CoverLetterModal 
          jobId={job._id}
          userEmail={userEmail}
          posterEmail={job.posterEmail}
          onClose={() => setShowCoverLetterModal(false)} 
        />
      )}

      <ToastContainer />
    </div>
  );
};

export default Details;
