import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Details from "../pages/Details";
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
                path: '/details',
                element: <Details></Details>,
                loader: () => fetch("http://localhost:5000/job_info")
            },
            
            
        ]
    },
    
]);

export default router;
