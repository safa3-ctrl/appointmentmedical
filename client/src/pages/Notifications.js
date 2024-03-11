import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/Layout";
import { hideLoading, showLoading } from "../redux/alertsSlice";
import { setUser } from "../redux/userSlice";

function Notifications() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(0); // Good use of useState for tabs

  const markAllAsSeen = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post("/api/user/mark-all-notifications-as-seen", {
        userId: user._id,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(setUser(response.data.data));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };

  const deleteAll = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post("/api/user/delete-all-notifications", {
        userId: user._id,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(setUser(response.data.data));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout>
      <h1 className="text-2xl font-bold mt-[12px] mb-[12px]  ml-[12px] text-[#00BDA9] ">Notifications</h1>
      <hr className="border-gray-200" />

      <div className="flex flex-col tabs">
        <div className="flex items-center justify-between py-4 border-b border-gray-200">
          <button
            type="button"
            className={`px-4 py-2 font-medium text-gray-500 ${
              activeTab === 0 ? "text-[#00BDA9] border-b-2 border-[#00BDA9]" : ""
            }`}
            onClick={() => setActiveTab(0)}
          >
            Unseen
          </button>
          <button
            type="button"
            className={`px-4 py-2 font-medium text-gray-500 ${
              activeTab === 1 ? "text-[#00BDA9] border-b-2b border-[#00BDA9]" : ""
            }`}
            onClick={() => setActiveTab(1)}
          >
            Seen
          </button>
        </div>

        <div className={`px-4 py-4 ${activeTab === 0 ? "" : "hidden"}`}>
          {/* Unseen notifications content */}
          <div className="flex justify-end mb-4">
            <h1 className="text-[#00BDA9] cursor-pointer anchor" onClick={markAllAsSeen}>
              Mark all as seen
            </h1>
          </div>
          {user?.unseenNotifications.map((notification) => (
            <div key={notification.id} className="bg-white p-4 rounded-lg shadow-md mb-4">
              <div className="text-gray-700">{notification.message}</div>
            </div>
          ))}
        </div>

        <div className={`px-4 py-4 ${activeTab === 1 ? "" : "hidden"}`}>
          {/* Seen notifications content */}
          <div className="flex justify-end mb-4">
            <h1 className="text-[#00BDA9] cursor-pointer anchor" onClick={deleteAll}>
              Delete all
            </h1>
          </div>
          {user?.seenNotifications.map((notification) => (
            <div key={notification.id} className="bg-white p-4 rounded-lg shadow-md mb-4">
              <div className="text-gray-700">{notification.message}</div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Notifications;