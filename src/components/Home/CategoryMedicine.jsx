import { useQuery } from "@tanstack/react-query";

import LoadingSpinner from "../Shared/LoadingSpinner";
import useAxiosSecure from "../../hooks/useAxiosSecure";
// import MedicineCategoryCard from "../MedicineCategory/MedicineCategoryCard";
import Container from "../Shared/Container";
import MedicineCategoryCard from "../MedicineCategory/MedicineCategoryCard";


const CategoryMedicine = () => {

    const axiosSecure = useAxiosSecure()

    const { data: categories, isLoading } = useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            const { data } = await axiosSecure(`/category`);
            return data;
        },
    });

    // ${import.meta.env.VITE_API_URL}

    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }



    return (
        <>
            <div>
                <h2 className="text-4xl font-semibold text-center mb-7 text-orange-600"> Medicine Category</h2>
            </div>
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {
                        categories.map((catecory, idx) => <MedicineCategoryCard key={idx} catecory={catecory}></MedicineCategoryCard>)
                    }
                </div>
            </Container>
        </>
    );
};

export default CategoryMedicine;