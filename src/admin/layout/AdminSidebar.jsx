import React from "react";
import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  Package,
  FolderTree,
  ShoppingCart,
  Users,
  Store,
  FileText,
  Tag,
  Settings,
  LogOut,
  ShieldCheck,
  X,
} from "lucide-react";

const menuItems = [
  {
    label: "Dashboard",
    path: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Products",
    path: "/admin/products",
    icon: Package,
  },
  {
    label: "Collections",
    path: "/admin/collections",
    icon: FolderTree,
  },
  {
    label: "Orders",
    path: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    label: "Customers",
    path: "/admin/customers",
    icon: Users,
  },
  {
    label: "Staff & Permissions",
    path: "/admin/staff",
    icon: ShieldCheck,
  },
  {
    label: "Storefront",
    path: "/admin/storefront",
    icon: Store,
  },
  {
    label: "Content",
    path: "/admin/content",
    icon: FileText,
  },
  {
    label: "Discounts",
    path: "/admin/discounts",
    icon: Tag,
  },
];

function AdminSidebar({ isOpen, onClose }) {
  return (
    <aside
      className={`admin-sidebar ${
        isOpen ? "mobile-open" : ""
      }`}
    >
      <div className="admin-sidebar-logo">
        <div className="admin-logo-mark">
          O
        </div>

        <div>
          <h2>Octo</h2>
          <span>Admin</span>
        </div>

        <button
          type="button"
          className="admin-mobile-sidebar-close"
          onClick={onClose}
          aria-label="Close menu"
        >
          <X size={20} />
        </button>
      </div>

      <nav className="admin-sidebar-nav">
        <p className="admin-nav-label">
          MAIN MENU
        </p>

        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.label}
              to={item.path}
              end={item.path === "/admin"}
              onClick={onClose}
              className={({ isActive }) =>
                `admin-nav-item ${
                  isActive ? "active" : ""
                }`
              }
            >
              <Icon size={19} strokeWidth={1.8} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}

        <p className="admin-nav-label admin-nav-label-bottom">
          SYSTEM
        </p>

        <NavLink
          to="/admin/settings"
          onClick={onClose}
          className={({ isActive }) =>
            `admin-nav-item ${
              isActive ? "active" : ""
            }`
          }
        >
          <Settings size={19} strokeWidth={1.8} />
          <span>Settings</span>
        </NavLink>

        <button
          type="button"
          className="admin-nav-item admin-logout"
        >
          <LogOut size={19} strokeWidth={1.8} />
          <span>Logout</span>
        </button>
      </nav>

      <div className="admin-sidebar-footer">
        <div className="admin-user-avatar">A</div>

        <div className="admin-user-info">
          <strong>Admin User</strong>
          <span>Administrator</span>
        </div>
      </div>
    </aside>
  );
}

export default AdminSidebar;