import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";
import { updateProfile } from "firebase/auth";
//import { FcGoogle } from "react-icons/fc";

const Register = () => {

    const { createUser, signInWithGoogle } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const handleRegister = e => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);

        const name = form.get('name');
        const photo = form.get('photo');
        const email = form.get('email');
        const password = form.get('password');
        const role = form.get('role');
        console.log(name, photo, email, password, role);

        // create user
        createUser(email, password)
            .then(result => {
                Swal.fire({
                    title: 'Success!',
                    text: 'User registered successfully',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });

                // update profile
                updateProfile(result.user, {
                    displayName: name,
                    photoURL: photo
                }).then(() => {
                    // Save user info to MongoDB
                    saveUserToDatabase(result.user, role);
                });
            })
            .catch(error => {
                console.error(error);
            });
    }

    const saveUserToDatabase = (user, role) => {
        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                displayName: user.displayName,
                email: user.email,
                role: role  // Save the user role
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log('User saved to database', data);
            })
            .catch(error => {
                console.error('Error saving user to database', error);
            });
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
                            <span className="label-text">Photo URL</span>
                        </label>
                        <input type="text" required name="photo" placeholder="Photo URL" className="input input-bordered" />
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

                {/* <div className="text-center">
                <button onClick={handleGoogleSignIn} className="btn btn-ghost"><FcGoogle />
                        Login with Google</button>
                </div> */}
                <p className="text-center mt-4">Have an account? please <Link className="text-blue-600 font-bold" to="/login">Login</Link></p>
            </div>

        </div>
    );
};

export default Register;