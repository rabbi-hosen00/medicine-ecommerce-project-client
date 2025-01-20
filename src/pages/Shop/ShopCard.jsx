/* eslint-disable react/prop-types */


// const ShopCard = ({ medicine, onViewDetails }) => {
//     const {
//         category,
//         company,
//         discountPercentage,
//         genericName,

//         itemName,
//         massUnit,

//         unitPrice,
//     } = medicine;

//     return (
//         <tr>
//             <td>{itemName}</td>
//             <td>{genericName}</td>
//             <td>{category}</td>
//             <td>{company}</td>
//             <td>{unitPrice}</td>
//             <td>{discountPercentage}%</td>
//             <td>{massUnit}</td>
//             <td>
//                 <button
//                     className="btn btn-primary btn-sm"
//                     onClick={() => alert("Selected!")}
//                 >
//                     Select
//                 </button>
//             </td>
//             <td>
//                 <button
//                     className="btn btn-info btn-sm"
//                     onClick={() => onViewDetails(medicine)}
//                 >
//                     Eye
//                 </button>
//             </td>
//         </tr>
//     );
// };

// export default ShopCard;






// const ShopCard = ({ medicine, onViewDetails }) => {
//     const {
//         category,
//         company,
//         discountPercentage,
//         genericName,
//         itemName,
//         massUnit,
//         unitPrice,
//         userImage
//     } = medicine;

//     return (
//         <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
//             <td className="px-6 py-4 text-sm font-medium text-gray-900">{itemName}</td>
//             <td className="px-6 py-4 text-sm text-gray-500">{genericName}</td>
//             <td className="px-6 py-4 text-sm text-gray-500">{category}</td>
//             <td className="px-6 py-4 text-sm text-gray-500">{company}</td>
//             <td className="px-6 py-4 text-sm text-green-600 font-bold">
//                 ${unitPrice}
//             </td>
//             <td className="px-6 py-4 text-sm text-red-500">{discountPercentage}%</td>
//             <td className="px-6 py-4 text-sm text-gray-500">{massUnit}</td>
//             <td className="px-6 py-4 text-sm">
//                 <button
//                     className="px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 focus:outline-none"
//                     onClick={() => alert("Selected!")}
//                 >
//                     Select
//                 </button>
//             </td>
//             <td className="px-6 py-4 text-sm">
//                 <button
//                     className="px-3 py-1 text-white bg-teal-500 rounded hover:bg-teal-600 focus:ring-2 focus:ring-teal-300 focus:outline-none"
//                     onClick={() => onViewDetails(medicine)}
//                 >
//                     Eye
//                 </button>
//             </td>
//         </tr>
//     );
// };

// export default ShopCard;




import { useState } from "react";
import MedicineDetailsModal from "../Shop/MedicineDetailsModal ";
import { FaEye } from "react-icons/fa";
import { NavLink } from "react-router-dom";
// import MedicineDetailsModal from "./MedicineDetailsModal";

const ShopCard = ({ medicine }) => {
    const {
        // category,
        company,
        discountPercentage,
        genericName,
        itemName,
        // massUnit,
        unitPrice,
        // userImage,
    } = medicine;

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{itemName}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{genericName}</td>
                {/* {/* <td className="px-6 py-4 text-sm text-gray-500">{category}</td> */}
                <td className="px-6 py-4 text-sm text-gray-500">{company}</td>
                <td className="px-6 py-4 text-sm text-green-600 font-bold">
                    ${unitPrice}
                </td>
                <td className="px-6 py-4 text-sm text-red-500">{discountPercentage}%</td>
                {/* <td className="px-6 py-4 text-sm text-gray-500">{massUnit}</td> */}
                <td className="px-6 py-4 text-sm">
                    <NavLink >
                        <button
                            className="px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 focus:outline-none"
                            onClick={() => alert("Selected!")}
                        >
                            Select
                        </button>
                    </NavLink>
                </td>
                <td className="px-6 py-4 text-sm">
                    <button
                        className="px-3 py-1 text-white bg-teal-500 rounded hover:bg-teal-600 focus:ring-2 focus:ring-teal-300 focus:outline-none"
                        onClick={() => setIsModalOpen(true)}
                    >
                        <FaEye></FaEye>
                    </button>
                </td>
            </tr>
            {isModalOpen && (
                <MedicineDetailsModal
                    medicine={medicine}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </>
    );
};

export default ShopCard;

