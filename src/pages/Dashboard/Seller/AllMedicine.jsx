import { useQuery } from "@tanstack/react-query";
import axios from "axios";
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

    if (isLoading) {
        return <LoadingSpinner />;
    }


    return (
        <>
        <div className="flex justify-center mt-5 items-center">
            <h1 className="font-semibold text-3xl text-cyan-600">All Medicine</h1>
        </div>
            {medicines && medicines.length > 0 ? (
                <div className="pt-8 flex justify-center">
                    <table className="table-auto   border-collapse border border-gray-300 w-[80%] text-center">
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
                            {medicines.map((medicine) => (
                                <MedicineCard
                                    key={medicine._id}
                                    medicine={medicine}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>No data available</p>
            )}
        </>
    );
};

export default AllMedicine;
