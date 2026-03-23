import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { ArrowBigLeftIcon } from "lucide-react";

export default function AddHotel() {
    const [formData, setFormData] = useState({
        HotelName: "",
        description: "",
        city: "",
        address: "",
        rating: "",
        price: "",
        imageUrl: "",
    });
    const [file, setFile] = useState(null);
    const { id } = useParams();
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     try {
    //         const formDataObj = new FormData();

    //         const hotelObj = {
    //             id: Number(id),
    //             HotelName: formData.HotelName,
    //             description: formData.description,
    //             city: formData.city,
    //             address: formData.address,
    //             rating: formData.rating,
    //             price: Number(formData.price),
    //         };

    //         if (id) {
    //             formDataObj.append("hotel", JSON.stringify(hotelObj));
    //             if (file) formDataObj.append("file", file);

    //             await axios.put(
    //                 `http://localhost:8080/hotelbook/api/hotel/updatehotel?id=${id}`,
    //                 formDataObj
    //             );
    //             setMessage("Hotel Updated Successfully");
    //         } else {
    //             formDataObj.append("hotel", JSON.stringify(hotelObj));
    //             if (file) formDataObj.append("file", file);

    //             await axios.post(
    //                 `http://localhost:8080/hotelbook/api/hotel/saveHotel`,
    //                 formDataObj
    //             );
    //             setMessage("Hotel Added Successfully");
    //         }
    //     } catch (error) {
    //         console.error(error);
    //         setErrorMessage("Failed to save hotel");
    //     }
    // };
    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     try {
    //         const hotelObj = {
    //             id: id ? Number(id) : 0,
    //             hotelName: formData.HotelName,
    //             description: formData.description,
    //             city: formData.city,
    //             address: formData.address,
    //             rating: Number(formData.rating),
    //             price: Number(formData.price),
    //         };

    //         if (id) {
    //             const formDataObj = new FormData();
    //             formDataObj.append("Hotel", JSON.stringify(hotelObj));
    //             if (file) formDataObj.append("file", file);

    //             await axios.put(
    //                 `https://hotelbook-app.onrender.com/hotelbook/api/hotel/updatehotel?id=${id}`,
    //                 formDataObj
    //             );
    //             setMessage("Hotel Updated Successfully");
    //         } else {
    //             const formDataObj = new FormData();
    //             formDataObj.append("Hotel", JSON.stringify(hotelObj));
    //             if (file) formDataObj.append("file", file);

    //             await axios.post(
    //                 `https://hotelbook-app.onrender.com/hotelbook/api/hotel/saveHotel`,
    //                 formDataObj
    //             );
    //             setMessage("Hotel Added Successfully");
    //         }
    //     } catch (error) {
    //         console.error(error);
    //         console.log('Error response:', error.response?.data);
    //         setErrorMessage("Failed to save hotel");
    //     }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const hotelObj = {
                id: id ? Number(id) : 0,
                hotelName: formData.HotelName,
                description: formData.description,
                city: formData.city,
                address: formData.address,
                rating: Number(formData.rating),
                price: Number(formData.price),
            };

            const formDataObj = new FormData();
            //  Match the backend parameter name exactly
            formDataObj.append("hotel", JSON.stringify(hotelObj));
            if (file) formDataObj.append("file", file);

            if (id) {
                await axios.put(
                    `https://hotelbook-app.onrender.com/hotelbook/api/hotel/updatehotel?id=${id}`,
                    formDataObj
                );
                setMessage("Hotel Updated Successfully");
            } else {
                await axios.post(
                    `https://hotelbook-app.onrender.com/hotelbook/api/hotel/saveHotel`,
                    formDataObj
                );
                setMessage("Hotel Added Successfully");
            }
        } catch (error) {
            console.error(error);
            console.log("Error response:", error.response?.data);
            setErrorMessage("Failed to save hotel");
        }
    };
    useEffect(() => {
        if (id) {
            axios
                .get(`https://hotelbook-app.onrender.com/hotelbook/api/hotel/viewhotels?id=${id}`)
                .then((res) => {
                    const data = res.data;
                    setFormData({
                        HotelName: data.HotelName || "",
                        description: data.description || "",
                        city: data.city || "",
                        address: data.address || "",
                        rating: data.rating || "",
                        price: data.price || "",
                        // imageUrl: fullImageUrl,
                        imageUrl: res.data.imageUrl || "",
                    });
                })
                .catch((err) => {
                    console.error("Error fetching hotel", err);
                    setErrorMessage("Failed to load hotel details");
                });
        }
    }, [id]);

    return (
        <form onSubmit={handleSubmit}>
            <div className="bg-[#F5F1E8] p-15 rounded-3xl text-neutral-800 shadow-sm mb-10 border border-neutral-200">
                <div className="mb-4 flex items-center gap-4">
                    <Link
                        className="flex items-center gap-2 text-neutral-800 hover:text-neutral-600"
                        to="/HotelDetailsList"
                    >
                        <ArrowBigLeftIcon size={20} /> Back to Dashboard
                    </Link>
                </div>
                <br />
                <div className="bg-white p-10 rounded-3xl text-neutral-800 shadow-sm mb-10 border border-neutral-200">
                    <div className="container my-5">

                        <div className="mb-4 flex items-center gap-4">
                            <label
                                className="w-1/4 text-sm font-medium text-neutral-700 mb-2"
                                htmlFor="HotelName"
                            >
                                Hotel Name
                            </label>
                            <input
                                className="w-3/4 px-4 py-3 rounded-xl border border-neutral-300 focus:outline-gray focus:ring-2 focus:ring-neutral-800 focus:border-neutral-800 transition bg-white"
                                type="text"
                                name="HotelName"
                                id="HotelName"
                                value={formData.HotelName}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-4 flex items-center gap-4">
                            <label
                                className="w-1/4 text-sm font-medium text-neutral-700 mb-2"
                                htmlFor="description"
                            >
                                Description
                            </label>
                            <input
                                className="w-3/4 px-4 py-3 rounded-xl border border-neutral-300 focus:outline-gray focus:ring-2 focus:ring-neutral-800 focus:border-neutral-800 transition bg-white"
                                type="text"
                                name="description"
                                id="description"
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-4 flex items-center gap-4">
                            <label
                                className="w-1/4 text-sm font-medium text-neutral-700 mb-2"
                                htmlFor="city"
                            >
                                City
                            </label>
                            <input
                                className="w-3/4 px-4 py-3 rounded-xl border border-neutral-300 focus:outline-gray focus:ring-2 focus:ring-neutral-800 focus:border-neutral-800 transition bg-white"
                                type="text"
                                name="city"
                                id="city"
                                value={formData.city}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-4 flex items-center gap-4">
                            <label
                                className="w-1/4 text-sm font-medium text-neutral-700 mb-2"
                                htmlFor="address"
                            >
                                Address
                            </label>
                            <input
                                className="w-3/4 px-4 py-3 rounded-xl border border-neutral-300 focus:outline-gray focus:ring-2 focus:ring-neutral-800 focus:border-neutral-800 transition bg-white"
                                type="text"
                                name="address"
                                id="address"
                                value={formData.address}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-4 flex items-center gap-4">
                            <label
                                className="w-1/4 text-sm font-medium text-neutral-700 mb-2"
                                htmlFor="rating"
                            >
                                Rating
                            </label>
                            <input
                                className="w-3/4 px-4 py-3 rounded-xl border border-neutral-300 focus:outline-gray focus:ring-2 focus:ring-neutral-800 focus:border-neutral-800 transition bg-white"
                                type="number"
                                step="0.1"
                                name="rating"
                                id="rating"
                                value={formData.rating}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-4 flex items-center gap-4">
                            <label
                                className="w-1/4 text-sm font-medium text-neutral-700 mb-2"
                                htmlFor="price"
                            >
                                Price
                            </label>
                            <input
                                className="w-3/4 px-4 py-3 rounded-xl border border-neutral-300 focus:outline-gray focus:ring-2 focus:ring-neutral-800 focus:border-neutral-800 transition bg-white"
                                type="number"
                                name="price"
                                id="price"
                                value={formData.price}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-4 flex items-center gap-4">
                            <label className="w-1/4 text-sm font-medium text-neutral-700 mb-2">
                                Image Upload
                            </label>
                            <input
                                className="w-3/4 px-4 py-3 rounded-xl border border-neutral-300 focus:outline-gray focus:ring-2 focus:ring-neutral-800 focus:border-neutral-800 transition bg-white"
                                type="file"
                                onChange={(e) => setFile(e.target.files[0])}
                            />

                            {formData.imageUrl && !file && (
                                <div className="mt-2">
                                    <img
                                        src={formData.imageUrl}
                                        alt="Hotel"
                                        style={{ width: "200px", height: "auto" }}
                                    />
                                </div>
                            )}
                        </div>
                        <br />
                    </div>
                </div>

                <button className="primary-btn" type="submit">
                    Submit
                </button>
                {message && <p className="text-green-600 mt-3">{message}</p>}
                {errorMessage && <p className="text-red-600 mt-3">{errorMessage}</p>}
            </div>
        </form>
    );
}