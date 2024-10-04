import React, { useState, useEffect, useCallback } from 'react';
import { getAuth, updateProfile } from 'firebase/auth';
import { useDropzone } from 'react-dropzone';
import CvResume from '../../components/CvResume';

const UserPersonal = () => {
    const auth = getAuth();
    const user = auth.currentUser;

    const [name, setName] = useState(user?.displayName || '');
    const [email, setEmail] = useState(user?.email || '');
    const [profilePic, setProfilePic] = useState(user?.photoURL || '');
    const [newProfilePic, setNewProfilePic] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        if (user) {
            setName(user.displayName || '');
            setEmail(user.email || '');
            setProfilePic(user.photoURL || '');
        }
    }, [user]);

    const onDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles && acceptedFiles.length > 0) {
            setNewProfilePic(acceptedFiles[0]);
            const previewUrl = URL.createObjectURL(acceptedFiles[0]);
            setProfilePic(previewUrl);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: 'image/*',
        maxFiles: 1,
    });

    const handleProfileUpdate = async () => {
        if (!user) return;

        setIsUpdating(true);

        try {
            const updateObj = {};

            if (newProfilePic) {
                const newPhotoURL = await uploadImage(newProfilePic);
                updateObj.photoURL = newPhotoURL;

                // Update the user's profile in Firebase
                await updateProfile(user, updateObj);

                // Update the user's photo URL in MongoDB using email
                await updateUserInDatabase(user.email, newPhotoURL);
            }

            alert('Profile updated successfully');
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile');
        } finally {
            setIsUpdating(false);
        }
    };

    // API call to update user in MongoDB by email
    const updateUserInDatabase = async (email, photoURL) => {
        try {
            const response = await fetch(`http://localhost:5000/usersPhoto/${email}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ photoURL }), // Only updating the photoURL
            });

            if (response.ok) {
                const data = await response.json();
                console.log('User photo updated in the database:', data);
            } else {
                throw new Error('Failed to update user in the database');
            }
        } catch (error) {
            console.error('Error updating user in the database:', error);
        }
    };

    // Upload the new image to imgbb
    const uploadImage = async (imageFile) => {
        try {
            const formData = new FormData();
            formData.append('image', imageFile);

            const response = await fetch(`https://api.imgbb.com/1/upload?key=e04b2c2c85ddbc2b9379722536771dca`, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                return data.data.display_url;
            } else {
                throw new Error('Failed to upload image');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            throw error;
        }
    };

    return (
        <div className=''>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-4">Basic Information</h1>

                <div className="flex gap-3">
                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2">Profile Picture</label>
                        <div
                            {...getRootProps()}
                            className={`border-2 border-dashed p-4 rounded-lg text-center ${isDragActive ? 'bg-gray-200' : ''}`}
                        >
                            <input {...getInputProps()} />
                            {isDragActive ? (
                                <p>Drop the image here ...</p>
                            ) : (
                                <span>
                                    <p>Click here for Browse photo or drop </p>
                                    <p>here for update your profile picture</p>
                                </span>
                            )}
                            {profilePic && (
                                <img
                                    src={profilePic}
                                    alt="Profile Preview"
                                    className="w-28 h-28 mt-4 mx-auto"
                                />
                            )}
                        </div>
                    </div>

                    <div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Name</label>
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                value={name}
                                disabled
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Email</label>
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                value={email}
                                disabled
                            />
                        </div>
                    </div>
                </div>

                <button
                    className={`btn ${isUpdating ? 'loading' : ''}`}
                    onClick={handleProfileUpdate}
                    disabled={isUpdating}
                >
                    {isUpdating ? 'Updating...' : 'Update Profile'}
                </button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <CvResume></CvResume>
            </div>
        </div>
    );
};

export default UserPersonal;
