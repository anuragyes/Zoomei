import axios from "axios";
import httpStatus from "http-status";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({});

// Create an Axios client instance
const client = axios.create({
    baseURL: 'http://localhost:8000/api/v1/users' // Fixed base URL
});

export const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState(null); // Initialize userData as null
    const router = useNavigate();

    // Helper function to handle errors
    const handleError = (err) => {
        console.error(err);
        return err.response?.data?.message || "An error occurred. Please try again.";
    };

    // Registration handler
    const handleRegister = async (name, username, password) => {
        try {
            const request = await client.post("/register", { name, username, password });
            if (request.status === httpStatus.CREATED) {
                return request.data.message;
            }
        } catch (err) {
            throw handleError(err);
        }
    };

    // Login handler

    // Login handler
const handleLogin = async (username, password) => {
    try {
        const request = await client.post("/login", { username, password });
        console.log("Login attempt:", { username, password });
        console.log("Login response:", request.data);

        if (request.status === httpStatus.OK) {
            localStorage.setItem("token", request.data.token);
            router("/home"); // Redirect to home page after successful login
        }
    } catch (err) {
        // Handle specific error cases
        const errorMessage = err.response?.data?.message;
        if (errorMessage === "User Not Found") {
            console.error("Error: User not found");
            alert("User not found. Please check your username or register first."); // Show feedback to the user
        } else if (errorMessage === "Invalid Username or password") {
            console.error("Error: Invalid credentials");
            alert("Invalid username or password. Please try again."); // Show feedback to the user
        } else {
            throw handleError(err); // Generic error handler
        }
    }
};

    // const handleLogin = async (username, password) => {
    //     try {
    //         const request = await client.post("/login", { username, password });
    //         console.log("Login attempt:", { username, password });
    //         console.log("Login response:", request.data);

    //         if (request.status === httpStatus.OK) {
    //             localStorage.setItem("token", request.data.token);
    //             router("/home");
    //         }
    //     } catch (err) {
    //         throw handleError(err);
    //     }
    // };

    // Fetch user history
    const getHistoryOfUser = async () => {
        try {
            const request = await client.get("/get_all_activity", {
                params: { token: localStorage.getItem("token") },
            });
            return request.data;
        } catch (err) {
            throw handleError(err);
        }
    };

    // Add to user history
    const addToUserHistory = async (meetingCode) => {
        try {
            const request = await client.post("/add_to_activity", {
                token: localStorage.getItem("token"),
                meeting_code: meetingCode,
            });
            return request;
        } catch (err) {
            throw handleError(err);
        }
    };

    const data = {
        userData,
        setUserData,
        addToUserHistory,
        getHistoryOfUser,
        handleRegister,
        handleLogin,
    };

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    );
};
