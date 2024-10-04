import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserProfile = () => {
    const { user } = useContext(AuthContext); 
    const email = user ? user.email : ''; 

    // Define state for each field
    const [nationality, setNationality] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('male');
    const [maritalStatus, setMaritalStatus] = useState('not married');
    const [education, setEducation] = useState('');
    const [jobExperience, setJobExperience] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [biography, setBiography] = useState('');
    const [category, setCategory] = useState('');
    const [currentjob, setCurrentjob] = useState('');

    // Fetch user data on component mount
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/getUserProfile?email=${email}`);
                const data = await response.json();
                if (response.ok) {
                    // Set the state with the fetched user data
                    setNationality(data.nationality || '');
                    setDob(data.dob || '');
                    setGender(data.gender || 'male');
                    setMaritalStatus(data.maritalStatus || 'not married');
                    setEducation(data.education || '');
                    setJobExperience(data.jobExperience || '');
                    setPhoneNumber(data.phoneNumber || '');
                    setBiography(data.biography || '');
                    setCategory(data.category || '');
                    setCurrentjob(data.currentjob || '');
                }
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        if (email) {
            fetchUserProfile(); // Fetch user profile if the user is logged in
        }
    }, [email]);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedData = {
            email,
            nationality,
            dob,
            gender,
            maritalStatus,
            education,
            jobExperience,
            phoneNumber,
            biography,
            category,
            currentjob,
        };

        try {
            const response = await fetch('http://localhost:5000/api/updateUserProfile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });

            if (response.ok) {
                toast.success('Profile updated successfully');
            } else {
                toast.error('Failed to update profile');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error('An error occurred while updating your profile');
        }
    };

    return (
        <div className="p-6 w-full">
            <h1 className="text-2xl font-bold mb-4">Update Your Profile</h1>
            <form onSubmit={handleSubmit} className="">
                <div className='grid grid-cols-2 gap-3'>
                    <div>
                        <label className="block">Nationality:</label>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            value={nationality}
                            onChange={(e) => setNationality(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block">Date of Birth:</label>
                        <input
                            type="date"
                            className="input input-bordered w-full"
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block">Gender:</label>
                        <select
                            className="select select-bordered w-full"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div>
                        <label className="block">Marital Status:</label>
                        <select
                            className="select select-bordered w-full"
                            value={maritalStatus}
                            onChange={(e) => setMaritalStatus(e.target.value)}
                        >
                            <option value="not married">Single</option>
                            <option value="married">Married</option>
                        </select>
                    </div>

                    <div>
                        <label className="block">Education:</label>
                        <select
                            className="select select-bordered w-full"
                            value={education}
                            onChange={(e) => setEducation(e.target.value)}
                        >
                            <option value="">Select</option>
                            <option value="BSc in CSE">BSc in CSE</option>
                            <option value="BSc in EEE">BSc in EEE</option>
                            <option value="BBA">BBA</option>
                            <option value="MBA">MBA</option>
                            <option value="MSc">MSc</option>
                            {/* Add more options as needed */}
                        </select>
                    </div>

                    <div>
                        <label className="block">Overall Job Experience:</label>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            value={jobExperience}
                            onChange={(e) => setJobExperience(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block">Phone Number:</label>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block">Job Title:</label>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            value={currentjob}
                            onChange={(e) => setCurrentjob(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block">Favourites Job Category:</label>
                        <select
                            className="select select-bordered w-full"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="Software Development">Software Development</option>
                            <option value="Marketing and Sales">Marketing and Sales</option>
                            <option value="Data Science and Analytics">Data Science and Analytics</option>
                            <option value="Design and Creative">Design and Creative</option>
                            <option value="Customer Support">Customer Support</option>
                            <option value="Human Resources">Human Resources</option>
                            <option value="Finance and Accounting">Finance and Accounting</option>
                            <option value="Operations and Management">Operations and Management</option>
                            {/* Add more options as needed */}
                           
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block">Biography:</label>
                    <textarea
                        className="textarea textarea-bordered w-full h-24"
                        value={biography}
                        onChange={(e) => setBiography(e.target.value)}
                    ></textarea>
                </div>

                <button type="submit" className="btn btn-primary w-full">
                    Update Profile
                </button>
            </form>
          
            <ToastContainer />
        </div>
    );
};

export default UserProfile;
