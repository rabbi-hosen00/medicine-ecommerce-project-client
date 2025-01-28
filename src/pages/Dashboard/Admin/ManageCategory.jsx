

// import { useState } from "react";
// import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
// import useCategory from "../../../hooks/useCategory";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import Swal from "sweetalert2";

// const ManageCategory = () => {
//   const axiosSecure = useAxiosSecure()
//   const [categories, refetch, isLoading] = useCategory();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editCategory, setEditCategory] = useState(null); // State for holding the category being edited

//   if (isLoading) {
//     return <LoadingSpinner />;
//   }



// const handleDelete = (id) => {
//     Swal.fire({
//         title: "Are you sure?",
//         text: "You won't be able to revert this!",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonColor: "#3085d6",
//         cancelButtonColor: "#d33",
//         confirmButtonText: "Yes, delete it!"
//     }).then((result) => {
//         if (result.isConfirmed) {
//             axiosSecure.delete(`/category/${id}`)
//                 .then((res) => {
//                     if (res.data.deletedCount > 0) {
//                         refetch();
//                         Swal.fire({
//                             title: "Deleted!",
//                             text: "Your category has been deleted.",
//                             icon: "success",
//                         });

//                         // Trigger the refetch function to refresh data
                        
//                     }
//                 })
//                 .catch((error) => {
//                     console.error("Error deleting category:", error);
//                     Swal.fire({
//                         title: "Error!",
//                         text: "Failed to delete the category. Please try again.",
//                         icon: "error",
//                     });
//                 });
//         }
//     });
// };




//   const handleEdit = (category) => {
//     setEditCategory(category); // Set the category to be edited
//     setIsModalOpen(true); // Open the modal for editing
//   };



//   const handleAddCategory = async(e) => {
//     e.preventDefault();
  
//     const category = e.target.category.value;
//     const image = e.target.image.value;
//     const quantity = e.target.quantity.value;

//     const categoryItem = {
//         category,
//         image,
//         quantity
//     }

//     console.log(categoryItem);
//     // Add add-category logic here


//      try {
//           await axiosSecure.post("/category", categoryItem);
//           refetch()
//           Swal.fire({
//             icon: "success",
//             title: "Success",
//             text: `Successfully added the medicine${categoryItem.name}.`,
//           });
//           setIsModalOpen(false);
//         } catch (error) {
//           Swal.fire({
//             icon: "error",
//             title: "Error",
//             text: `Failed to add medicine: ${error.message}`,
//           });
//         }

//     setIsModalOpen(false);
//   };

//   const handleUpdateCategory = (event) => {
//     event.preventDefault();
//     console.log("Updating category...");
//     // Add update category logic here (e.g., update category in the state or database)
//     setIsModalOpen(false);
//   };


  


//   return (
//     <div className="p-6">
//       <h1 className="text-3xl text-center text-orange-600 font-semibold mb-4">Manage Categories</h1>

//       <div className="flex justify-center overflow-x-auto">
//         <table className="min-w-[70%] bg-white rounded-lg shadow-lg">
//           <thead className="bg-gradient-to-r from-indigo-300 to-purple-300 text-white">
//             <tr>
//               <th className="py-3 px-6 text-left">Category</th>
//               <th className="py-3 px-6 text-left">Image</th>
//               <th className="py-3 px-6 text-left">Quantity</th>
//               <th className="py-3 px-6 text-center">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {categories.map((category) => (
//               <tr key={category.id} className="border-t hover:bg-gray-100">
//                 <td className="py-3 px-6">{category.category}</td>
//                 <td className="py-3 px-6">
//                   <img
//                     src={category.imageURL}
//                     alt={category.category}
//                     className="w-12 h-12 object-cover rounded-md"
//                   />
//                 </td>
//                 <td className="py-3 px-6">{category.quantity}</td>
//                 <td className="py-3 px-6 text-center">
//                   <button
//                     className="mr-2 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
//                     onClick={() => handleEdit(category)}
//                   >
//                     Edit
//                   </button>
//                   <button
//                     className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
//                     onClick={() => handleDelete(category._id)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div className="flex justify-center mt-6">
//         <button
//           className="px-14 py-3 bg-orange-500 text-white rounded-md hover:bg-green-700"
//           onClick={() => setIsModalOpen(true)}
//         >
//           Add Category
//         </button>
//       </div>

