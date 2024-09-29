import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import moment from 'moment'; // For calculating days left
import { Link } from 'react-router-dom';

const JobCard = ({ application }) => {
    const { jobDetails, coverLetter, pdfUrl } = application;

    const daysLeft = moment(jobDetails.vacancyExpireDate).diff(moment(), 'days');

    // Determine job status based on expiration
    const jobStatus = daysLeft > 0 ? 'Active' : 'Expired';

    return (
        <div className="card w-11/12 bg-white shadow-lg flex flex-row p-4 items-center gap-4 mb-4">
            {/* Company Logo */}
            <div className="logo">
                <img
                    src={`https://logo-placeholder.com/company/${jobDetails.companyName}`} 
                    alt={jobDetails.companyName}
                    className="w-16 h-16 object-cover rounded-full"
                />
            </div>

           
            <div className="flex-1 pr-5">
                
                <div className="flex items-center gap-2">
                    <h3 className="text-xl font-semibold">{jobDetails.jobPostName}</h3>
                    <span className="text-sm text-gray-500">{jobDetails.jobType}</span>
                </div>
                
                
                <div className="flex items-center gap-2 text-sm mt-2">
                    <p><strong>Location:</strong> {jobDetails.location}</p>
                    <p><strong>Salary:</strong> ${jobDetails.salary}</p>
                </div>
            </div>

            
            <div className="flex items-center text-sm gap-4">
                <span className="text-gray-700">
                    {daysLeft > 0 ? `${daysLeft} days left` : 'Expired'}
                </span>
                <span className={`px-2 py-1 rounded-full text-white ${jobStatus === 'Active' ? 'bg-green-500' : 'bg-red-500'}`}>
                    {jobStatus}
                </span>
            </div>
            <Link to={`/details/${jobDetails._id}`}><button className='btn btn-primary'>Details</button></Link>
        </div>
    );
};

const MyApplication = () => {
    const [appliedJobs, setAppliedJobs] = useState([]);
    const { user } = useContext(AuthContext);
    const userEmail = user ? user.email : '';

    // Fetch applied jobs based on the user's email
    useEffect(() => {
        if (userEmail) {
            const fetchApplications = async () => {
                try {
                    const response = await fetch(`http://localhost:5000/api/applications/${userEmail}`);
                    const data = await response.json();
                    setAppliedJobs(data);
                } catch (error) {
                    console.error('Error fetching applied jobs:', error);
                }
            };

            fetchApplications();
        }
    }, [userEmail]);

    return (
        <div className='w-auto'>
            <h2>My Applications</h2>
            {appliedJobs.length === 0 ? (
                <p>No jobs applied for yet.</p>
            ) : (
                <div className="w-full">
                    {appliedJobs.map((application) => (
                        <JobCard key={application._id} application={application} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyApplication;
