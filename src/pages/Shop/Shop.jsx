
import { useQuery } from "@tanstack/react-query";
import Container from "../../components/Shared/Container";

import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import ShopCard from "../Shop/ShopCard";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
import axios from "axios";



const Shop = () => {
    // const axiosSecure = useAxiosSecure()
    const { data: medicines, isLoading } = useQuery({
        queryKey: ["medicine"],
        queryFn: async () => {
            const { data } = await axios(`${import.meta.env.VITE_API_URL}/medicine`);
            return data;
        },
    });


    const [selectedMedicine, setSelectedMedicine] = useState(null);

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <Container>
            <Helmet>
                <title> shop | Buy Your Desired medicine</title>
            </Helmet>

            {medicines && medicines.length > 0 ? (
                <div className="pt-12 flex justify-center">
                    <table className="table-auto   border-collapse border border-gray-300 w-[80%] text-center">
                        <thead>
                            <tr className="bg-gray-100">
                            <th className="border border-gray-300 p-2">Image</th>
                                <th className="border border-gray-300 p-2">Item Name</th>
                                <th className="border border-gray-300 p-2">Generic Name</th>
                                <th className="border border-gray-300 p-2">Company</th>
                                <th className="border border-gray-300 p-2">Price</th>
                                <th className="border border-gray-300 p-2">Discount</th>
                                {/* <th className="border border-gray-300 p-2">Mass Unit</th> */}
                                <th className="border border-gray-300 p-2">Select</th>
                                <th className="border border-gray-300 p-2">Eye</th>
                            </tr>
                        </thead>
                        <tbody>
                            {medicines.map((medicine) => (
                                <ShopCard
                                    key={medicine._id}
                                    medicine={medicine}
                                    onViewDetails={setSelectedMedicine}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>No data available</p>
            )}
            {selectedMedicine && (
                <div
                    className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
                    onClick={() => setSelectedMedicine(null)}
                >
                    <div
                        className="bg-white p-6 rounded-lg w-96"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-lg font-bold mb-4">{selectedMedicine.itemName}</h2>
                        <img
                            src={selectedMedicine.image}
                            alt={selectedMedicine.itemName}
                            className="w-full h-48 object-cover mb-4"
                        />
                        <p>{selectedMedicine.shortDescription}</p>
                        <ul className="mt-4">
                            <li>Category: {selectedMedicine.category}</li>
                            <li>Company: {selectedMedicine.company}</li>
                            <li>Price: ${selectedMedicine.unitPrice}</li>
                            <li>Discount: {selectedMedicine.discountPercentage}%</li>
                            <li>Mass Unit: {selectedMedicine.massUnit}</li>
                        </ul>
                        <button
                            className="btn btn-danger mt-4"
                            onClick={() => setSelectedMedicine(null)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </Container>
    );
};

export default Shop;






