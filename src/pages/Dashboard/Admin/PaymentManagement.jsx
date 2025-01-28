



import { useQuery,  } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const PaymentManagement = () => {
    const axiosSecure = useAxiosSecure();
    

    const { data: payments = [], refetch, isLoading } = useQuery({
        queryKey: ["payments"],
        queryFn: async () => {
            const res = await axiosSecure.get("/payments");
            return res.data;
        },
    });

    const handleUpdate = async (id) => {
        try {
            const response = await axiosSecure.patch(`/payments/${id}`, { status: "paid" });
    
            if (response.data.modifiedCount > 0) {
                   refetch()
                   Swal.fire({
                     icon: "success",
                     title: "Updated",
                     text: `Successfully updated the category.`,
                   });
                   refetch();
                   
                 } 
               } finally  {
                Swal.fire({
                    icon: "success",
                    title: "Updated",
                    text: `Successfully updated the category.`,
                  });
                 refetch();
               }
       
    };
    

    // Function to format the date in dd/mm/yyyy format for Bangladesh
    const formatDate = (date) => {
        const options = { day: "2-digit", month: "2-digit", year: "numeric" };
        return new Date(date).toLocaleDateString("en-BD", options);
    };

    if(isLoading){
        return <LoadingSpinner></LoadingSpinner>
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Payment Management</h2>
            <table className="min-w-full table-auto">
                <thead>
                    <tr className="bg-gray-200 text-left">
                        <th className="p-2">User Name</th>
                        <th className="p-2">User Email</th>
                        <th className="p-2">Medicine Name</th>
                        <th className="p-2">Transaction ID</th>
                        <th className="p-2">Price</th>
                        <th className="p-2">Purchase Date</th>
                        <th className="p-2">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map((payment) => (
                        <tr key={payment.transactionId} className="border-b">
                            <td className="p-2">{payment.name}</td>
                            <td className="p-2">{payment.email}</td>
                            <td className="p-2">{payment.itemName}</td>
                            <td className="p-2">{payment.transactionId}</td>
                            <td className="p-2">${payment.price}</td>
                            <td className="p-2">{formatDate(payment.date)}</td>
                            <td className="p-2">
                                {payment.status === "pending" ? (
                                    <button
                                        onClick={() => handleUpdate(payment._id)}
                                        className="bg-blue-500 text-white px-4 py-1 rounded"
                                    >
                                        Accept Payment
                                    </button>
                                ) : (
                                    <span className="text-green-600 font-semibold">Paid</span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PaymentManagement;


