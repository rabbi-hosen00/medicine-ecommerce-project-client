
import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const useCategory = () => {

    const { data: categories, refetch, isLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const { data } = await axios(`${import.meta.env.VITE_API_URL}/category`)
            return data
        },
    })
    
    return [categories, refetch, isLoading]

}
export default useCategory;