import img from "../assets/image/briefcase.svg";
import img2 from "../assets/image/CalendarBlank.svg";
import img3 from "../assets/image/Timer.svg";
import img4 from "../assets/image/Wallet.svg";
import img5 from "../assets/image/MapPinLine.svg";
import img6 from "../assets/image/fi_link.svg";
import img7 from "../assets/image/Envelope.svg";
import img8 from "../assets/image/phone.svg";
import img9 from "../assets/image/fi_arrow-right.svg";
import { useLoaderData, useParams } from "react-router-dom";

const Details = () => {
    const jobs = useLoaderData();
    const { _id } = useParams();
    const job = jobs.find(job => job._id === _id);

    if (!job) {
        return <div>Job not found</div>;
    }

    // Define a date format function
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
    };

    return (
        <div>
            <div className="bg-[#f1f2f4] justify-between items-center inline-flex w-full">
                <h3 className="text-[#18191c] text-lg font-medium font-['Inter'] container mx-auto lg:px-12 px-5 py-5">Job Details</h3>
            </div>
            <div className="container mx-auto lg:px-12 px-5 py-5">

                <div className="flex items-center justify-between py-5">
                    <div className="gap-3 flex items-center">
                        <img className="w-16 h-16 p-5 bg-gray-400 rounded-[100px]" src={job.companyLogoUrl} alt={job.companyName} />
                        <div>
                            <div className="gap-1 flex items-center">
                                <h2 className="text-[#18191c] text-2xl font-medium font-['Inter']">{job.jobPostName}</h2>
                                <p className="text-[#0065ff] text-sm font-normal font-['Inter'] bg-[#e8f1ff] rounded-[52px] px-3 py-1">{job.jobType}</p>
                            </div>
                            <div className="gap-1 flex items-center pt-3">
                                <p className="flex items-center gap-1 text-[#474c54] text-base font-normal font-['Inter']">
                                    <img className="h-5 w-5" src={img6} alt="website" /> 
                                    <a href={job.companyWebsite} target="_blank" rel="noopener noreferrer">{job.companyWebsite}</a>
                                </p>
                                <p className="flex items-center gap-1 text-[#474c54] text-base font-normal font-['Inter'] px-2">
                                    <img className="h-5 w-5" src={img8} alt="phone" />
                                    {job.phoneNumber}
                                </p>
                                <p className="flex items-center gap-1 text-[#474c54] text-base font-normal font-['Inter']">
                                    <img className="h-5 w-5" src={img7} alt="email" />
                                    {job.emailAddress}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="text-end">
                        <button className="btn text-white text-base font-semibold font-['Inter'] px-10 py-3 bg-[#0a65cc] rounded flex items-center gap-3">
                            Apply now <img src={img9} alt="arrow" />
                        </button>
                        <p className="text-[#767f8c] text-sm font-normal font-['Inter']">
                            Job expires on: {formatDate(job.vacancyExpireDate)}
                        </p>
                    </div>
                </div>

                <div className="flex items-start">
                    <div className="w-3/5">
                        <h5 className="text-black text-lg font-medium font-['Inter'] pb-4">Job Description</h5>
                        <p className="text-[#5e6670] text-base font-normal font-['Inter']">{job.jobDescription}</p>

                        <h5 className="text-black text-lg font-medium font-['Inter'] pt-4">Responsibilities</h5>
                        <ul className="list-disc pl-5">
                            {job.jobResponsibilities.map((responsibility, index) => (
                                <li key={index} className="text-[#5e6670] text-base font-normal font-['Inter']">{responsibility}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="w-2/5 p-8 bg-white rounded-lg border-2 border-[#e7f0fa] justify-start items-start">
                        <h5 className="text-[#181f33] text-xl font-medium font-['Inter'] pb-5">Job Overview</h5>
                        <div className="grid grid-cols-3 gap-6">
                            <div className="text-start">
                                <img className="h-9 w-9 pb-3" src={img2} alt="calendar" />
                                <p className="text-[#767f8c] text-xs font-normal font-['Inter'] uppercase">Job Posted:</p>
                                <h6 className="text-[#18191c] text-sm font-medium font-['Inter']">{formatDate(job.vacancyPostedDate)}</h6>
                            </div>
                            <div>
                                <img className="h-9 w-9 pb-3" src={img3} alt="timer" />
                                <p className="text-[#767f8c] text-xs font-normal font-['Inter'] uppercase">Job expires on:</p>
                                <h6 className="text-[#18191c] text-sm font-medium font-['Inter']">{formatDate(job.vacancyExpireDate)}</h6>
                            </div>
                            <div>
                                <img className="h-9 w-9 pb-3" src={img} alt="briefcase" />
                                <p className="text-[#767f8c] text-xs font-normal font-['Inter'] uppercase">Education</p>
                                <h6 className="text-[#18191c] text-sm font-medium font-['Inter']">{job.educationQualification}</h6>
                            </div>
                            <div>
                                <img className="h-9 w-9 pb-3" src={img4} alt="wallet" />
                                <p className="text-[#767f8c] text-xs font-normal font-['Inter'] uppercase">Salary:</p>
                                <h6 className="text-[#18191c] text-sm font-medium font-['Inter']">BDT {job.salary}</h6>
                            </div>
                            <div>
                                <img className="h-9 w-9 pb-3" src={img5} alt="location" />
                                <p className="text-[#767f8c] text-xs font-normal font-['Inter'] uppercase">Location:</p>
                                <h6 className="text-[#18191c] text-sm font-medium font-['Inter']">{job.location}</h6>
                            </div>
                            <div>
                                <img className="h-9 w-9 pb-3" src={img} alt="briefcase" />
                                <p className="text-[#767f8c] text-xs font-normal font-['Inter'] uppercase">Job Type:</p>
                                <h6 className="text-[#18191c] text-sm font-medium font-['Inter']">{job.jobType}</h6>
                            </div>
                            <div>
                                <img className="h-9 w-9 pb-3" src={img} alt="briefcase" />
                                <p className="text-[#767f8c] text-xs font-normal font-['Inter'] uppercase">Experience:</p>
                                <h6 className="text-[#18191c] text-sm font-medium font-['Inter']">{job.experience}</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Details;
