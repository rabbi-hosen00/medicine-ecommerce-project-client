/* eslint-disable react/prop-types */




import { useState } from "react";
import MedicineDetailsModal from "../Shop/MedicineDetailsModal ";
import { FaEye } from "react-icons/fa";
import { NavLink } from "react-router-dom";
// import MedicineDetailsModal from "./MedicineDetailsModal";

const ShopCard = ({ medicine }) => {
    const {
        // category,
        company,
        discountPercentage,
        genericName,
        itemName,
        // massUnit,
        unitPrice,
        // userImage,
    } = medicine;

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddToCard = (product)=>{
        console.log(product)
    }



    return (
        <>
            <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{itemName}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{genericName}</td>
                {/* {/* <td className="px-6 py-4 text-sm text-gray-500">{category}</td> */}
                <td className="px-6 py-4 text-sm text-gray-500">{company}</td>
                <td className="px-6 py-4 text-sm text-green-600 font-bold">
                    ${unitPrice}
                </td>
                <td className="px-6 py-4 text-sm text-red-500">{discountPercentage}%</td>
                {/* <td className="px-6 py-4 text-sm text-gray-500">{massUnit}</td> */}
                <td className="px-6 py-4 text-sm">
                    <NavLink >
                        <button
                            className="px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 focus:outline-none"
                            onClick={() => handleAddToCard(medicine)}
                        >
                            Select
                        </button>
                    </NavLink>
                </td>
                <td className="px-6 py-4 text-sm">
                    <button
                        className="px-3 py-1 text-white bg-teal-500 rounded hover:bg-teal-600 focus:ring-2 focus:ring-teal-300 focus:outline-none"
                        onClick={() => setIsModalOpen(true)}
                    >
                        <FaEye></FaEye>
                    </button>
                </td>
            </tr>
            {isModalOpen && (
                <MedicineDetailsModal
                    medicine={medicine}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </>
    );
};

export default ShopCard;

