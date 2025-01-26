/* eslint-disable react/prop-types */

import { useState } from "react";
import MedicineDetailsModal from "../Shop/MedicineDetailsModal ";
import { FaEye } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useCard from "./useCard";



const ShopCard = ({ medicine }) => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth();
    const [, refetch] = useCard()

    const {
        // category,
        company,
        discountPercentage,
        genericName,
        itemName,
        // massUnit,
        unitPrice,
        image,
        _id
    } = medicine;

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddToCard = (product) => {
        if (user && user.email) {
            // send card item to the database
            console.log(product, user.email)
            const cartItem = {
                menuId: _id,
                email: user.email,
                image: product.image,
                quantity: product.quantity,
                name: product.itemName,
                company: product.company,
                price: product.unitPrice,
            }
            axiosSecure.post("/cards", cartItem)
                .then(res => {
                    console.log(res.data)
                    if (res.data.insertedId) {
                        Swal.fire({
                            title: `${product.itemName} added to the card`,
                            icon: "success",
                            draggable: true
                        });
                        // refatch cart to update the cart items counts
                        refetch()
                    }
                })
        }
    }


    return (
        <>
            <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                <td className="px-6 py-4 text-sm text-gray-500">
                    <img
                        src={image}
                        alt={itemName}
                        className="h-16 w-16 rounded-lg object-cover"
                    />
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{itemName}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{genericName}</td>

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

