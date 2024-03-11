import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/button";

function BookAppointment() {
  const [doctor, setDoctor] = useState(null);
  const [isAvailable, setIsAvailable] = useState(false);
  const [date] = useState();
  const [time] = useState();
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Address `useEffect` dependency issue
  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        dispatch(showLoading()); // Include dispatch in dependency array
        const response = await axios.post(
          "/api/doctor/get-doctor-info-by-id",
          {
            doctorId: params.doctorId,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        dispatch(hideLoading());
        if (response.data.success) {
          setDoctor(response.data.data);
        }
      } catch (error) {
        console.error(error);
        dispatch(hideLoading());
      }
    };

    fetchDoctorData();
  }, [params.doctorId, dispatch]);// Add dispatch to the dependency array

  const checkAvailability = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/user/check-booking-avilability",
        {
          doctorId: params.doctorId,
          date: date,
          time: time,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        setIsAvailable(true);
      } else {
        toast.error(response.data.message);
        setIsAvailable(false); // Reset on error
      }
    } catch (error) {
      toast.error("Error booking appointment");
      dispatch(hideLoading());
    }
  };

  const bookNow = async () => {
    setIsAvailable(false); // Reset availability after booking
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/user/book-appointment",
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctor,
          userInfo: user,
          date: date,
          time: time,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/appointments");
      } else {
        toast.error("Error booking appointment");
        dispatch(hideLoading());
      }
    } catch (error) {
      toast.error("Error booking appointment");
      dispatch(hideLoading());
    }
  };
  
  return (
    <Layout>
      {doctor && (
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-4">
            {doctor.firstName} {doctor.lastName}
          </h1>
          <hr className="my-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-1">
            <img
  src="https://www.dreamstime.com/book-now-icon-web-button-orange-vector-illustration-isolated-white-background-image118047305.jpg"
  alt=""
  width="100%"
  className="w-full h-64 object-cover rounded-lg"
/>


            </div>
            <div className="col-span-1">
              {/* Doctor details, timings, etc. (existing code) */}
              <div className="flex flex-col items-start mt-4">
                {/* Date and time pickers (existing code) */}
                {!isAvailable && (
                  <Button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md mt-3 w-full"
                    onClick={checkAvailability}
                  >
                    Check Availability
                  </Button>
                )}
                {isAvailable && (
                  <Button
                    className="bg-green-500 text-white px-4 py-2 rounded-md mt-3 w-full"
                    onClick={bookNow}
                  >
                    Book Now
                  </Button>
                )}
              </div>
              {/* Additional doctor information, reviews, etc. (can be added) */}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default BookAppointment;