
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { hideLoading, showLoading } from "../redux/alertsSlice";
import Input from "../components/input"; // Assuming correct import
import Label from "../components/label"; // Assuming correct import
import Button from "../components/button"; // Assuming correct import

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  }); // Removed unused "name" field

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      dispatch(showLoading());
      const response = await axios.post("/api/user/login", formData);
      dispatch(hideLoading());

      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem("token", response.data.data);
        navigate("/home", { state: { loginSuccess: true } });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Login error:", error); // Log error for debugging
      dispatch(hideLoading());
      toast.error("Something went wrong. Please try again.");
    }
  };
  return (
    <div className="bg-[#00BDA9] ">
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-[#009688] md:text-2xl dark:text-white">
          Login here
          </h1>

          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
           
          <Label for="email">Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="email@gmail.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
 <Label for="password">Password</Label>
            <Input
            
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <div className="grid grid-cols-1">
        <Button type="submit">LOGIN</Button>
        <div className="mt-4 text-center text-gray-500">
            Already have an account?{" "}
            <Link to="/Register" className="text-[#00BDA9] hover:underline">
            Create an account
            </Link>
          </div>
      </div>
          </form>
        </div>
      </div>
    </div>
  </div>
);
}

export default Login;