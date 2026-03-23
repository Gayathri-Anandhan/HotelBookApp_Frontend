import { useState } from "react";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";

export default function Login() {
    const location = useLocation();
    const { id } = useParams();

    const [isLogin, setIsLogin] = useState(true);

    const [formData, setFormData] = useState({
        username: "",
        password: "",
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
        if (!formData.username || !formData.password) {
            setErrorMessage("Please enter username and password");
            return;
        }

        setLoading(true);
        setMessage("");
        setErrorMessage("");

        try {
            const url = "https://hotelbook-app.onrender.com/hotelbookapp/api/auth/sign-in";

            const response = await axios.post(url, formData);

            console.log(response.data);

            // store values in localStorage
            localStorage.setItem("name", response.data.name);
            localStorage.setItem("role", response.data.role);
            localStorage.setItem("token", response.data.token);

            setMessage("Login successful!");

            setTimeout(() => {
                navigate("/");
            }, 1000);

        } catch (error) {

            if (error.response) {
                setErrorMessage(error.response.data.message || "Invalid username or password");
            } else if (error.request) {
                setErrorMessage("Server not reachable. Please try again later.");
            } else {
                setErrorMessage("Unexpected error occurred.");
            }

        } finally {
            setLoading(false);
        }

        setLoading(false);
    };

    return (
        <div className="bg-[#F5F1E8] p-15 rounded-3xl text-neutral-800 shadow-sm mb-10 border border-neutral-200">
            {!isLogin && (
                <div className="text-center mt-2">
                    <button type="button" className="btn btn-link" onClick={() => setIsLogin(true)}>
                        Back to Login
                    </button>
                </div>
            )}

            <form className="container my-8" align="center" onSubmit={handleSubmit}>
                <h2 className="text-4xl font-bold mb-2">LOGIN</h2>

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

                {/* BUTTON */}
                <button
                    type="submit"
                    disabled={loading}
                    className="primary-btn"
                >
                    {loading ? "Processing..." : "Submit"}
                </button>

                {/* MESSAGES */}
                {loading && <p className="text-blue-600 mt-2">Processing...</p>}
                {message && <p className="text-green-600 mt-2">{message}</p>}
                {errorMessage && <p className="text-red-600 mt-2">{errorMessage}</p>}

            </form>

            <div className="text-center mt-2">
                <button
                    type="button"
                    className="primary-btn"
                    onClick={() => navigate("/NewRegistration")}
                >
                    New Registration
                </button>
            </div>
        </div>
    );
}