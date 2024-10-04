import { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";
import { updateProfile } from "firebase/auth";

const Register = () => {
    const { createUser } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const [imageFile, setImageFile] = useState(null); // State to store the selected image file

    const handleRegister = async (e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);

        const name = form.get('name');
        const email = form.get('email');
        const password = form.get('password');
        const role = form.get('role');
        console.log(name, email, password, role);

        let photoURL = ""; // Default empty photo URL

        try {
            if (imageFile) {
                // Upload image if selected
                photoURL = await uploadImage(imageFile);
            }

            // Create user
            const result = await createUser(email, password);

            Swal.fire({
                title: 'Success!',
                text: 'User registered successfully',
                icon: 'success',
                confirmButtonText: 'OK',
            });

            // Update profile with display name and photo URL
            await updateProfile(result.user, {
                displayName: name,
                photoURL,
            });

            // Save user info to MongoDB
            saveUserToDatabase(result.user, role);

            // Navigate to a different page after successful registration
            navigate('/login');
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: 'Error!',
                text: 'Registration failed',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    };

    const saveUserToDatabase = (user, role) => {
        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                displayName: user.displayName,
                photoURL: user.photoURL, // Photo URL from imgBB
                email: user.email,
                role: role,  // Save the user role
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('User saved to database', data);
            })
            .catch(error => {
                console.error('Error saving user to database', error);
            });
    };

    // Function to upload image to imgBB
    const uploadImage = async (imageFile) => {
        try {
            const formData = new FormData();
            formData.append("image", imageFile);

            const response = await fetch(`https://api.imgbb.com/1/upload?key=e04b2c2c85ddbc2b9379722536771dca`, {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                return data.data.display_url; // Return hosted image URL
            } else {
                throw new Error('Failed to upload image');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            throw error;
        }
    };

    // Handle image file selection
    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    return (
        <div>
            <div>
                <h2 className="text-3xl my-10 text-center">Please Register</h2>
                <form onSubmit={handleRegister} className="md:w-3/4 lg:w-1/2 mx-auto">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" required name="name" placeholder="Name" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Profile Picture</span>
                        </label>
                        <input type="file" name="photo" accept="image/*" onChange={handleImageChange} className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" required name="email" placeholder="Email" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" required name="password" placeholder="Password" className="input input-bordered" />
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Role</span>
                        </label>
                        <select name="role" required className="select select-bordered">
                            <option value="candidate">Candidate</option>
                            <option value="employer">Employer</option>
                        </select>
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Register</button>
                    </div>
                </form>

                <p className="text-center mt-4">
                    Have an account? please <Link className="text-blue-600 font-bold" to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
