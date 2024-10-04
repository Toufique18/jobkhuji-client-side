import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";

const Login = () => {
    const { signIn } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const handleSignin = async (e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const email = form.get("email");
        const password = form.get("password");

        try {
            // Step 1: Check if user is banned before Firebase login
            const response = await fetch(`http://localhost:5000/users/${email}`);
            const userData = await response.json();

            // Step 2: If the user is banned, show Swal and prevent Firebase login
            if (userData.isBanned) {
                Swal.fire({
                    icon: "error",
                    title: "Account Banned",
                    text: "Your account has been banned. Please contact support for further assistance.",
                });
            } else {
                // Step 3: Proceed with Firebase login only if the user is not banned
                signIn(email, password)
                    .then((result) => {
                        console.log(result.user);

                        // Step 4: Navigate the user to the desired route
                        navigate(location?.state ? location.state : "/");
                    })
                    .catch((error) => {
                        console.error(error);
                        Swal.fire({
                            icon: "error",
                            title: "Login Failed",
                            text: "Invalid email or password. Please try again.",
                        });
                    });
            }
        } catch (error) {
            console.error("Error checking ban status:", error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "An error occurred while checking your account status. Please try again.",
            });
        }
    };

    return (
        <div className="container mx-auto lg:px-20 px-5 py-5">
            <div>
                <h2 className="text-3xl my-10 text-center">Please Login</h2>
                <form onSubmit={handleSignin} className=" md:w-3/4 lg:w-1/2 mx-auto">
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
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Login</button>
                    </div>
                </form>
                <p className="text-center mt-4">
                    Do not have an account? Please <Link className="text-purple-500 font-bold" to="/register">Register</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
