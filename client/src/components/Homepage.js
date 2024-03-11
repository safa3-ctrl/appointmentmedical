import React from "react";
import Button from "../components/button";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div
      className="w-full h-screen bg-cover bg-no-repeat bg-center bg-image-full-width flex flex-col justify-center items-center" // Modified class for better positioning
      style={{
        backgroundImage: `url(${require("../Image/image1.png")})`,
      }}
    >
      <div className="text-center text-white">
        <h1 className="text-5xl font-bold mb-4">Book An Appointment with your Doctors Online</h1>
        <p className="text-2xl mb-10">See your Doctor whenever you want, wherever you are.</p>
      </div>
      <div className="flex justify-center">
        <Link to="/register">
          <Button>log in</Button>
        </Link>
      </div>
    </div>
  );
};

export default Homepage;
