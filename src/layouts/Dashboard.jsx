import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hook/useAdmin";
import useEmployer from "../hook/useEmployer";
import useCandidate from "../hook/useCandidate";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

const Dashboard = () => {
    const [isAdmin, isAdminLoading] = useAdmin();
    const [isEmployer, isEmployerLoading] = useEmployer();
    const [isCandidate, isCandidateLoading] = useCandidate();
    const { logOut } = useContext(AuthContext);

    const handleLogOut = () => {
        logOut()
            .then()
            .catch()
    }

    if (isAdminLoading || isEmployerLoading || isCandidateLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto lg:px-12 px-5 py-5">
            <div className="lg:flex bg-white">
                <div className="drawer lg:w-1/4 lg:drawer-open">
                    <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content items-start justify-center">
                        <label htmlFor="my-drawer-2" className="btn btn-ghost drawer-button lg:hidden">Open sidebar</label>
                    </div>
                    <div className="drawer-side">
                        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                        <ul className="menu w-72 min-h-full border border-l-2 pr-4 text-base-content">
                            <li><NavLink to={'/'}>Home</NavLink></li>
                            <div className="divider"></div>

                            {isAdmin && (
                                <>
                                    <li><NavLink to={'/dashboard/manageUser'}>Manage Users</NavLink></li>

                                </>
                            )}
                            {isEmployer && (
                                <>
                                    <li><NavLink to={'/dashboard/postJob'}>Post Job</NavLink></li>
                                    <li><NavLink to={'/dashboard/myPostedJobs'}>My Posted Jobs</NavLink></li>
                                    <li><NavLink to={'/dashboard/jobApplications'}>Job Applications</NavLink></li>
                                </>
                            )}
                            {isCandidate && (
                                <>
                                    <li><NavLink to={'/dashboard/findJobs'}>Find Jobs</NavLink></li>
                                    <li><NavLink to={'/dashboard/myApplications'}>My Applied Jobs</NavLink></li>
                                    <li><NavLink to={'/dashboard/favouriteJobs'}>My Favourite Jobs</NavLink></li>
                                    <li><NavLink to={'/dashboard/userProfile'}>My Profile</NavLink></li>
                                </>
                            )}

                            <div className="divider"></div>
                        </ul>
                    </div>
                </div>
                <div className="w-3/4">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
