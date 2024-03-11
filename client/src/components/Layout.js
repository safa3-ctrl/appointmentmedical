import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const location = useLocation();

  const getMenu = () => {
    if (user?.role === "admin") {
      return [
        { name: "Home", path: "/", icon: "ri-home-line" },
        { name: "Users", path: "/admin/userslist", icon: "ri-user-line" },
        { name: "Doctors", path: "/admin/doctorslist", icon: "ri-user-star-line" },
        { name: "Profile", path: "/profile", icon: "ri-user-line" },
      ];
    } else if (user?.role === "doctor") {
      return [
        { name: "Home", path: "/", icon: "ri-home-line" },
        { name: "Appointments", path: "/doctor/appointments", icon: "ri-file-list-line" },
        { name: "Profile", path: `/doctor/profile/${user?._id}`, icon: "ri-user-line" },
      ];
    } else {
      return [
        { name: "Home", path: "/Home", icon: "ri-home-line" },
        { name: "Appointments", path: "/appointments", icon: "ri-file-list-line" },
        { name: "Apply Doctor", path: "/apply-doctor", icon: "ri-hospital-line" },
      ];
    }
  };

  const menuItems = getMenu();
console.log(menuItems);
console.log(user);
  
    
  return (
    <div className="main flex min-h-screen">
      {/* Sidebar */}
      <div
        className={`flex-none bg-[#00BDA9] shadow-md md:flex md:flex-col w-64 ${
          collapsed ? "w-[6px]" : ""
        }`}
      >
        {/* Sidebar header with logo and role */}
        <div className="py-4 px-6 text-white">
          <h1 className="text-2xl font-bold">Logo</h1>
          
        </div>

        {/* Sidebar navigation links */}
        <nav className="mt-4 px-4 pt-2 space-y-2 text-white">
          {menuItems.map((menu) => ( // Only render menu items from the user's role
            <Link
              key={menu.path}
              to={menu.path}
              className={`block py-2 px-4 text-left hover:bg-[#37948b] ${
                location.pathname === menu.path && "bg-[#37948b]"
              }`}
            >
              <i className={`text-xl mr-2 ${menu.icon}`} /> {menu.name}
            </Link>
          ))}
          <Link
            to="/login"
            className="block py-2 px-4 text-left hover:bg-[#37948b]"
            onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}
          >
            <i className="text-xl mr-2 ri-logout-circle-line" /> Logout
          </Link>
        </nav>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header with toggle button, notifications, and user name */}
        <header className="flex items-center justify-between p-4 bg-white shadow-md border-b border-gray-200">
        {collapsed ? (
          <i
            className="ri-menu-2-fill text-2xl cursor-pointer"
            onClick={() => setCollapsed(false)}
          ></i>
        ) : (
          <i
            className="ri-close-fill text-2xl cursor-pointer"
            onClick={() => setCollapsed(true)}
          ></i>
        )}
      
        {/* Notifications and user name */}
        <div className="flex items-center">
        <div
  className={`relative inline-block cursor-pointer ${
    user?.unseenNotifications.length > 0 ? "bg-red-500 text-white" : ""
  }`}
  onClick={() => navigate("/notifications")}
>
  <i className="ri-notification-line px-3 text-xl"></i>
  {user?.unseenNotifications.length > 0 && (
    <span
      className="absolute top-0 right-0 p-1 text-xs font-bold rounded-full bg-white"
    >
      {user?.unseenNotifications.length}
    </span>
  )}
</div>

      
          <span className="anchor mx-2 text-[#00BDA9]" >
            {user?.name}
          </span>
        </div>
      </header>
      

        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}

export default Layout;