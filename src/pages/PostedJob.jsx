import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider'; // Assuming you have an AuthContext
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const PostedJob = () => {
    const [postedJobs, setPostedJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext); // Get the logged-in user's email
    const userEmail = user ? user.email : '';
    // Function to calculate the remaining days before the job expires
    const calculateRemainingDays = (expireDate) => {
        const currentDate = new Date();
        const jobExpireDate = new Date(expireDate);
        const remainingTime = jobExpireDate - currentDate;
        const remainingDays = Math.ceil(remainingTime / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
        return remainingDays > 0 ? `${remainingDays} days left` : 'Expired';
    };

    useEffect(() => {
        if (userEmail) {
            const fetchPostedJobs = async () => {
                try {
                    const response = await fetch(`http://localhost:5000/api/posted-jobs/${userEmail}`);
                    const data = await response.json();
                    setPostedJobs(data);
                } catch (error) {
                    console.error('Error fetching posted jobs:', error);
                } finally {
                    setLoading(false);
                }
            };

            fetchPostedJobs();
        }
    }, [userEmail]);

    if (loading) {
        return <p>Loading your posted jobs...</p>;
    }

    const handleDelete = (jobId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/api/posted-jobsDelete/${jobId}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.message === 'Job deleted successfully.') {
                            Swal.fire('Deleted!', 'Your job has been deleted.', 'success');
                            setPostedJobs(prevJobs => prevJobs.filter(job => job._id !== jobId));
                        } else {
                            Swal.fire('Error!', 'Failed to delete the job.', 'error');
                        }
                    })
                    .catch(error => {
                        console.error('Error deleting job:', error);
                        Swal.fire('Error!', 'Something went wrong.', 'error');
                    });
            }
        });
    };

    return (
        <div className='w-auto'>
            <h2 className='text-2xl font-bold mb-4'>My Posted Jobs</h2>
            {postedJobs.length === 0 ? (
                <p>You haven't posted any jobs yet.</p>
            ) : (
                <div className="w-full">
                    {postedJobs.map((job) => (
                        <div key={job._id} className="bg-white shadow-md p-4 mb-4">
                            <div className='flex justify-between'>
                                <div>
                                    <h3 className="text-xl font-semibold">{job.jobPostName}</h3>
                                    <p><strong>Location:</strong> {job.location}</p>
                                    <p><strong>Salary:</strong> {job.salary} BDT</p>
                                    <p><strong>{calculateRemainingDays(job.vacancyExpireDate)}</strong></p>
                                    <Link to={`/details/${job._id}`} className="text-blue-500 underline">
                                        View Details
                                    </Link>
                                </div>
                                <div className='grid grid-cols-1 gap-2 '>
                                    <button onClick={() => handleDelete(job._id)} className='btn btn-warning'>Delete</button>
                                    <Link to={`/dashboard/update-job/${job._id}`} className="btn btn-accent">
                                        Update
                                    </Link>
                                    {/* <Link to={`/dashboard/applicationsinfo/${job._id}`} className="btn btn-info">
                                        Applications
                                    </Link> */}
                                    <Link to={`/dashboard/applicationsinfo/${job._id}?jobPostName=${encodeURIComponent(job.jobPostName)}`} className="btn btn-info">
                                        Applications
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PostedJob;
