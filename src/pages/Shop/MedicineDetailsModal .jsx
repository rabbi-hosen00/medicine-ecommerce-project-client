/* eslint-disable react/prop-types */



const MedicineDetailsModal = ({ medicine, onClose }) => {
    const {
        itemName,
        genericName,
        category,
        company,
        unitPrice,
        discountPercentage,
        massUnit,
        image,
    } = medicine;


    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-11/12 max-w-lg md:w-4/5 lg:w-1/2 relative">
                <button
                    className="absolute top-4 right-4 text-gray-600 hover:text-red-500"
                    onClick={onClose}
                >
                    ✕
                </button>

                <img
                    src={image}
                    alt={itemName}
                    className="w-full h-48 object-cover rounded mb-4"
                />
                <div className="space-y-2 text-sm md:text-base">
                    <h2 className="text-xl font-bold mb-4 text-center">{itemName}</h2>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center gap-4 border-b pb-2">
                            <p>
                                <strong>Generic Name:</strong> {genericName}
                            </p>
                            <p>
                                <strong>Category:</strong> {category}
                            </p>
                        </div>
                        <div className="flex justify-between items-center gap-4 border-b pb-2">
                            <p>
                                <strong>Company:</strong> {company}
                            </p>
                            <p>
                                <strong>Price:</strong> ${unitPrice}
                            </p>
                        </div>
                        <div className="flex justify-between items-center gap-4 border-b pb-2">
                            <p>
                                <strong>Discount:</strong> {discountPercentage}%
                            </p>
                            <p>
                                <strong>Mass Unit:</strong>{massUnit}
                            </p>
                        </div>
                    </div>
                </div>
                <button
                    className="mt-4 w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default MedicineDetailsModal;
