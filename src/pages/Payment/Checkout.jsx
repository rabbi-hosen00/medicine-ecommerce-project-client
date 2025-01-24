


// import {  useParams } from "react-router-dom";

import { useLoaderData } from "react-router-dom";

const Checkout = () => {
    // Get the data passed by the loader
    // const { checkoutId } = useParams();
    const checkoutData = useLoaderData();


    console.log("Checkout data:",checkoutData );

    return (
        <>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. At natus modi ea explicabo debitis commodi? Perferendis reprehenderit recusandae, distinctio quas similique, corrupti id libero necessitatibus soluta iusto harum praesentium nostrum?
        </>
    );
};

export default Checkout;


// import  { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';

// const Checkout = () => {
//   const { checkoutId } = useParams();  // Extracts the checkoutId from the URL
//   const [checkoutData, setCheckoutData] = useState(null);


//   console.log(checkoutId)

//   useEffect(() => {
//     // Fetch checkout data using the checkoutId
//     const fetchCheckoutData = async () => {
//       try {
//         const response = await fetch(`http://localhost:5000/checkout/${checkoutId}`); // Make sure to adjust the API endpoint URL to match your backend
//         const data = await response.json();
//         setCheckoutData(data);
//       } catch (error) {
//         console.error("Error fetching checkout data:", error);
//       }
//     };

//     if (checkoutId) {
//       fetchCheckoutData();
//     }
//   }, [checkoutId]);  // The effect will run when the checkoutId changes

//   // Render the checkout data if available
//   return (
//     <div>
//       {checkoutData ? (
//         <div>
//           <h1>{checkoutData.name}</h1>
//           <p>Company: {checkoutData.company}</p>
//           <p>Quantity: {checkoutData.quantity}</p>
//           <p>Total Price: {checkoutData.totalPrice ? checkoutData.totalPrice : 'Not available'}</p>
//         </div>
//       ) : (
//         <p>Loading checkout data...</p>
//       )}
//     </div>
//   );
// };

// export default Checkout;

