

import { useState } from "react";
import Swal from "sweetalert2";

import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const MedicineForm = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    itemName: "",
    genericName: "",
    shortDescription: "",
    image: "",
    category: "",
    company: "",
    massUnit: "Mg",
    unitPrice: "",
    discountPercentage: 0,
    quantity: 1, // New quantity field
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      itemName,
      genericName,
      shortDescription,
      image,
      category,
      company,
      massUnit,
      unitPrice,
      quantity,
    } = formData;

    if (
      !itemName ||
      !genericName ||
      !shortDescription ||
      !image ||
      !category ||
      !company ||
      !massUnit ||
      !unitPrice ||
      !quantity
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill in all required fields.",
      });
      return;
    }

    try {
      await axiosSecure.post("/medicine", {
        ...formData,
        seller: {
          name: user?.displayName,
          image: user?.photoURL,
          email: user?.email,
        },
      });
      Swal.fire({
        icon: "success",
        title: "Success",
        text: `Successfully added the medicine.`,
      });
      setIsModalOpen(false);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `Failed to add medicine: ${error.message}`,
      });
    }
  };

  return (
    <div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add Medicine
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-xl font-bold mb-4">Add Medicine</h2>
            <form onSubmit={handleSubmit} className="grid gap-4">
              <div>
                <label className="block font-medium">Item Name</label>
                <input
                  type="text"
                  name="itemName"
                  value={formData.itemName}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  placeholder="Enter item name"
                />
              </div>
              <div>
                <label className="block font-medium">Generic Name</label>
                <input
                  type="text"
                  name="genericName"
                  value={formData.genericName}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  placeholder="Enter generic name"
                />
              </div>
              <div>
                <label className="block font-medium">Short Description</label>
                <textarea
                  name="shortDescription"
                  value={formData.shortDescription}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  placeholder="Enter short description"
                  rows="3"
                />
              </div>
              <div>
                <label className="block font-medium">Image URL</label>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  placeholder="Enter image URL"
                />
              </div>
              <div>
                <label className="block font-medium">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="">Select Category</option>
                  <option value="Tablet">Tablet</option>
                  <option value="Syrup">Syrup</option>
                  <option value="Capsule">Capsule</option>
                  <option value="Injection">Injection</option>
                  <option value="Ointment">Ointment</option>
                  <option value="Supplement">Supplement</option>
                </select>
              </div>
              <div>
                <label className="block font-medium">Company</label>
                <select
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="">Select Company</option>
                  <option value="Square Pharmaceuticals">Square Pharmaceuticals</option>
                  <option value="Beximco Pharmaceuticals">Beximco Pharmaceuticals</option>
                  <option value="Incepta Pharmaceuticals">Incepta Pharmaceuticals</option>
                  <option value="Renata Limited">Renata Limited</option>
                  <option value="ACI Limited">ACI Limited</option>
                </select>
              </div>
              <div>
                <label className="block font-medium">Item Mass Unit</label>
                <select
                  name="massUnit"
                  value={formData.massUnit}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="Mg">Mg</option>
                  <option value="ML">ML</option>
                </select>
              </div>
              <div>
                <label className="block font-medium">Per Unit Price</label>
                <input
                  type="number"
                  name="unitPrice"
                  value={formData.unitPrice}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  placeholder="Enter per unit price"
                  min="0"
                />
              </div>
              <div>
                <label className="block font-medium">Discount Percentage</label>
                <input
                  type="number"
                  name="discountPercentage"
                  value={formData.discountPercentage}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  placeholder="Enter discount percentage"
                  min="0"
                />
              </div>
              {/* <div>
                <label className="block font-medium">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  placeholder="Enter quantity"
                  min="1"
                />
              </div> */}
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Add Medicine
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicineForm;
