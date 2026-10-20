import React from "react";
import { NavLink, Outlet, Link } from "react-router-dom";
import {
  LayoutDashboard,
  UserRound,
  Package,
  LogOut,
  Store,
} from "lucide-react";

import "../styles/account.css";

const accountLinks = [
  {
    label: "Overview",
    path: "/account",
    icon: LayoutDashboard,
    end: true,
  },
  {
    label: "My Profile",
    path: "/account/profile",
    icon: UserRound,
  },
  {
    label: "My Orders",
    path: "/account/orders",
    icon: Package,
  },
];

function AccountLayout() {
  return (
    <div className="account-layout">
      <aside className="account-sidebar">
        <Link to="/" className="account-logo">
          <Store size={24} />
          <span>OCTO</span>
        </Link>

        <div className="account-user">
          <div className="account-avatar">JD</div>
          <div>
            <strong>John Doe</strong>
            <span>Customer Account</span>
          </div>
        </div>

        <nav className="account-nav">
          {accountLinks.map(({ label, path, icon: Icon, end }) => (
            <NavLink
              key={path}
              to={path}
              end={end}
              className={({ isActive }) =>
                `account-nav-link ${isActive ? "active" : ""}`
              }
            >
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="account-sidebar-bottom">
          <Link to="/" className="account-nav-link">
            <Store size={18} />
            <span>Continue Shopping</span>
          </Link>

          <Link to="/login" className="account-nav-link">
            <LogOut size={18} />
            <span>Logout</span>
          </Link>
        </div>
      </aside>

      <div className="account-main">
        <header className="account-topbar">
          <div>
            <span>OCTO / Customer Account</span>
          </div>
          <Link to="/">Visit Store ↗</Link>
        </header>

        <div className="account-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AccountLayout;