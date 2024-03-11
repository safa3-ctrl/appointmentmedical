import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "../../components/Layout";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import axios from "axios";
import moment from "moment"; // Ensure moment.js is installed

function DoctorsList() {
  const [doctors, setDoctors] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const getDoctorsData = async () => {
      try {
        dispatch(showLoading());
        const response = await axios.get("/api/admin/get-all-doctors", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        dispatch(hideLoading());
        if (response.data.success) {
          setDoctors(response.data.data);
        } else {
          // Handle error if API response indicates failure
        }
      } catch (error) {
        dispatch(hideLoading());
        // Handle network errors or other issues
      }
    };

    getDoctorsData();
  }, [dispatch]);

  const columns = [
    {
      title: "Nom",
      dataIndex: "name",
      render: (text, record) => <td className="px-6 py-4 whitespace-nowrap">{text}</td>,
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (text, record) => <td className="px-6 py-4 whitespace-nowrap">{text}</td>,
    },
    {
      title: "Date de création",
      dataIndex: "createdAt",
      render: (record, text) => (
        <td className="px-6 py-4 whitespace-nowrap">
          {moment(record.createdAt).format("DD-MM-YYYY")}
        </td>
      ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <td className="px-6 py-4 whitespace-nowrap text-right">
          <button
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
            onClick={() => { /* Implement blocking logic here */ }}
          >
            Bloquer
          </button>
        </td>
      ),
    },
  ];

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4 ml-[12px] text-[#009688]"> List of doctors</h1>
      <div className="w-full overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <head className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th key={column.dataIndex} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {column.title}
                </th>
              ))}
            </tr>
          </head>
          <body className="bg-white divide-y divide-gray-200">
            {doctors.map((doctor) => ( // Use 'doctors' for consistency
              <tr key={doctor._id}>
                {columns.map((column) => column.render(doctor.name, doctor))}
              </tr>
            ))}
          </body>
        </table>
      </div>
    </Layout>
  );
}

export default DoctorsList;
