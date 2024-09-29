import { NavLink, Outlet } from "react-router-dom";

const UserProfile = () => {
    const links = <>

    <li><NavLink className={({ isActive }) => isActive ? "btn text-purple-600 border-b-2 border-b-purple-500 text-lg font-normal font-['Work Sans']" : "text-neutral-900 text-opacity-80 text-lg font-normal font-['Work Sans']"} to="/dashboard/userProfile/userPersonal">Personal</NavLink></li>
    <li><NavLink className={({ isActive }) => isActive ? "btn text-purple-600 border-b-2 border-b-purple-500 text-lg font-normal font-['Work Sans']" : "text-neutral-900 text-opacity-80 text-lg font-normal font-['Work Sans']"} to="/dashboard/userProfile/UserProfile">Profile</NavLink></li>
    <li><NavLink className={({ isActive }) => isActive ? "btn text-purple-600 border-b-2 border-b-purple-500 text-lg font-normal font-['Work Sans']" : "text-neutral-900 text-opacity-80 text-lg font-normal font-['Work Sans']"} to="/dashboard/userProfile/userSocialLinks">Social Links</NavLink></li>
    





</>
    return (
        <div>
            <div>
            <div className="navbar  bg-base-100  ">
                <div className="  lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {links}
                    </ul>
                </div>
            </div>
        </div>
            <div>
                <Outlet></Outlet>
            </div>
            
        </div>
    );
};

export default UserProfile;