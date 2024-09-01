import { useLoaderData } from "react-router-dom";
import Banner from "../components/Banner";
import Canempreg from "../components/Canempreg";
import Card from "../components/Card";

const Home = () => {
    const cards = useLoaderData();
    const limitedCards = cards.slice(0, 5);
    return (
        <div>
            <Banner></Banner>
            <div className="container mx-auto lg:px-12 px-5 py-5">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {limitedCards.map(card => <Card key={card._id} card={card}></Card>)}
            </div>
            </div>
            
            <Canempreg></Canempreg>
        </div>
    );
};

export default Home;