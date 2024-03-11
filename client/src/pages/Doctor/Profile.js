import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import axios from "axios";
import {  useParams } from "react-router-dom";
import DoctorForm from "../../components/DoctorForm";


function Profile() {
  const params = useParams();
  const [doctor, setDoctor] = useState(null);
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    // ... (your onFinish function code remains unchanged)
  };

  useEffect(() => {
    const getDoctorData = async () => {
      try {
        dispatch(showLoading());
        const response = await axios.post(
          "/api/doctor/get-doctor-info-by-user-id",
          {
            userId: params.userId,
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
        console.log(error);
        dispatch(hideLoading());
      }
    };

    getDoctorData();
  }, [params.userId, dispatch])

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4 ml-[12px] text-[#009688]">Doctor Profile</h1>
      <hr className="my-4"/>
      {doctor && (
        <DoctorForm onFinish={onFinish} initialValues={doctor} />
      )}
    </Layout>
  );
}

export default Profile;
