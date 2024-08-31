import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
//import Footer from '../components/Footer';

const Root = () => {
    return (
        <div>
            <Header></Header>
            <Outlet></Outlet>
            
        </div>
    );
};

export default Root;