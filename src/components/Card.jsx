import { useState, useEffect } from "react";

const Card = ({ card }) => {
    const { productImage, productName, description, price, category, brandName, ratings, creationDateTime, _id } = card;
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div
            className={`card w-full bg-base-100 shadow-2xl shadow-violet-300 transform transition-transform duration-500 ease-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
            }`}
        >
            <figure className="px-10 pt-10">
                <img src={productImage} alt={productName} className="rounded-xl h-48 w-full object-cover" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{productName}</h2>
                <p className="text-sm text-gray-500">Brand: {brandName}</p>
                <p className="text-sm text-gray-500">Category: {category}</p>
                <p>{description}</p>
                <p className="text-lg font-semibold">Price: ${price}</p>
                <p className="text-sm text-gray-500">Ratings: {ratings} / 5</p>
                <p className="text-sm text-gray-500">Created on: {new Date(creationDateTime).toLocaleString()}</p>
                
            </div>
        </div>
    );
};

export default Card;