//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:max-w-md md:max-w-lg lg:max-w-xl">
//             <h2 className="text-xl font-bold mb-4">
//               {editCategory ? "Edit Category" : "Add New Category"}
//             </h2>
//             <form onSubmit={editCategory ? handleUpdateCategory : handleAddCategory}>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium mb-1">Category Name</label>
//                 <input
//                   type="text"
//                   required
//                   name="category"
//                   defaultValue={editCategory?.category || ""}
//                   className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-500"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium mb-1">Category Image URL</label>
//                 <input
//                   type="url"
//                   required
//                   name="image"
//                   defaultValue={editCategory?.imageURL || ""}
//                   className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-500"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium mb-1">Quantity</label>
//                 <input
//                   type="number"
//                   required
//                   min="1"
//                   name="quantity"
//                   defaultValue={editCategory?.quantity || ""}
//                   className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-500"
//                 />
//               </div>
//               <div className="flex justify-end">
//                 <button
//                   type="button"
//                   className="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
//                   onClick={() => setIsModalOpen(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//                 >
//                   {editCategory ? "Update" : "Add"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ManageCategory;











// import { useState } from "react";
// import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
// import useCategory from "../../../hooks/useCategory";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import Swal from "sweetalert2";

// const ManageCategory = () => {
//   const axiosSecure = useAxiosSecure();
//   const [categories, refetch, isLoading] = useCategory();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editCategory, setEditCategory] = useState(null); // State for holding the category being edited

//   if (isLoading) {
//     return <LoadingSpinner />;
//   }

//   const handleDelete = (id) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         axiosSecure
//           .delete(`/category/${id}`)
//           .then((res) => {
//             if (res.data.deletedCount > 0) {
//               refetch();
//               Swal.fire({
//                 title: "Deleted!",
//                 text: "Your category has been deleted.",
//                 icon: "success",
//               });
//             }
//           })
//           .catch((error) => {
//             console.error("Error deleting category:", error);
//             Swal.fire({
//               title: "Error!",
//               text: "Failed to delete the category. Please try again.",
//               icon: "error",
//             });
//           });
//       }
//     });
//   };

//   const handleEdit = (category) => {
//     setEditCategory(category); // Set the category to be edited
//     setIsModalOpen(true); // Open the modal for editing
//   };

//   const handleAddCategory = async (e) => {
//     e.preventDefault();

//     const category = e.target.category.value;
//     const image = e.target.image.value;
//     const quantity = e.target.quantity.value;

//     const categoryItem = {
//       category,
//       image,
//       quantity,
//     };

//     try {
//       await axiosSecure.post("/category", categoryItem);
//       refetch();
//       Swal.fire({
//         icon: "success",
//         title: "Success",
//         text: `Successfully added the category: ${categoryItem.category}.`,
//       });
//       setIsModalOpen(false);
//     } catch (error) {
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: `Failed to add category: ${error.message}`,
//       });
//     }
//   };

  

//   const openAddCategoryModal = () => {
//     setEditCategory(null); // Reset editCategory to null for adding a new category
//     setIsModalOpen(true); // Open the modal
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl text-center text-orange-600 font-semibold mb-4">
//         Manage Categories
//       </h1>

//       <div className="flex justify-center overflow-x-auto">
//         <table className="min-w-[70%] bg-white rounded-lg shadow-lg">
//           <thead className="bg-gradient-to-r from-indigo-300 to-purple-300 text-white">
//             <tr>
//               <th className="py-3 px-6 text-left">Category</th>
//               <th className="py-3 px-6 text-left">Image</th>
//               <th className="py-3 px-6 text-left">Quantity</th>
//               <th className="py-3 px-6 text-center">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {categories.map((category) => (
//               <tr key={category._id} className="border-t hover:bg-gray-100">
//                 <td className="py-3 px-6">{category.category}</td>
//                 <td className="py-3 px-6">
//                   <img
//                     src={category.imageURL}
//                     alt={category.category}
//                     className="w-12 h-12 object-cover rounded-md"
//                   />
//                 </td>
//                 <td className="py-3 px-6">{category.quantity}</td>
//                 <td className="py-3 px-6 text-center">
//                   <button
//                     className="mr-2 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
//                     onClick={() => handleEdit(category)}
//                   >
//                     Edit
//                   </button>
//                   <button
//                     className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
//                     onClick={() => handleDelete(category._id)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div className="flex justify-center mt-6">
//         <button
//           className="px-14 py-3 bg-orange-500 text-white rounded-md hover:bg-green-700"
//           onClick={openAddCategoryModal}
//         >
//           Add Category
//         </button>
//       </div>

