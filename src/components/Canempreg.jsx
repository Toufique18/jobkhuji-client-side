import { Link } from "react-router-dom";
import { GoArrowRight } from "react-icons/go";

const Canempreg = () => {
    return (
        <div className="container mx-auto lg:px-12 px-5 py-5">
            <div className="flex justify-between gap-4 py-8">
                <div className="w-full bg-sky-500 p-4 rounded-xl">
                    <h1 className="text-3xl font-medium">Become a Candidate</h1>
                    <p className="text-sm font-normal leading-tight py-4">Join as a Candidate <br /> 
                    to find your desired job.</p>
                    <Link to={"/register"}><button className=" btn flex items-center">Register now <GoArrowRight />
                    </button></Link>
                </div>
                <div className="w-full bg-primary/65 p-4 rounded-xl">
                    <h1 className="text-3xl font-medium">Become a Employers</h1>
                    <p className="text-sm font-normal leading-tight py-4">Hire your candidates by becoming <br /> an employer.</p>
                    <Link to={"/register"}><button className=" btn flex items-center">Register now <GoArrowRight />
                    </button></Link>
                </div>
            </div>
            
        </div>
    );
};

export default Canempreg;