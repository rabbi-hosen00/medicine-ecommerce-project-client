

import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../Shared/LoadingSpinner";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import axios from "axios";

const DiscountProduct = () => {
    // const axiosSecure = useAxiosSecure();
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

    // Filter medicines to get only those with discounts
    const discountedMedicines = medicines?.filter(
        (medicine) => medicine.discountPercentage > 0
    );

    return (
        <div className="my-8 w-full max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-6">
                Discounted Products
            </h2>
            <Swiper
                modules={[Navigation, Pagination]}
                navigation
                pagination={{ clickable: true }}
                spaceBetween={30}
                slidesPerView={3}
                breakpoints={{
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
            >
                {discountedMedicines?.map((medicine) => (
                    <SwiperSlide key={medicine.id}>
                        <div className="border rounded-lg p-4 shadow-md hover:shadow-xl transition-shadow duration-300">
                            <img
                                src={medicine.image}
                                alt={medicine.itemName}
                                className="w-full h-48 object-cover rounded-md mb-3"
                            />
                            <h3 className="text-lg font-semibold mb-2">
                                {medicine.itemName}
                            </h3>
                            <p className="text-gray-600">
                                Price: ${medicine.unitPrice}
                            </p>

                            <p className="text-red-500 font-medium">
                                {medicine.discountPercentage}% OFF
                            </p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default DiscountProduct;
