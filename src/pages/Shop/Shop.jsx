
import { useQuery } from "@tanstack/react-query";

import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import ShopCard from "../Shop/ShopCard";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import Container from "../../components/Shared/Container";

const Shop = () => {
    const { data: medicines, isLoading } = useQuery({
        queryKey: ["medicine"],
        queryFn: async () => {
            const { data } = await axios(`${import.meta.env.VITE_API_URL}/medicine`);
            return data;
        },
    });

    const [selectedMedicine, setSelectedMedicine] = useState(null);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Sorting and searching state
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOrder, setSortOrder] = useState("asc"); // 'asc' for ascending, 'desc' for descending

    // Filter and sort medicines
    const filteredMedicines = medicines
        ?.filter((medicine) =>
            medicine.itemName.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => {
            if (sortOrder === "asc") {
                return a.unitPrice - b.unitPrice;
            } else {
                return b.unitPrice - a.unitPrice;
            }
        });

    // Derived data for current page
    const totalItems = filteredMedicines?.length || 0;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentMedicines = filteredMedicines?.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    const handlePageClick = (page) => {
        setCurrentPage(page);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1); // Reset to the first page on search
    };

    const handleSortChange = (e) => {
        setSortOrder(e.target.value);
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <Container>
            <Helmet>
                <title>Medicine || Medicine Category</title>
            </Helmet>

            {/* Search and Sort Controls */}
            <div className="flex mt-8   flex-col md:flex-row justify-between items-center my-4">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search for medicines..."
                    className="border-2 border-orange-600 p-2 flex justify-center items-center rounded-md mb-4 md:mb-0 md:w-1/3"
                />
                <select
                    value={sortOrder}
                    onChange={handleSortChange}
                    className="border border-gray-300 p-2 rounded-md"
                >
                    <option value="asc" className="text-orange-600">Sort by Price: Low to High</option>
                    <option value="desc" className="text-orange-600">Sort by Price: High to Low</option>
                </select>
            </div>

            {currentMedicines && currentMedicines.length > 0 ? (
                <div className="pt-4  flex flex-col items-center">
                    <table className="table-auto border-collapse border border-gray-300 w-full text-center mb-4">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 p-2">Image</th>
                                <th className="border border-gray-300 p-2">Item Name</th>
                                <th className="border border-gray-300 p-2">Generic Name</th>
                                <th className="border border-gray-300 p-2">Company</th>
                                <th className="border border-gray-300 p-2">Price</th>
                                <th className="border border-gray-300 p-2">Discount</th>
                                <th className="border border-gray-300 p-2">Select</th>
                                <th className="border border-gray-300 p-2">Eye</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentMedicines.map((medicine) => (
                                <ShopCard
                                    key={medicine._id}
                                    medicine={medicine}
                                    onViewDetails={setSelectedMedicine}
                                />
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination controls */}
                    <div className="flex gap-2 mb-4">
                        <button
                            onClick={handlePreviousPage}
                            disabled={currentPage === 1}
                            className="btn btn-secondary"
                        >
                            Previous
                        </button>

                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index}
                                onClick={() => handlePageClick(index + 1)}
                                className={`btn ${currentPage === index + 1
                                        ? "btn-primary"
                                        : "btn-outline"
                                    }`}
                            >
                                {index + 1}
                            </button>
                        ))}

                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                            className="btn btn-secondary"
                        >
                            Next
                        </button>
                    </div>
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
                        <h2 className="text-lg font-bold mb-4">
                            {selectedMedicine.itemName}
                        </h2>
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
