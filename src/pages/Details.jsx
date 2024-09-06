import img from "../assets/image/briefcase.svg"
import img2 from "../assets/image/CalendarBlank.svg"
import img3 from "../assets/image/Timer.svg"
import img4 from "../assets/image/Wallet.svg"
import img5 from "../assets/image/MapPinLine.svg"
const Details = () => {
    return (
        <div className="container mx-auto lg:px-12 px-5 py-5">
            <div>
                <h3 className="py-6 bg-[#f1f2f4] justify-between items-center inline-flex">Job Details</h3>
            </div>
            <div className="flex items-center justify-between py-5">
                <div className="gap-3 flex items-center ">
                    <img src="" alt="" />
                    <div>
                        <div className="gap-1 flex items-center ">
                            <h2>Post Name</h2>
                            <p>Full time</p>
                        </div>
                        <div className="gap-1 flex items-center ">
                            <p>website link</p>
                            <p>number</p>
                            <p>email</p>
                        </div>
                    </div>

                </div>
                <div>
                    <button className="btn">Apply now </button>
                    <p>Job expire in: 8947932</p>
                </div>
            </div>
            <div className="flex items-start ">
                <div className="w-3/5">
                    <h5>Job Description</h5>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime, quod reiciendis rem, ab quam natus placeat eaque ipsa quo aut tempore eum, consequatur iste perspiciatis ratione eos ipsam dignissimos alias? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores, reprehenderit! Nihil, distinctio, et deserunt voluptatum ipsum impedit optio quasi reprehenderit eveniet ea, doloremque possimus ex amet provident tenetur aspernatur unde?</p>

                    <h5>Responsibilities</h5>
                    <li>
                        <ul></ul>
                    </li>
                </div>
                <div className="w-2/5 p-8 bg-white rounded-lg border-2 border-[#e7f0fa] justify-start items-start">
                    <h5>Job Overview</h5>
                    <div className="grid grid-cols-3 gap-6">
                        <div>
                            <img className="h-8 w-8" src={img2} alt="" />
                            <p className="text-[#767f8c] text-xs font-normal font-['Inter'] uppercase">Job Posted:</p>
                            <h6 className="text-[#18191c] text-sm font-medium font-['Inter']">date 3456</h6>
                        </div>
                        <div>
                            <img className="h-8 w-8" src={img3} alt="" />
                            <p className="text-[#767f8c] text-xs font-normal font-['Inter'] uppercase">Job expire in:</p>
                            <h6 className="text-[#18191c] text-sm font-medium font-['Inter']">date 3456</h6>
                        </div>
                        <div>
                            <img className="h-8 w-8" src={img} alt="" />
                            <p className="text-[#767f8c] text-xs font-normal font-['Inter'] uppercase">Education</p>
                            <h6 className="text-[#18191c] text-sm font-medium font-['Inter']">date 3456</h6>
                        </div>
                        <div>
                            <img className="h-8 w-8" src={img4} alt="" />
                            <p className="text-[#767f8c] text-xs font-normal font-['Inter'] uppercase">Salery:</p>
                            <h6 className="text-[#18191c] text-sm font-medium font-['Inter']">date 3456</h6>
                        </div>
                        <div>
                            <img className="h-8 w-8" src={img5} alt="" />
                            <p className="text-[#767f8c] text-xs font-normal font-['Inter'] uppercase">LOCATIOn:</p>
                            <h6 className="text-[#18191c] text-sm font-medium font-['Inter']">date 3456</h6>
                        </div>
                        <div>
                            <img className="h-8 w-8" src={img} alt="" />
                            <p className="text-[#767f8c] text-xs font-normal font-['Inter'] uppercase">job type:</p>
                            <h6 className="text-[#18191c] text-sm font-medium font-['Inter']">date 3456</h6>
                        </div>
                        <div>
                            <img className="h-8 w-8" src={img} alt="" />
                            <p className="text-[#767f8c] text-xs font-normal font-['Inter'] uppercase">Experience</p>
                            <h6 className="text-[#18191c] text-sm font-medium font-['Inter']">date 3456</h6>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Details;