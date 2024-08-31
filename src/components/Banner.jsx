import img from "../assets/image/Illustration.png"
const Banner = () => {
    return (
        <div className="container mx-auto lg:px-12 px-5 py-5">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-5xl">Find Your Next <br /> Job with Us</h1>
                    <p className="text-xl text-gray-600 mt-7 ">Discover your next career move with JobKhuji, the go-to job <br /> market place for job seekers and employers</p>
                </div>
                <img src={img} alt="" />
            </div>
        </div>
    );
};

export default Banner;