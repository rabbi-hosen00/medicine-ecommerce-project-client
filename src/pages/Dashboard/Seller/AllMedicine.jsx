

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import MedicineCard from "./MedicineCard";

const AllMedicine = () => {
    const { data: medicines, isLoading } = useQuery({
        queryKey: ["medicine"],
        queryFn: async () => {
            const { data } = await axios(`${import.meta.env.VITE_API_URL}/medicine`);
            return data;
        },
    });

    // State for search, sorting, and pagination
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOrder, setSortOrder] = useState("asc"); // 'asc' for ascending, 'desc' for descending
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    if (isLoading) {
        return <LoadingSpinner />;
    }

    // Filter, sort, and paginate medicines
    const filteredMedicines = medicines
        ?.filter((medicine) =>
            [medicine.itemName, medicine.genericName, medicine.company]
                .some((field) =>
                    field.toLowerCase().includes(searchQuery.toLowerCase())
                )
        )
        .sort((a, b) => {
            if (sortOrder === "asc") {
                return a.unitPrice - b.unitPrice;
            } else {
                return b.unitPrice - a.unitPrice;
            }
        });

    // Pagination logic
    const totalItems = filteredMedicines?.length || 0;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentMedicines = filteredMedicines?.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1); // Reset to first page when searching
    };

    const handleSortChange = (e) => {
        setSortOrder(e.target.value);
    };

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

    return (
        <>
            <div className="flex justify-center mt-5 items-center">
                <h1 className="font-semibold text-4xl text-orange-600">All Medicine </h1>
            </div>

            {/* Search and Sort Controls */}
            <div className="flex flex-col md:flex-row justify-around items-center my-6 px-8">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search by name, generic name, or company..."
                    className="border border-amber-700 p-2 rounded-md mb-4 md:mb-0 md:w-1/3"
                />
                <select
                    value={sortOrder}
                    onChange={handleSortChange}
                    className="border  border-amber-700 p-2 rounded-md"
                >
                    <option value="asc" className="text-orange-600">Sort by Price: Low to High</option>
                    <option value="desc" className="text-orange-600">Sort by Price: High to Low</option>
                </select>
            </div>

            {/* Medicine Table */}
            {currentMedicines && currentMedicines.length > 0 ? (
                <div className="pt-8 flex justify-center">
                    <table className="table-auto border-collapse border border-gray-300 w-[80%] text-center">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 p-2">Image</th>
                                <th className="border border-gray-300 p-2">Item Name</th>
                                <th className="border border-gray-300 p-2">Generic Name</th>
                                <th className="border border-gray-300 p-2">Company</th>
                                <th className="border border-gray-300 p-2">Price</th>
                                <th className="border border-gray-300 p-2">Discount</th>
                                <th className="border border-gray-300 p-2">Mass Unit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentMedicines.map((medicine) => (
                                <MedicineCard
                                    key={medicine._id}
                                    medicine={medicine}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-center text-gray-500">No medicines found</p>
            )}

            {/* Pagination Controls */}
            <div className="flex justify-center items-center my-4">
                <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className="btn btn-secondary mx-2"
                >
                    Previous
                </button>

                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageClick(index + 1)}
                        className={`btn mx-1 ${
                            currentPage === index + 1
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
                    className="btn btn-secondary mx-2"
                >
                    Next
                </button>
            </div>
        </>
    );
};

export default AllMedicine;






