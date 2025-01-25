
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import useAuth from "../../hooks/useAuth";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const EmployeeData = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const { user } = useAuth();
    
console.log("user email",user.email)

    const { data: payments = [],  } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
          const res = await axios.get(`${import.meta.env.VITE_API_URL}/payments/${user.email}`);
          return res.data;
        },
        enabled: !!user.email, // Run query only if user.email exists
      });

    console.log("payment", payments)
    
    const filteredPaments = payments.filter((payment) =>
        payment.name.toLowerCase().includes(searchTerm.toLowerCase())
    );


    return (
        <>
            <Helmet>
                <title> Medicine | Madicine page</title>
            </Helmet>
            <div className="p-6 bg-gray-50 min-h-screen">
                <div className="max-w-4xl mx-auto bg-white p-6 shadow-md rounded-lg">
                    <h1 className="text-2xl font-bold mb-4">Employee Data</h1>
                    <p className="text-gray-600 mb-6">Manage and export your data with ease.</p>

                    <div className="flex items-center gap-4 mb-4">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Download Excel</button>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Download CSV</button>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Print</button>
                        <input
                            type="text"
                            placeholder="Search by name..."
                            className="border border-gray-300 rounded px-4 py-2 w-full max-w-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <table className="table-auto w-full border-collapse border border-gray-200">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border border-gray-300 px-4 py-2 text-left"> User Name</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">User Email</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Medicine Name</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Transection Id</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Price</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Purchase Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPaments?.map((pament, index) => (
                                <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                    <td className="border border-gray-300 px-4 py-2">{pament.name}</td>
                                    <td className="border border-gray-300 px-4 py-2">{pament.email}</td>
                                    <td className="border border-gray-300 px-4 py-2">{pament.itemName}</td>
                                    <td className="border border-gray-300 px-4 py-2">{pament.transactionId}</td>
                                    <td className="border border-gray-300 px-4 py-2">{pament.price}</td>
                                    <td className="border border-gray-300 px-4 py-2">{pament.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </>
    );
};

export default EmployeeData;

