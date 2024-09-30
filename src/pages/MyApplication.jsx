import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import moment from 'moment-timezone'; // For calculating days left
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const JobCard = ({ application, handleDelete }) => {
    const { jobDetails, _id } = application;

    // Convert both the current time and the vacancy expiry date to Bangladesh time
    const expiryDateInBST = moment.tz(jobDetails.vacancyExpireDate, "Asia/Dhaka").startOf('day'); // Ignore time, just compare dates
    const currentDateInBST = moment.tz("Asia/Dhaka").startOf('day'); // Current date in BST

    const daysLeft = expiryDateInBST.diff(currentDateInBST, 'days');
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
            <div className="flex gap-2">
                <Link to={`/details/${jobDetails._id}`}>
                    <button className='btn btn-primary'>Details</button>
                </Link>
                <button onClick={() => handleDelete(_id)} className='btn'>Delete</button>
                
            </div>
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

                    // Ensure the response data is an array
                    if (Array.isArray(data)) {
                        setAppliedJobs(data);
                    } else {
                        setAppliedJobs([]); // If not an array, set to an empty array
                    }
                } catch (error) {
                    console.error('Error fetching applied jobs:', error);
                    setAppliedJobs([]); // Handle the error by setting to an empty array
                }
            };

            fetchApplications();
        }
    }, [userEmail]);

    const handleDelete = (_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/api/applicationsDEL/${_id}`, {
                    method: 'DELETE',
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your application has been deleted.",
                                icon: "success",
                            });
                            // Remove the deleted application from the state
                            setAppliedJobs((prevJobs) =>
                                prevJobs.filter((app) => app._id !== _id)
                            );
                        }
                    })
                    .catch((error) =>
                        console.error('Error deleting application:', error)
                    );
            }
        });
    };

    return (
        <div className='w-auto'>
            <h2>My Applications</h2>
            {appliedJobs.length === 0 ? (
                <p>No jobs applied for yet.</p>
            ) : (
                <div className="w-full">
                    {appliedJobs.map((application) => (
                        <JobCard key={application._id} application={application} handleDelete={handleDelete} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyApplication;



