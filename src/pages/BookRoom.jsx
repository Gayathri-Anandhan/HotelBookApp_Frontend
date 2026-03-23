import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";

export default function BookRoom() {
    const location = useLocation();
    const navigate = useNavigate();

    // Get hotel info from router state or localStorage
    const savedState = JSON.parse(localStorage.getItem("bookingHotel") || "{}");
    const stateFromRouter = location.state;

    const hotelId = stateFromRouter?.hotelId || savedState.hotelId;
    const hotelName = stateFromRouter?.hotelName || savedState.hotelName;
    const price = stateFromRouter?.price || savedState.price;
    const checkIn = stateFromRouter?.checkIn || savedState.checkIn;
    const checkOut = stateFromRouter?.checkOut || savedState.checkOut;

    // Redirect to search if info missing
    useEffect(() => {
        if (!hotelId || !checkIn || !checkOut) {
            alert("Hotel or date information missing. Redirecting to search.");
            navigate("/search");
        } else {
            // Ensure localStorage is updated for refresh
            localStorage.setItem(
                "bookingHotel",
                JSON.stringify({ hotelId, hotelName, price, checkIn, checkOut })
            );
        }
    }, [hotelId, hotelName, price, checkIn, checkOut, navigate]);

    const [roomNumber, setRoomNumber] = useState("101"); // default room
    const [totalAmount, setTotalAmount] = useState("");

    const userId = localStorage.getItem("userId") || "1"; // example user

    // Calculate total amount safely
    useEffect(() => {
        if (checkIn && checkOut && price) {
            const nights = Math.ceil(
                (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)
            );
            setTotalAmount(nights > 0 ? price * nights : 0);
        }
    }, [checkIn, checkOut, price]);

    // Booking handler
    // const createBooking = async () => {
    //     if (!totalAmount || totalAmount <= 0) {
    //         alert("Invalid dates or total amount.");
    //         return;
    //     }

    //     try {
    //         const res = await axios.post(
    //             "http://localhost:8080/hotelbook/api/bookings/create",
    //             {
    //                 userId,
    //                 hotelId,
    //                 roomNumber,
    //                 checkInDate: checkIn,
    //                 checkOutDate: checkOut,
    //                 totalAmount,
    //             }
    //         );

    //         // Save for Payment page
    //         localStorage.setItem("bookingId", res.data.id);
    //         localStorage.setItem("totalAmount", totalAmount);

    //         navigate("/payment", {
    //             state: { bookingId: res.data.id, totalAmount },
    //         });
    //     } catch (err) {
    //         alert("Booking failed!");
    //         console.error(err);
    //     }
    // };

    const createBooking = async () => {
        if (!totalAmount || totalAmount <= 0) {
            alert("Invalid dates or total amount.");
            return;
        }

        try {
            const res = await axios.post(
                "http://localhost:8080/hotelbook/api/bookings/create",
                {
                    userId: Number(userId),              // number
                    hotelId: Number(hotelId),            // number
                    roomNumber: Number(roomNumber),      // number
                    checkInDate: new Date(checkIn).toISOString().split("T")[0],   // yyyy-MM-dd
                    checkOutDate: new Date(checkOut).toISOString().split("T")[0],
                    status: "CONFIRMED",                 //  REQUIRED
                    totalAmount: Number(totalAmount)     //  number
                }
            );

            //  Backend returns STRING, not object
            alert(res.data);   // "Booking confirmed!"

            // TEMP (since no ID returned)
            localStorage.setItem("bookingId", "1");
            localStorage.setItem("totalAmount", totalAmount);

            navigate("/payment", {
                state: { bookingId: 1, totalAmount }
            });

        } catch (err) {
            console.error("ERROR:", err.response?.data);

            // Show actual backend message
            alert(err.response?.data || "Booking failed!");
        }
    };

    return (
        <div className="container">
            <h2 className="text-center" style={{ marginBottom: "30px" }}>
                Book Room - {hotelName || "Hotel"}
            </h2>

            <div className="booking-form">
                <div className="form-row">
                    <label>Check-In</label>
                    <input type="date" value={checkIn || ""} readOnly />
                </div>

                <div className="form-row">
                    <label>Check-Out</label>
                    <input type="date" value={checkOut || ""} readOnly />
                </div>

                <div className="form-row">
                    <label>Room Number</label>
                    <select value={roomNumber} onChange={(e) => setRoomNumber(e.target.value)}>
                        <option value="101">101</option>
                        <option value="102">102</option>
                        <option value="103">103</option>
                    </select>
                </div>

                <div className="form-row">
                    <label>Total Amount</label>
                    <input value={totalAmount || ""} readOnly />
                </div>

                <button className="submit-btn" onClick={createBooking}>
                    Confirm Booking
                </button>
            </div>
        </div>
    );
}