//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:max-w-md md:max-w-lg lg:max-w-xl">
//             <h2 className="text-xl font-bold mb-4">
//               {editCategory ? "Edit Category" : "Add New Category"}
//             </h2>
//             <form onSubmit={editCategory ? handleUpdateCategory : handleAddCategory}>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium mb-1">Category Name</label>
//                 <input
//                   type="text"
//                   required
//                   name="category"
//                   defaultValue={editCategory?.category || ""}
//                   className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-500"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium mb-1">Category Image URL</label>
//                 <input
//                   type="url"
//                   required
//                   name="image"
//                   defaultValue={editCategory?.imageURL || ""}
//                   className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-500"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium mb-1">Quantity</label>
//                 <input
//                   type="number"
//                   required
//                   min="1"
//                   name="quantity"
//                   defaultValue={editCategory?.quantity || ""}
//                   className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-500"
//                 />
//               </div>
//               <div className="flex justify-end">
//                 <button
//                   type="button"
//                   className="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
//                   onClick={() => setIsModalOpen(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//                 >
//                   {editCategory ? "Update" : "Add"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ManageCategory;













import { useState } from "react";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useCategory from "../../../hooks/useCategory";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageCategory = () => {
  const axiosSecure = useAxiosSecure();
  const [categories, refetch, isLoading] = useCategory();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editCategory, setEditCategory] = useState(null);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/category/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Your category has been deleted.",
                icon: "success",
              });
            }
          })
          .catch((error) => {
            console.error("Error deleting category:", error);
            Swal.fire({
              title: "Error!",
              text: "Failed to delete the category. Please try again.",
              icon: "error",
            });
          });
      }
    });
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    const category = e.target.category.value;
    const image = e.target.image.value;
    const quantity = e.target.quantity.value;

    const categoryItem = { category, image, quantity };

    try {
      await axiosSecure.post("/category", categoryItem);
      refetch();
      Swal.fire({
        icon: "success",
        title: "Success",
        text: `Successfully added the category: ${categoryItem.category}.`,
      });
      setIsModalOpen(false);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `Failed to add category: ${error.message}`,
      });
    }
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    
    const updatedCategory = {
      category: e.target.category.value,  // 'category' -> 'description' in the backend
      image: e.target.image.value,
      quantity: e.target.quantity.value,  // 'quantity' -> 'language' in the backend
    };
    
    try {
      const response = await axiosSecure.put(`/category/${editCategory._id}`, updatedCategory);
      if (response.data.modifiedCount > 0) {
        refetch()
        Swal.fire({
          icon: "success",
          title: "Updated",
          text: `Successfully updated the category.`,
        });
        refetch();
        setIsModalOpen(true);
      } 
    } finally  {
      setIsModalOpen(false);
      refetch();
    }
  };
  

  const openAddCategoryModal = () => {
    setEditCategory(null); // Reset for adding new category
    setIsModalOpen(true); // Open modal
  };

  const openUpdateCategoryModal = (category) => {
    setEditCategory(category); // Set category for editing
    setIsModalOpen(true); // Open modal
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl text-center text-orange-600 font-semibold mb-4">
        Manage Categories
      </h1>

      <div className="flex justify-center overflow-x-auto">
        <table className="min-w-[70%] bg-white rounded-lg shadow-lg">
          <thead className="bg-gradient-to-r from-indigo-300 to-purple-300 text-white">
            <tr>
              <th className="py-3 px-6 text-left">Category</th>
              <th className="py-3 px-6 text-left">Image</th>
              <th className="py-3 px-6 text-left">Quantity</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category._id} className="border-t hover:bg-gray-100">
                <td className="py-3 px-6">{category.category}</td>
                <td className="py-3 px-6">
                  <img
                    src={category.imageURL}
                    alt={category.category}
                    className="w-12 h-12 object-cover rounded-md"
                  />
                </td>
                <td className="py-3 px-6">{category.quantity}</td>
                <td className="py-3 px-6 text-center">
                  <button
                    className="mr-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    onClick={() => openUpdateCategoryModal(category)}
                  >
                    Update
                  </button>
                  <button
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    onClick={() => handleDelete(category._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-6">
        <button
          className="px-14 py-3 bg-orange-500 text-white rounded-md hover:bg-green-700"
          onClick={openAddCategoryModal}
        >
          Add Category
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:max-w-md md:max-w-lg lg:max-w-xl">
            <h2 className="text-xl font-bold mb-4">
              {editCategory ? "Update Category" : "Add New Category"}
            </h2>
            <form
              onSubmit={editCategory ? handleUpdateCategory : handleAddCategory}
            >
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Category Name
                </label>
                <input
                  type="text"
                  required
                  name="category"
                  defaultValue={editCategory?.category || ""}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Category Image URL
                </label>
                <input
                  type="url"
                  required
                  name="image"
                  defaultValue={editCategory?.imageURL || ""}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  name="quantity"
                  defaultValue={editCategory?.quantity || ""}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  {editCategory ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCategory;
