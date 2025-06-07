import React, { useEffect, useState } from "react";
import api from "../utils/api";

const NotificationsDropdown = () => {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Fetch notifications for user
    api.get("/notifications").then(res => setNotifications(res.data));
  }, []);

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="relative">
        <span>🔔</span>
        {notifications.length > 0 && (
          <span className="absolute px-2 text-xs text-white bg-red-500 rounded-full -top-2 -right-2">
            {notifications.length}
          </span>
        )}
      </button>
      {open && (
        <div className="absolute right-0 z-10 p-4 mt-2 bg-white rounded shadow-lg w-72">
          <h4 className="mb-2 font-bold">Notifications</h4>
          {notifications.length === 0 ? (
            <div>No notifications</div>
          ) : (
            notifications.map((note, idx) => (
              <div key={idx} className="py-2 border-b">
                {note.message}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationsDropdown;
