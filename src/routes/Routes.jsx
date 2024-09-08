import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Details from "../pages/Details";
import FindJob from "../pages/FindJob";
import Dashboard from "../layouts/Dashboard";
import Overview from "../pages/Overview";
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
                        path: 'overview',
                        element: <Overview></Overview>
                    },
                ]
            },
            
            
        ]
    },
    
]);

export default router;
