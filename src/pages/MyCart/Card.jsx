/* eslint-disable react/prop-types */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCard from "../Shop/useCard";
import axios from "axios";


const Card = ({ medicine }) => {
    const axiosSecure = useAxiosSecure()
    const [, refetch] = useCard();
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();

    const { _id, name, image, company, price } = medicine;


    // console.log(category, name, image, category, company, price)
    const handleQuantityChange = (type) => {
        if (type === "increase") {
            setQuantity((prev) => prev + 1);
        } else if (type === "decrease" && quantity > 1) {
            setQuantity((prev) => prev - 1);
        }
    };

    const handleCheckout = async () => {
        const cartItem = {
            id: _id,
            name,
            company,
            quantity,
            totalPrice: price * quantity,
        };
        console.log("Cart item for checkout:", cartItem.name);
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/checkout`, cartItem)

            Swal.fire({
                icon: "success",
                title: "Success",
                text: `Successfully Checkout ${cartItem.name}.`,
            });
            navigate(`/checkout/${cartItem.id}`);
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: `Failed to add medicine: ${error.message}`,
            });
        }

    };

    
    const handleRemove = (id) => {
        console.log("Item removed:", id);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/cards/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    };



    return (
        <div className="card max-w-md mx-auto bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <img
                src={image}
                alt={name}
                className="rounded-t-lg h-48 w-full object-cover"
            />
            <div className="p-4">

                <p className="text-sm text-gray-500 mb-1">Name: {name}</p>
                <p className="text-sm text-gray-500 mb-1">Company: {company}</p>
                <p className="text-base text-gray-700 font-medium mb-3">
                    Price per Unit: <span className="text-green-500">${price}</span>
                </p>

                <div className="flex items-center gap-3 mb-4">
                    <button
                        onClick={() => handleQuantityChange("decrease")}
                        className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full hover:bg-gray-300"
                    >
                        -
                    </button>
                    <span className="text-lg font-medium">{quantity}</span>
                    <button
                        onClick={() => handleQuantityChange("increase")}
                        className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full hover:bg-gray-300"
                    >
                        +
                    </button>
                </div>
                <div className="flex justify-between items-center">
                    <button
                        onClick={handleCheckout}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                    >
                        Checkout
                    </button>
                    <button
                        onClick={() => handleRemove(medicine._id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-300"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Card;
