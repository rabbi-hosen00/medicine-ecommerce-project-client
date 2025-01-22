import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";


const useCard = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()

    const { data: cart = [] } = useQuery({
        queryKey: ["cart", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/cards?email=${user.email}`);
            return res.data;
        }
    })
    return [cart]
};

export default useCard;