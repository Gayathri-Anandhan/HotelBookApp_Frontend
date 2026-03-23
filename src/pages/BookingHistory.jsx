import React, { useEffect, useState } from "react";
import axios from "axios";

export default function BookingHistory() {
    const [bookings, setBookings] = useState([]);
    const userId = localStorage.getItem("userId") || "1";

    useEffect(() => {
        axios.get(`https://hotelbook-app.onrender.com/hotelbook/api/bookings/history/${userId}`)
            .then((res) => setBookings(res.data))
            .catch(() => alert("Failed to load bookings"));
    }, [userId]);

    const cancelBooking = (id) => {
        axios.put(`https://hotelbook-app.onrender.com/hotelbook/api/bookings/cancel/${id}`)
            .then(() => setBookings(bookings.map(b => b.id === id ? { ...b, status: "CANCELLED" } : b)))
            .catch(() => alert("Failed to cancel"));
    };

    return (
        <div className="container">
            <h2 className="text-center">Booking History</h2>
            {bookings.map(b => (
                <div className="card" key={b.id}>
                    <p>Hotel: {b.hotelName}</p>
                    <p>Room: {b.roomNumber}</p>
                    <p>Check-In: {b.checkInDate}</p>
                    <p>Check-Out: {b.checkOutDate}</p>
                    <p>Status: {b.status}</p>
                    {b.status !== "CANCELLED" && <button onClick={() => cancelBooking(b.id)}>Cancel</button>}
                </div>
            ))}
        </div>
    );
}