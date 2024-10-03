import  { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../provider/AuthProvider';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const FavouriteJob = () => {
  const { user } = useContext(AuthContext); // Get the current logged-in user
  const [favouriteJobs, setFavouriteJobs] = useState([]);

  // Function to calculate the remaining days before the job expires
  const calculateRemainingDays = (expireDate) => {
    const currentDate = new Date();
    const jobExpireDate = new Date(expireDate);
    const remainingTime = jobExpireDate - currentDate;
    const remainingDays = Math.ceil(remainingTime / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
    return remainingDays > 0 ? `${remainingDays} days left` : 'Expired';
  };

  useEffect(() => {
    // Fetch the favorite jobs for the logged-in user by their email
    const fetchFavouriteJobs = async () => {
      try {
        const response = await fetch(`http://localhost:5000/favourites?email=${user.email}`);
        const data = await response.json();
        if (response.ok) {
          setFavouriteJobs(data.favouriteJobs); // Assuming API response has `favouriteJobs` array
        } else {
          toast.error('Failed to load favourite jobs');
        }
      } catch (error) {
        console.error('Error fetching favourite jobs:', error);
        toast.error('Error loading favourite jobs');
      }
    };

    if (user && user.email) {
      fetchFavouriteJobs();
    }
  }, [user]);
  const handleDelete = _id => {
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
            fetch(`http://localhost:5000/api/favjobdel/${_id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your favourite job has been deleted.",
                            icon: "success"
                        });
                        // Remove the deleted contest from the state
                        setFavouriteJobs((prevJobs) => prevJobs.filter(app => app._id !== _id));
                    }
                })
                .catch(error => console.error('Error deleting contest:', error));
        }
    });
};

  return (
    <div className="container mx-auto lg:px-12 px-5 py-5">
      <h3 className="text-lg font-medium">Your Favourite Jobs</h3>
      {favouriteJobs.length === 0 ? (
        <p>No favourite jobs found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favouriteJobs.map((favouriteJob) => (
            favouriteJob.jobDetails && ( // Only render if job details are available
              <div key={favouriteJob._id} className="p-6 bg-white shadow-md rounded-md">
                <h4 className="text-xl font-semibold">{favouriteJob.jobDetails.jobPostName}</h4>
                <p className="text-sm text-gray-500">{favouriteJob.jobDetails.jobType}</p>
                <p className="text-base font-medium">Salary: BDT {favouriteJob.jobDetails.salary}</p>
                <p className="text-sm text-gray-500">
                  {calculateRemainingDays(favouriteJob.jobDetails.vacancyExpireDate)}
                </p>
                <div className='flex justify-between'>
                    <Link to={`/details/${favouriteJob.jobDetails._id}`}><button className='btn btn-primary'>Details</button></Link>
                    <button onClick={() => handleDelete(favouriteJob._id)} className='btn btn-warning'>Delete</button>
                </div>
              </div>
            )
          ))}
        </div>
      )}
    </div>
  );
};

export default FavouriteJob;
