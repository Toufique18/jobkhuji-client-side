import img from "../assets/image/Illustration.png"
import img1 from "../assets/image/briefcase-duotone1.png"
import img2 from "../assets/image/buildings-duotone1.png"
import img3 from "../assets/image/users-duotone1.png"

const Banner = () => {
    return (
        <div className="container mx-auto lg:px-12 px-5 py-5 bg-gray-100">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-5xl">Find Your Next <br /> Job with Us</h1>
                    <p className="text-xl text-gray-600 mt-7 ">Discover your next career move with JobKhuji, the go-to job <br /> market place for job seekers and employers</p>
                </div>
                <img src={img} alt="" />
            </div>
            <div className="flex items-center justify-evenly mt-6">
                <div className="py-3 px-4 bg-white">
                    <div className="flex items-center">
                        <img className="bg-primary/10 p-2" src={img1} alt="" />
                        <div className="pl-3">
                            <h3>100</h3>
                            <p>Total Jobs</p>
                        </div>
                    </div>
                </div>
                <div className="py-3 px-4 bg-white">
                    <div className="flex items-center">
                        <img className="bg-primary p-2" src={img2} alt="" />
                        <div className="pl-3">
                            <h3 >100</h3>
                            <p>Companies</p>
                        </div>
                    </div>
                </div>
                <div className="py-3 px-4 bg-white">
                    <div className="flex items-center">
                        <img className="bg-primary/10 p-2" src={img3} alt="" />
                        <div className="pl-3">
                            <h3>100</h3>
                            <p>Candidates</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Banner;