import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
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
            
            
        ]
    },
    
]);

export default router;
