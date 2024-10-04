import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
            <h1 className="text-3xl font-bold mb-4">Applicant Profile</h1>

            {user ? (
                <div className="bg-white shadow-md p-6 rounded-lg">
                    <div>
                        <img className="h-20 w-20" src={user.photoURL} alt="" />
                    </div>

                    <p><strong>Name:</strong> {user.displayName || 'N/A'}</p>
                    <p><strong>Email:</strong> {user.email || 'N/A'}</p>
                    <p><strong>Phone:</strong> {user.phoneNumber || 'N/A'}</p>
                    <p><strong>Address:</strong> {user.address || 'N/A'}</p>
                    <p><strong>Skills:</strong> {user.skills ? user.skills.join(', ') : 'N/A'}</p>
                    <p><strong>Experience:</strong> {user.experience || 'N/A'}</p>
                    <p><strong>Education:</strong> {user.education || 'N/A'}</p>
                    {/* Add other relevant fields as needed */}
                </div>
            ) : (
                <p>No profile information available.</p>
            )}
        </div>
    );
};

export default Profile;
