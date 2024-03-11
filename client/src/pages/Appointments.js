import React, { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import Layout from "../components/Layout";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import moment from "moment";

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const dispatch = useDispatch();

  // Fetches appointments from an API endpoint
  const getAppointmentsData = useCallback(async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get("/api/user/get-appointments-by-user-id", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(hideLoading());
      if (response.data.success) {
        setAppointments(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("An error occurred while fetching appointments.");
    }
  }, [dispatch]);

  // Colonnes du tableau avec des fonctions de rendu pour formater les données
  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
    },
    {
      title: "Docteur",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.doctorInfo.firstName} {record.doctorInfo.lastName}
        </span>
      ),
    },
    {
      title: "Téléphone",
      dataIndex: "phoneNumber",
      render: (text, record) => (
        <span>{record.doctorInfo.phoneNumber}</span>
      ),
    },
    {
      title: "Date et heure",
      dataIndex: "createdAt",
      render: (text, record) => (
        <span>
          {moment(record.date).format("DD-MM-YYYY")} {moment(record.time).format("HH:mm")}
        </span>
      ),
    },
    {
      title: "Statut",
      dataIndex: "status",
    },
  ];

  // useEffect pour charger les données une seule fois
  useEffect(() => {
    getAppointmentsData();
  }, [getAppointmentsData]);

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4 mt-4 ml-[12px] text-[#00BDA9]">Appointments</h1>
      <hr className="my-4" />
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.dataIndex}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {appointments.map((record) => (
            <tr key={record._id}>
              {columns.map((column) => (
                <td key={column.dataIndex} className="px-6 py-4 whitespace-nowrap">
                  {column.render(record.name, record)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}

export default Appointments;
