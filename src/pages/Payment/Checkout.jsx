

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";


import CheckoutFrom from "./CheckoutFrom";


// TODO: add publishable key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Checkout = () => {
 

 
  return (
    <div className="max-w-2xl mx-auto  mt-32 p-5 bg-white rounded-2xl shadow-xl">
      <h2 className="text-xl text-center text-orange-400 font-semibold mb-4 mt-6">Complete Payment</h2>
      
      <div>
        <Elements stripe={stripePromise}>
            <CheckoutFrom></CheckoutFrom>
        </Elements>
      </div>
    </div>
  );
};

export default Checkout;

