import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import Doctor from "../components/Doctor";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertsSlice";

function Home() {
  const [doctors, setDoctors] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      try {
        dispatch(showLoading()); // Dispatch showLoading before fetching data
        const response = await axios.get("/api/user/get-all-approved-doctors", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        dispatch(hideLoading()); // Dispatch hideLoading after fetching data
        if (response.data.success) {
          setDoctors(response.data.data);
        }
      } catch (error) {
        dispatch(hideLoading()); // Dispatch hideLoading even on error
      }
    };

    getData();
  }, [dispatch]); // Include 'dispatch' as a dependency

  return (
    <Layout>
      <div className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {doctors.map((doctor) => (
          <div key={doctor.id} className="bg-white rounded-lg shadow-md p-4">
            <Doctor doctor={doctor} />
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default Home;
