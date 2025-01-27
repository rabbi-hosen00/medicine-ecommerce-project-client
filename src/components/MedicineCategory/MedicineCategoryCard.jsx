/* eslint-disable react/prop-types */

import { NavLink } from "react-router-dom";


const MedicineCategoryCard = ({ catecory }) => {
    const { _id, imageURL, category, quantity } = catecory;

    return (
        <div className="max-w-sm mx-auto bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
            <div className="relative">
                <img
                    src={imageURL}
                    alt={category}
                    className="w-full h-48 object-cover"
                />
                <NavLink to={`/category/${_id}`}>
                    <div className="absolute top-0 left-0 bg-black bg-opacity-40 w-full h-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                        <p className="text-white font-bold text-xl">View More</p>
                    </div>
                </NavLink>

            </div>
            <div className="p-6">
                <h3 className="text-lg font-bold text-gray-800">{category}</h3>
                <p className="text-gray-600 mt-2">
                    Available Quantity: <span className="font-semibold">{quantity}</span>
                </p>

            </div>
        </div>
    );
};

export default MedicineCategoryCard;





