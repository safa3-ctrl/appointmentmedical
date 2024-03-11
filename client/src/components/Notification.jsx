import React from 'react';
import { Link } from 'react-router-dom';

const Notification = ({ count, onClick }) => {
  return (
    <div className="flex items-center px-4">
      <Link to="/notifications" onClick={onClick} className="relative hover:text-gray-700">
        <i className="ri-notification-line header-action-icon mr-2 text-2xl"></i>
        {count > 0 && (
          <span
            className="absolute top-0 right-0 bg-red-500 text-white px-1 rounded-full text-xs animate-pulse"
          >
            {count}
          </span>
        )}
      </Link>
    </div>
  );
};
export default Notification;