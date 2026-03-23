import { useState } from "react";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";

export default function NewRegistration() {
    const location = useLocation();
    const { id } = useParams();

    const [isLogin, setIsLogin] = useState(true);

    const [formData, setFormData] = useState({
        name: "",
        phoneno: "",
        email: "",
        username: "",
        password: "",
        role: ""
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();
    const from = location.state?.from?.pathname;

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setMessage("");
        setErrorMessage("");

        try {
            const url = "http://localhost:8080/hotelbookapp/api/auth/sign-up";

            const response = await axios.post(url, formData);

            setMessage("Registration successful! Please login to continue.");

            setTimeout(() => {
                navigate("/login");
            }, 3000);

        } catch (error) {

            if (error.response) {
                setErrorMessage(error.response.data.message || "Registration failed");
            } else {
                setErrorMessage("Server not reachable");
            }

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#F5F1E8] p-15 rounded-3xl text-neutral-800 shadow-sm mb-10 border border-neutral-200">

            <form className="container my-8" align="center" onSubmit={handleSubmit}>
                <h2 className="text-4xl font-bold mb-2">NEW REGISTRATION</h2>
                <h4 className="text-gray-500 mb-4">Create a new account to continue</h4>
                {/* Status messages */}
                {loading && <p className="text-blue-600 mb-2">Submitting... please wait</p>}
                {message && <p className="text-green-600 mb-2">{message}</p>}
                {errorMessage && <p className="text-red-600 mb-2">{errorMessage}</p>}

                <label className="Block text-sm font-medium text-neutral-700 mb-2">Name:</label>
                <input
                    className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:outline-gray focus:ring-2 focus:ring-neutral-800 focus:border-neutral-800 transition bg-white"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                /><br /><br />

                <label className="Block text-sm font-medium text-neutral-700 mb-2">E-Mail Id:</label>
                <input
                    className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:outline-gray focus:ring-2 focus:ring-neutral-800 focus:border-neutral-800 transition bg-white"
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                /><br /><br />

                <label className="Block text-sm font-medium text-neutral-700 mb-2">Mobile No:</label>
                <input
                    className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:outline-gray focus:ring-2 focus:ring-neutral-800 focus:border-neutral-800 transition bg-white"
                    type="number"
                    name="phoneno"
                    value={formData.phoneno}
                    onChange={handleChange}
                /><br /><br />

                <label className="Block text-sm font-medium text-neutral-700 mb-2">Username</label>
                <input
                    className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:outline-gray focus:ring-2 focus:ring-neutral-800 focus:border-neutral-800 transition bg-white"
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                /><br /><br />

                <label className="block text-sm font-medium text-neutral-700 mb-2">Password</label>
                <input
                    className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:outline-gray focus:ring-2 focus:ring-neutral-800 focus:border-neutral-800 transition bg-white"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                /><br /><br />

                <label className="block text-sm font-medium text-neutral-700 mb-2">Role:</label>
                <input
                    className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:outline-gray focus:ring-2 focus:ring-neutral-800 focus:border-neutral-800 transition bg-white"
                    placeholder="admin / user"
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                /><br /><br />

                <button
                    disabled={loading}
                    type="submit"
                    className="primary-btn"
                >
                    {loading ? "Submitting..." : "Submit"}
                </button>

            </form>

        </div>
    );
}