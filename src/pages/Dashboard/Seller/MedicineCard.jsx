/* eslint-disable react/prop-types */


const MedicineCard = ({ medicine }) => {


    const {
        // category,
        company,
        discountPercentage,
        genericName,
        itemName,
         massUnit,
        unitPrice,
        image,
    } = medicine;

    return (
        <>
        
        <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                        <td className="px-6 py-4 text-sm text-gray-500">
                            <img
                                src={image}
                                alt={itemName}
                                className="h-16 w-16 rounded-lg object-cover"
                            />
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{itemName}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{genericName}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{company}</td>
                        <td className="px-6 py-4 text-sm text-green-600 font-bold">
                            ${unitPrice}
                        </td>
                        <td className="px-6 py-4 text-sm text-red-500">{discountPercentage}%</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{massUnit}</td>
                       
                        
                    </tr>
        </>
    );
};

export default MedicineCard;