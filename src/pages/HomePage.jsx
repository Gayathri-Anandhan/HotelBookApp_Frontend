import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function HomePage() {

    const navigate = useNavigate();

    return (

        <div className="home">

            {/* LOGIN ICON */}

            <div className="top-bar">
                <span
                    className="login-icon"
                    onClick={() => navigate("/login")}
                >
                    👤
                </span>
            </div>


            {/* BOOTSTRAP CAROUSEL */}

            <div
                id="hotelCarousel"
                className="carousel slide"
                data-bs-ride="carousel"
                data-bs-interval="3000"
            >

                {/* Indicators */}

                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#hotelCarousel" data-bs-slide-to="0" className="active"></button>
                    <button type="button" data-bs-target="#hotelCarousel" data-bs-slide-to="1"></button>
                    <button type="button" data-bs-target="#hotelCarousel" data-bs-slide-to="2"></button>
                    <button type="button" data-bs-target="#hotelCarousel" data-bs-slide-to="3"></button>
                    <button type="button" data-bs-target="#hotelCarousel" data-bs-slide-to="4"></button>
                    <button type="button" data-bs-target="#hotelCarousel" data-bs-slide-to="5"></button>
                </div>


                <div className="carousel-inner">

                    <div className="carousel-item active">
                        <img
                            src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1400&q=80"
                            className="d-block w-100 carousel-img"
                            alt="Luxury Hotel"
                        />
                    </div>

                    <div className="carousel-item">
                        <img
                            src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1400&q=80"
                            className="d-block w-100 carousel-img"
                            alt="Hotel Interior"
                        />
                    </div>

                    <div className="carousel-item">
                        <img
                            src="https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1400&q=80"
                            className="d-block w-100 carousel-img"
                            alt="Luxury Bed"
                        />
                    </div>

                    <div className="carousel-item">
                        <img
                            src="https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1400&q=80"
                            className="d-block w-100 carousel-img"
                            alt="Resort View"
                        />
                    </div>

                    <div className="carousel-item">
                        <img
                            src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1400&q=80"
                            className="d-block w-100 carousel-img"
                            alt="Hotel Lobby"
                        />
                    </div>

                </div>


                {/* CONTROLS */}

                <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#hotelCarousel"
                    data-bs-slide="prev"
                >
                    <span className="carousel-control-prev-icon"></span>
                </button>

                <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#hotelCarousel"
                    data-bs-slide="next"
                >
                    <span className="carousel-control-next-icon"></span>
                </button>

            </div>


            {/* ACTION CARDS */}

            <div className="card-container">

                <div
                    className="card"
                    onClick={() => navigate("/search")}
                >
                    <img
                        src="https://tse1.mm.bing.net/th/id/OIP.JazUt7-UbQOn9hiHEyovpQHaEO?pid=Api&P=0&h=180"
                        alt="Search Hotels"
                    />
                    <h3>Search Hotels</h3>
                </div>

                <div
                    className="card"
                    onClick={() => navigate("/book")}
                >
                    <img
                        src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80"
                        alt="Book Room"
                    />
                    <h3>Book Room</h3>
                </div>

                <div
                    className="card"
                    onClick={() => navigate("/payment")}
                >
                    <img
                        src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80"
                        alt="Payment"
                    />
                    <h3>Payment</h3>
                </div>

                <div
                    className="card"
                    onClick={() => navigate("/HotelDetailsList")}
                >
                    <img
                        src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80"
                        alt="Admin Dashboard"
                    />
                    <h3>Dashboard</h3>
                </div>

                <div className="card" onClick={() => navigate("/history")}>
                    <img src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80" />
                    <h3>Booking History</h3>
                </div>

            </div>

        </div>

    );

}

export default HomePage;