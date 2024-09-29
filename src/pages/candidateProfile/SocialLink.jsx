import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SocialLink = () => {
    const { user } = useContext(AuthContext); // Assuming user is fetched from AuthContext
    const email = user ? user.email : ''; // Assuming the user's email is available

    // Define state for each social link field
    const [facebook, setFacebook] = useState('');
    const [twitter, setTwitter] = useState('');
    const [instagram, setInstagram] = useState('');
    const [website, setWebsite] = useState('');
    const [github, setGithub] = useState('');

    // Fetch user social links on component mount
    useEffect(() => {
        const fetchSocialLinks = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/getSocialLinks?email=${email}`);
                const data = await response.json();
                if (response.ok) {
                    // Set the state with the fetched user data
                    setFacebook(data.facebook || '');
                    setTwitter(data.twitter || '');
                    setInstagram(data.instagram || '');
                    setWebsite(data.website || '');
                    setGithub(data.github || '');
                }
            } catch (error) {
                console.error('Error fetching social links:', error);
            }
        };

        if (email) {
            fetchSocialLinks(); // Fetch social links if the user is logged in
        }
    }, [email]);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedSocialLinks = {
            email,
            facebook,
            twitter,
            instagram,
            website,
            github,
        };

        try {
            const response = await fetch('http://localhost:5000/api/updateSocialLinks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedSocialLinks),
            });

            if (response.ok) {
                toast.success('Social links updated successfully');
            } else {
                toast.error('Failed to update social links');
            }
        } catch (error) {
            console.error('Error updating social links:', error);
            toast.error('An error occurred while updating your social links');
        }
    };

    return (
        <div className="p-6 w-full">
            <h1 className="text-2xl font-bold mb-4">Update Your Social Links</h1>
            <form onSubmit={handleSubmit} className="">
                <div className='grid grid-cols-2 gap-3'>
                    <div>
                        <label className="block">Facebook:</label>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            value={facebook}
                            onChange={(e) => setFacebook(e.target.value)}
                            placeholder="Facebook URL"
                        />
                    </div>

                    <div>
                        <label className="block">Twitter (if you have):</label>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            value={twitter}
                            onChange={(e) => setTwitter(e.target.value)}
                            placeholder="Twitter URL"
                        />
                    </div>

                    <div>
                        <label className="block">Instagram (if you have):</label>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            value={instagram}
                            onChange={(e) => setInstagram(e.target.value)}
                            placeholder="Instagram URL"
                        />
                    </div>

                    <div>
                        <label className="block">Personal Website (if you have):</label>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            value={website}
                            onChange={(e) => setWebsite(e.target.value)}
                            placeholder="Personal Website URL"
                        />
                    </div>

                    <div>
                        <label className="block">GitHub (if you have):</label>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            value={github}
                            onChange={(e) => setGithub(e.target.value)}
                            placeholder="GitHub URL"
                        />
                    </div>
                </div>

                <button type="submit" className="btn btn-primary w-full mt-4">
                    Update Social Links
                </button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default SocialLink;
