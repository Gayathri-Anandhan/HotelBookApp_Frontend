import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function SearchHotels() {
    const navigate = useNavigate();

    const [city, setCity] = useState("");
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [hotels, setHotels] = useState([]);

    const searchHotels = async () => {
        if (!city || !checkIn || !checkOut) {
            alert("Please enter city and dates.");
            return;
        }

        try {
            const res = await axios.get(
                "https://hotelbook-app.onrender.com/hotelbook/api/hotel/search",
                { params: { city, checkIn, checkOut } }
            );
            setHotels(res.data);
        } catch (err) {
            alert("Search failed");
        }
    };

    const handleViewRooms = (hotel) => {
        // Save hotel + date info in localStorage
        localStorage.setItem(
            "bookingHotel",
            JSON.stringify({
                hotelId: hotel.id,
                hotelName: hotel.HotelName,
                price: hotel.price,
                checkIn,
                checkOut,
            })
        );

        // Navigate to BookRoom page
        navigate("/book", {
            state: {
                hotelId: hotel.id,
                hotelName: hotel.HotelName,
                price: hotel.price,
                checkIn,
                checkOut,
            },
        });
    };

    return (
        <div className="container">
            <h2 className="text-center">Search Hotels</h2>

            <div className="search-form">
                <div className="form-row">
                    <label>City</label>
                    <input value={city} onChange={(e) => setCity(e.target.value)} />
                </div>

                <div className="form-row">
                    <label>Check-In</label>
                    <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
                </div>

                <div className="form-row">
                    <label>Check-Out</label>
                    <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
                </div>

                <button onClick={searchHotels}>Search Hotels</button>
            </div>

            <div className="hotels-list">
                {hotels.map((hotel) => (
                    <div className="card" key={hotel.id}>
                        <h4>{hotel.HotelName}</h4>
                        <p>{hotel.city}</p>
                        <p>Price per day: ₹{hotel.price}</p>
                        <button onClick={() => handleViewRooms(hotel)}>View Rooms</button>
                    </div>
                ))}
            </div>
        </div>
    );
}