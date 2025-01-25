


import { Helmet } from "react-helmet-async";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import * as XLSX from "xlsx"; // For Excel export
import jsPDF from "jspdf"; // For PDF export
import "jspdf-autotable"; // For table formatting in PDF
import { format } from "date-fns"; // For date formatting

const EmployeeData = () => {
    const { user } = useAuth();

    const { data: payments = [] } = useQuery({
        queryKey: ["payments", user.email],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/payments/${user.email}`);
            return res.data;
        },
        enabled: !!user.email, // Run query only if user.email exists
    });

    const formattedPayments = payments.map((payment) => ({
        ...payment,
        date: payment.date ? format(new Date(payment.date), "dd-MM-yyyy") : "N/A", // Format to Bangladeshi style
    }));

    // Export to Excel
    const handleDownloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(formattedPayments);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "EmployeeData");
        XLSX.writeFile(workbook, "EmployeeData.xlsx");
    };

    // Export to PDF
    const handleDownloadPDF = () => {
        const doc = new jsPDF();
        doc.text("Employee Data", 14, 10);

        doc.autoTable({
            startY: 20,
            head: [["User Name", "User Email", "Medicine Name", "Transaction ID", "Price", "Purchase Date"]],
            body: formattedPayments.map((payment) => [
                payment.name,
                payment.email,
                payment.itemName,
                payment.transactionId,
                payment.price,
                payment.date,
            ]),
        });

        doc.save("EmployeeData.pdf");
    };

    return (
        <>
            <Helmet>
                <title> Medicine | Employee Data</title>
            </Helmet>
            <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
                <div className="max-w-7xl mx-auto bg-white p-4 sm:p-6 shadow-md rounded-lg">
                    <h1 className="text-xl sm:text-2xl font-bold mb-4">Employee Data</h1>
                    <p className="text-gray-600 mb-6">Manage and export your data with ease.</p>

                    <div className="flex flex-wrap items-center gap-4 mb-4">
                        <button
                            onClick={handleDownloadExcel}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Download Excel
                        </button>
                        <button
                            onClick={handleDownloadPDF}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Download PDF
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="table-auto w-full border-collapse border border-gray-200">
                            <thead>
                                <tr className="bg-gray-200 text-sm sm:text-base">
                                    <th className="border border-gray-300 px-4 py-2 text-left">User Name</th>
                                    <th className="border border-gray-300 px-4 py-2 text-left">User Email</th>
                                    <th className="border border-gray-300 px-4 py-2 text-left">Medicine Name</th>
                                    <th className="border border-gray-300 px-4 py-2 text-left">Transaction ID</th>
                                    <th className="border border-gray-300 px-4 py-2 text-left">Price</th>
                                    <th className="border border-gray-300 px-4 py-2 text-left">Purchase Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {formattedPayments?.map((payment, index) => (
                                    <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                        <td className="border border-gray-300 px-4 py-2 text-sm sm:text-base">
                                            {payment.name}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2 text-sm sm:text-base">
                                            {payment.email}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2 text-sm sm:text-base">
                                            {payment.itemName}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2 text-sm sm:text-base">
                                            {payment.transactionId}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2 text-sm sm:text-base">
                                            {payment.price}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2 text-sm sm:text-base">
                                            {payment.date}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EmployeeData;
