import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import img from "../assets/image/Cake.png"
import img1 from "../assets/image/MapTrifold.png"
import img2 from "../assets/image/ClipboardText.png"
import img3 from "../assets/image/UserCircle.png"
import img4 from "../assets/image/Stack.png"
import img5 from "../assets/image/GraduationCap.png"

const Profile = () => {
    const { userId } = useParams(); // Get userId from URL params
    const [user, setUser] = useState(null); // State for storing user data
    const [loading, setLoading] = useState(true); // State for loading status
    const [error, setError] = useState(null); // State for error handling

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/userProfile/${userId}`); // Replace with the correct API URL
                const data = await response.json();
                if (response.ok) {
                    setUser(data); // Set user data
                } else {
                    throw new Error(data.message || "Failed to fetch user profile.");
                }
            } catch (error) {
                setError(error.message); // Set error message
            } finally {
                setLoading(false); // Stop loading
            }
        };

        fetchUser(); // Call function to fetch user data
    }, [userId]);

    // Handle loading state
    if (loading) {
        return <p>Loading profile...</p>;
    }

    // Handle error state
    if (error) {
        return <p>Error: {error}</p>;
    }

    // Render user profile when data is available
    return (
        <div className="container mx-auto p-4">
            {/* <h1 className="text-3xl font-bold mb-4">Applicant Profile</h1> */}

            {user ? (
                <div className="bg-white shadow-md p-6 rounded-lg">
                    <div className="flex items-center gap-8 mb-6">
                        <img className="h-20 w-20 rounded-full" src={user.photoURL} alt="" />
                        <div>
                            <p><strong className="text-2xl leading-4"> {user.displayName || 'N/A'}</strong></p>
                            <p className="text-base"> {user.currentjob || 'N/A'}</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-2">
                        <div className="w-8/12">
                            <p><strong>BIOGRAPHY</strong></p>
                            <p>{user.biography}</p>

                        </div>
                        <div className="grid grid-cols-2 gap-6 border border-sky-200 rounded-lg p-4">
                            <div className="text-start">
                                <img className="h-9 w-9 pb-3" src={img} alt="calendar" />
                                <p className="text-[#767f8c] text-xs font-normal  uppercase">DATE OF BIRTH</p>
                                <h6 className="text-[#18191c] text-sm font-medium "><strong>{user.dob}</strong></h6>
                            </div>
                            <div>
                                <img className="h-9 w-9 pb-3" src={img1} alt="timer" />
                                <p className="text-[#767f8c] text-xs font-normal uppercase">Notionality</p>
                                <h6 className="text-[#18191c] text-sm font-medium"><strong>{user.
                                    nationality
                                }</strong></h6>
                            </div>
                            <div>
                                <img className="h-9 w-9 pb-3" src={img2} />
                                <p className="text-[#767f8c] text-xs font-normal uppercase">marital Status</p>
                                <h6 className="text-[#18191c] text-sm font-medium "><strong>{user.maritalStatus}</strong></h6>
                            </div>
                            <div>
                                <img className="h-9 w-9 pb-3" src={img3} />
                                <p className="text-[#767f8c] text-xs font-normal uppercase">Gender</p>
                                <h6 className="text-[#18191c] text-sm font-medium"><strong>{user.gender}</strong></h6>
                            </div>
                            <div>
                                <img className="h-9 w-9 pb-3" src={img4} alt="location" />
                                <p className="text-[#767f8c] text-xs font-normal uppercase">Experience</p>
                                <h6 className="text-[#18191c] text-sm font-medium "><strong>{user.
                                    jobExperience
                                }</strong></h6>
                            </div>
                            <div>
                                <img className="h-9 w-9 pb-3" src={img5} alt="experience" />
                                <p className="text-[#767f8c] text-xs font-normal uppercase">Educations</p>
                                <h6 className="text-[#18191c] text-sm font-medium"><strong>{user.education}</strong></h6>
                            </div>

                        </div>

                    </div>
                </div>
            ) : (
                <p>No profile information available.</p>
            )}
        </div>
    );
};

export default Profile;
