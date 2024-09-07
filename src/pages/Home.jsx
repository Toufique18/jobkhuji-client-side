import { Link, useLoaderData } from "react-router-dom";
import Banner from "../components/Banner";
import Canempreg from "../components/Canempreg";
import Card from "../components/Card";

const Home = () => {
    const cards = useLoaderData();
    const limitedCards = cards.slice(0, 12);
    return (
        <div>
            <Banner></Banner>
            <div className="container mx-auto lg:px-12 px-5 py-5">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {limitedCards.map(card => <Card key={card._id} card={card}></Card>)}
            </div>
            <div className="text-center">
            <Link to={"/findJobs"}>
            <button className="btn text-white text-base font-semibold font-['Inter'] px-10 py-3 bg-[#0a65cc] rounded ">Find more jobs...</button></Link>
            </div>
            </div>
            
            <Canempreg></Canempreg>
        </div>
    );
};

export default Home;