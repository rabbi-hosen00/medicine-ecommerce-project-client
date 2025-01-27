import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import useCard from "../Shop/useCard";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";




const CheckoutFrom = () => {
    const [error, setError] = useState("")
    const [clientSecret, setClientSectet] = useState("")
    const [transactionId, setTransactionId] = useState('')
    const checkoutData = useLoaderData();
    const navigate = useNavigate()
    const { user } = useAuth()
    const [cart, refetch] = useCard()
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure()
    const totalPrice = checkoutData.totalPrice;
    console.log("checkout data", checkoutData, "total price", totalPrice)

    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure.post("/create-payment-intent", { price: totalPrice })
                .then(res => {
                    console.log(res.data.clientSecret)
                    setClientSectet(res.data.clientSecret);
                })
        }
    }, [axiosSecure, totalPrice])


    const handleSubmit = async (event) => {
        event.preventDefault()

        if (!stripe || !elements) {
            return
        }
        const card = elements.getElement(CardElement);
        if (card === null) {
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if (error) {
            console.log("payment error", error);
            setError(error.message)
        }
        else {
            console.log("payment method", paymentMethod)
            setError("")
        }

        // confirm card payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || "anonymous",
                    name: user?.displayName || "anonymous",
                }
            }
        })

        if (confirmError) {
            console.log("confirm error")
        }
        else {
            console.log("payment intent", paymentIntent)
            if (paymentIntent.status === 'succeeded') {
                console.log('transaction id', paymentIntent.id)
                setTransactionId(paymentIntent.id)

                // now save the payment in the database
                const payment = {
                    email: user.email,
                    name: user.displayName,
                    image:checkoutData.image,
                    price: totalPrice,
                    itemName: checkoutData.name,
                    transactionId: paymentIntent.id,
                    date: new Date(),
                    cartIds: cart.map(item => item._id),
                    menuItemIds: cart.map(item => item.menuId),
                    status: "pending"
                }

                const res = await axiosSecure.post('/payments', payment)
                console.log("payment save", res.data)
                refetch()
                if (res.data?.paymentResult?.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Payment successfull",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate("/invoice")
                }
            }
        }

    }


    return (
        <>
         <Helmet>
                <title> Medicine | Payment page</title>
            </Helmet>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className="w-full bg-blue-500 rounded-md p-1 mt-5" type="submit"
                    disabled={!stripe || !clientSecret}>
                    ${checkoutData.totalPrice} Pay
                </button>
                <p className="text-red-500">{error}</p>
                {transactionId && <p className="text-green-500">
                    Your transaction id: {transactionId}
                </p>}
            </form>
        </>
    );

};

export default CheckoutFrom;

