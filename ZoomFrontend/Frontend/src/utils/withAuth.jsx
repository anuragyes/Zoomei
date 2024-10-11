// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom"

// const withAuth = (WrappedComponent ) => {
//     const AuthComponent = (props) => {
//         const router = useNavigate();

//         const isAuthenticated = () => {
//             if(localStorage.getItem("token")) {
//                 return true;
//             } 
//             return false;
//         }

//         useEffect(() => {
//             if(!isAuthenticated()) {
//                 router("/auth")
//             }
//         }, [])

//         return <WrappedComponent {...props} />
//     }

//     return AuthComponent;
// }

// export default withAuth;


import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const withAuth = (WrappedComponent) => {
    const AuthComponent = (props) => {
        const navigate = useNavigate();

        const isAuthenticated = () => {
            return !!localStorage.getItem("token"); // Check if token exists
        };

        useEffect(() => {
            if (!isAuthenticated()) {
                navigate("/auth"); // Redirect to auth page if not authenticated
            }
        }, [navigate]); // Include navigate in dependencies

        // Optionally, render a loading state while checking auth
        if (!isAuthenticated()) {
            return null; // Or some loading spinner
        }

        return <WrappedComponent {...props} />; // Render the wrapped component if authenticated
    };

    return AuthComponent;
};

export default withAuth;
