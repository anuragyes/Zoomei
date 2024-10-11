import React from "react";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";
export default function LandingPage() {

   
  // Function to generate a random URL
  const generateRandomUrl = () => {
    return Math.random().toString(36).substring(2, 8); // Generates a random string
  };
  const router = useNavigate();
  
 
  return (
    <div className="landingPageContainer">
      <nav>
        <div className="navHeader">
          <h2>Zoomio Video Call</h2>
        </div>
        <div className="navlist">
        <p
            onClick={() => {
              const url = generateRandomUrl();
            router(`/video/${url}`); // Navigate to a dynamic meeting URL
            }}
          >
            Join as Guest
          </p>

           

          <p
            onClick={() => {
              router("/auth")
            }}
          >
            Register
          </p>
          <div
            onClick={() => {
              router("/auth")
            }}
            role="button"
          >
            <p>Login</p>
          </div>
        </div>
      </nav>

      <div className="landingMainContainer">
        <div>
          <h1>
            <span style={{ color: "#FF9839" }}>Connect</span> with your loved
            Ones
          </h1>

          <p>Cover a distance by Zoomio Video Call</p>
          <div role="button">
            <Link to={"/auth"}>Get Started</Link>
            <a href="">Get Started</a>
          </div>
        </div>
        <div>
          <img src="/menlogo.png" alt="" />
        </div>
      </div>
    </div>
  );
}

















