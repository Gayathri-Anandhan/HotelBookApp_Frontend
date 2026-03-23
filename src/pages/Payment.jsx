import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Payment() {
    const location = useLocation();
    const navigate = useNavigate();

    const bookingId = location.state?.bookingId || localStorage.getItem("bookingId");
    const totalAmount = location.state?.totalAmount || localStorage.getItem("totalAmount");

    useEffect(() => {
        if (!bookingId || !totalAmount) {
            alert("No booking info. Redirecting to search.");
            navigate("/search");
        }
    }, [bookingId, totalAmount, navigate]);

    const payNow = async () => {
        try {
            // 1️⃣ Create order in backend (Razorpay order ID)
            const res = await axios.post("http://localhost:8080/hotelbook/api/payments/create-order", null, {
                params: {
                    bookingId: Number(bookingId),
                    amount: Number(totalAmount),
                    status: "PENDING", // mark pending until actual payment
                },
            });

            const { razorpayOrderId, amount } = res.data; // backend must return Razorpay order ID

            // 2️⃣ Open Razorpay checkout
            const options = {
                key: "rzp_test_SP6YnALebZmwaG", // Replace with your key
                amount: amount * 100, // in paise
                currency: "INR",
                name: "Hotel Booking",
                description: `Booking ID: ${bookingId}`,
                order_id: razorpayOrderId,
                handler: async function (response) {
                    // 3️⃣ On success, send payment details to backend
                    await axios.post("http://localhost:8080/hotelbook/api/payments/verify", {
                        bookingId: Number(bookingId),
                        razorpayPaymentId: response.razorpay_payment_id,
                        razorpayOrderId: response.razorpay_order_id,
                        razorpaySignature: response.razorpay_signature,
                        amount: Number(totalAmount),
                    });

                    alert("Payment Successful!");
                    localStorage.removeItem("bookingId");
                    localStorage.removeItem("totalAmount");
                    navigate("/history");
                },
                prefill: {
                    name: "John Doe",
                    email: "john@example.com",
                },
                theme: { color: "#3399cc" },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (err) {
            console.error(err);
            alert("Payment failed!");
        }
    };

    return (
        <div className="container">
            <h2 className="text-center">Payment</h2>
            <p>Total Amount: ₹{totalAmount}</p>
            <button onClick={payNow}>Pay Now</button>
        </div>
    );
}