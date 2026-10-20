import React from "react";
import {
  Search,
  Bell,
  Menu,
  ChevronDown,
} from "lucide-react";

function AdminTopbar({ onMenuClick }) {
  return (
    <header className="admin-topbar">
      <div className="admin-topbar-left">
        <button
          className="admin-mobile-menu"
          onClick={onMenuClick}
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>

        <div className="admin-search">
          <Search size={18} />

          <input
            type="text"
            placeholder="Search anything..."
          />

          <span className="admin-search-shortcut">
            /
          </span>
        </div>
      </div>

      <div className="admin-topbar-right">
        <button className="admin-icon-button">
          <Bell size={19} />
          <span className="admin-notification-dot"></span>
        </button>

        <div className="admin-profile">
          <div className="admin-profile-avatar">
            A
          </div>

          <div className="admin-profile-info">
            <strong>Admin User</strong>
            <span>Administrator</span>
          </div>

          <ChevronDown size={16} />
        </div>
      </div>
    </header>
  );
}

export default AdminTopbar;