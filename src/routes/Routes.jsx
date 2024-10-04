import { createBrowserRouter, Navigate } from "react-router-dom";
import Root from "../layouts/Root";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Details from "../pages/Details";
import FindJob from "../pages/FindJob";
import Dashboard from "../layouts/Dashboard";
import MyApplication from "../pages/MyApplication";
import CustomerSupports from "../pages/CustomerSupports";
import PostJob from "../pages/PostJob";
import UserProfile from "../pages/UserProfile";
import UserPersonal from "../pages/candidateProfile/UserPersonal";
import Userprofile from "../pages/candidateProfile/UserProfile";
import SocialLink from "../pages/candidateProfile/SocialLink";
import FavouriteJob from "../pages/FavouriteJob";
import PostedJob from "../pages/PostedJob";
import UpdateJob from "../pages/UpdateJob";
import Applications from "../pages/Applications";
import Profile from "../pages/Profile";
import ManageEmployer from "../pages/admin/ManageEmployer";

//import PrivateRoute from "../pages/PrivateRoute";


const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {
                path: '/',
                element: <Home />,
                loader: () => fetch("http://localhost:5000/posts")

            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/details/:_id',
                element: <Details></Details>,
                loader: () => fetch("http://localhost:5000/posts")
            },
            {
                path: '/findJobs',
                element: <FindJob></FindJob>,
                loader: () => fetch("http://localhost:5000/jobs?page=1&limit=12")
            },
            {
                path: '/dashboard',
                element: <Dashboard></Dashboard>,
                children: [
                    
                    {
                        path: 'myApplications',
                        element: <MyApplication></MyApplication>
                    },
                    {
                        path: 'favouriteJobs',
                        element: <FavouriteJob></FavouriteJob>
                    },
                    {
                        path: 'postJob',
                        element: <PostJob></PostJob>
                    },
                    {
                        path: 'manageEmployer',
                        element: <ManageEmployer></ManageEmployer>
                    },
                    {
                        path: 'myPostedJobs',
                        element: <PostedJob></PostedJob>
                    },
                    {
                        path: 'update-job/:jobId',
                        element: <UpdateJob></UpdateJob>
                    },
                    {
                        path: 'applicationsinfo/:jobId',
                        element: <Applications></Applications>
                    },
                    {
                        path: 'profileApp/:userId',
                        element: <Profile></Profile>
                    },
                    {
                        path: 'userProfile',
                        element: <UserProfile></UserProfile>,
                        children: [
                            {
                                index: true, 
                                element: <Navigate to="userPersonal" />
                            },
                            {
                                path: 'userPersonal',
                                element: <UserPersonal></UserPersonal>
                            },
                            {
                                path: 'UserProfile',
                                element: <Userprofile></Userprofile>
                            },
                            {
                                path: 'userSocialLinks',
                                element: <SocialLink></SocialLink>
                            },
                        ]

                    },
                ]
            },
            {
                path: 'customerSupports',
                element: <CustomerSupports></CustomerSupports>
            },
            
            
        ]
    },
    
]);

export default router;
