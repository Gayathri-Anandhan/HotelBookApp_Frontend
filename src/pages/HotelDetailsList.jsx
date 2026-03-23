import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trash2, Edit2Icon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/24/solid";

export default function Dashboard() {

    const [hotels, setHotels] = useState([]);

    const navigate = useNavigate();

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this hotel?")) {
            try {
                await axios.delete(`http://localhost:8080/hotelbook/api/hotel/deleteHotels?id=${id}`);

                setHotels((prev) => prev.filter((hotel) => hotel.id !== id));

                alert("Hotel deleted successfully!");
            } catch (err) {
                console.error("Delete Failed", err);
            }
        }
    };

    const handleEdit = (id) => {
        navigate(`/add-hotel/${id}`);
    };

    const [filters, setFilters] = useState({
        minPrice: "",
        maxPrice: ""
    });

    const handleFilterChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
    };

    const filteredHotels = hotels.filter((hotel) => {

        const matchesMinPrice = filters.minPrice
            ? hotel.price >= parseFloat(filters.minPrice)
            : true;

        const matchesMaxPrice = filters.maxPrice
            ? hotel.price <= parseFloat(filters.maxPrice)
            : true;

        return matchesMinPrice && matchesMaxPrice;
    });

    useEffect(() => {
        axios
            .get("http://localhost:8080/hotelbook/api/hotel/allhotels")
            .then((res) => {
                console.log("API DATA:", res.data);
                setHotels(res.data);
            })
            .catch((err) => console.log("Error fetching hotels", err));
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#f5f1e8] to-[#e9ecef] p-10">
            <div className="flex justify-between items-center mb-10">

                <div>
                    <h1 className="text-4xl font-bold text-gray-800">
                        Hotel Admin Dashboard
                    </h1>
                    <p className="text-gray-500">
                        Manage hotels, prices and availability
                    </p>
                </div>

                <button
                    onClick={() => navigate("/add-hotel")}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-md transition"
                >
                    + Add New Hotel
                </button>
            </div>
            {/* <div className="flex justify-end">
                <button
                    onClick={() => navigate("/history")}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-md transition"
                >
                    Booking History
                </button>
            </div> */}

            {/* Filter Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-10 border">

                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                    Filter Hotels
                </h3>

                <div className="flex gap-6 items-end">

                    <div className="flex flex-col w-48">
                        <label className="text-sm text-gray-500 mb-1">
                            Minimum Price
                        </label>
                        <input
                            type="number"
                            name="minPrice"
                            value={filters.minPrice}
                            onChange={handleFilterChange}
                            placeholder="₹ Minimum"
                            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div className="flex flex-col w-48">
                        <label className="text-sm text-gray-500 mb-1">
                            Maximum Price
                        </label>
                        <input
                            type="number"
                            name="maxPrice"
                            value={filters.maxPrice}
                            onChange={handleFilterChange}
                            placeholder="₹ Maximum"
                            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <button
                        onClick={() => setFilters({ minPrice: "", maxPrice: "" })}
                        className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-2 rounded-lg"
                    >
                        Reset
                    </button>

                </div>
            </div>


            {/* Hotels Table */}
            <div className="bg-white rounded-2xl shadow-lg border overflow-hidden">

                <div className="bg-white rounded-2xl shadow-lg border p-6">

                    {/* Hotels Table */}

                    <div className="flex justify-center">

                        <div className="bg-white rounded-2xl shadow-lg border p-8 w-[90%]">
                            <div className="flex justify-center mt-8">
                                <div className="bg-white rounded-xl shadow-lg p-6 w-[95%]">
                                    <h3 className="text-lg font-semibold mb-4 text-center">
                                        Hotels List
                                    </h3>

                                    <div className="overflow-x-auto">

                                        {/* <table className="w-full border border-black border-collapse"> */}
                                        <table className="table table-striped table-bordered">
                                            <thead className="table-dark">
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Hotel Name</th>
                                                    <th>City</th>
                                                    <th>Address</th>
                                                    <th>Description</th>
                                                    <th>Rating</th>
                                                    <th>Price</th>
                                                    <th>Image</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>

                                            <tbody>

                                                {filteredHotels.length > 0 ? (

                                                    filteredHotels.map((hotel) => (

                                                        <tr key={hotel.id}>

                                                            <td>{hotel.id}</td>
                                                            <td>{hotel.hotelName}</td>
                                                            <td>{hotel.city}</td>
                                                            <td>{hotel.address}</td>
                                                            <td>{hotel.description}</td>
                                                            <td>{hotel.rating}</td>
                                                            <td>{hotel.price}</td>

                                                            <td>
                                                                <img
                                                                    src={hotel.image_url}
                                                                    alt="hotel"
                                                                    width="60"
                                                                    height="40"
                                                                />
                                                            </td>

                                                            <td className="flex">

                                                                <Edit2Icon
                                                                    size={20}
                                                                    className="me-2 text-primary"
                                                                    style={{ cursor: "pointer" }}
                                                                    onClick={() => handleEdit(hotel.id)}
                                                                />

                                                                <Trash2
                                                                    size={20}
                                                                    className="me-2 text-danger"
                                                                    style={{ cursor: "pointer" }}
                                                                    onClick={() => handleDelete(hotel.id)}
                                                                />

                                                            </td>

                                                        </tr>

                                                    ))

                                                ) : (

                                                    <tr>
                                                        <td colSpan="9" className="text-center">
                                                            No hotels found
                                                        </td>
                                                    </tr>

                                                )}

                                            </tbody>
                                        </table>

                                        {/* </table> */}

                                    </div>
                                    ```
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}