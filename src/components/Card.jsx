import BlurFade from "../BlurFade";
import { CiLocationOn } from "react-icons/ci";
import { BsDot } from "react-icons/bs";
import img from "../assets/image/briefcase-duotone1.png";
import { BorderBeam } from "../pages/BorderBeam";
import { Link } from "react-router-dom";

const Card = ({ card }) => {
    const { companyName, location, jobPostName, jobType, salary, _id } = card;

    return (
        <Link to={`/details/${_id}`}>
        <BlurFade delay={0.25} inView>
            <div className="border border-gray-400 rounded-xl p-6 bg-gradient-to-r from-amber-100">
                <div className="pb-4 flex items-center gap-3">
                    <img className="h-4 w-4 p-3" src={img} alt="Company Logo" />
                    <div>
                        <h3 className="pb-2 text-base font-medium">{companyName}</h3>
                        <p className="inline-flex items-center gap-2 text-sm font-normal text-gray-400">
                            <CiLocationOn /> {location}
                        </p>
                    </div>
                </div>
                <div>
                    <h2 className="text-xl font-semibold pb-2">{jobPostName}</h2>
                    <div className="flex items-center gap-2">
                        <p className="text-gray-400">{jobType}</p>
                        <p className="flex items-center gap-1 text-gray-400">
                            <BsDot />BDT {salary}
                        </p>
                    </div>
                </div>
                <BorderBeam
        className="your-custom-classes"
        size={250}
        duration={12}
        anchor={75}
        borderWidth={2}
        colorFrom="#ff0000"
        colorTo="#0000ff"
        delay={8}
      />
            </div>
           
        </BlurFade>
        </Link>
    );
};

export default Card;
