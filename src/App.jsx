import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

// =========================================
// STOREFRONT COMPONENTS
// =========================================

import AnnouncementBar from "./assets/components/Announcement-bar.jsx";
import Header from "./assets/components/Header.jsx";
import Hero from "./assets/components/Hero.jsx";
import FeaturedCollections from "./assets/components/FeaturedCollections.jsx";
import FeaturedProducts from "./assets/components/FeaturedProducts.jsx";

// =========================================
// ADMIN LAYOUT
// =========================================

import AdminLayout from "./admin/layout/AdminLayout.jsx";

// =========================================
// ADMIN PAGES
// =========================================

import Dashboard from "./admin/pages/Dashboard.jsx";
import Products from "./admin/pages/Products.jsx";
import Collections from "./admin/pages/Collections.jsx";
import Orders from "./admin/pages/Orders.jsx";
import Customers from "./admin/pages/Customers.jsx";
import Staff from "./admin/pages/Staff.jsx";
import Storefront from "./admin/pages/Storefront.jsx";
import Content from "./admin/pages/Content.jsx";
import Discounts from "./admin/pages/Discounts.jsx";
import Settings from "./admin/pages/Settings.jsx";

// =========================================
// AUTHENTICATION PAGES
// =========================================

import Login from "./auth/pages/Login.jsx";
import Register from "./auth/pages/Register.jsx";
import ForgotPassword from "./auth/pages/ForgotPassword.jsx";
import ResetPassword from "./auth/pages/ResetPassword.jsx";

// =========================================
// CUSTOMER ACCOUNT
// =========================================

import AccountLayout from "./account/layout/AccountLayout.jsx";
import AccountDashboard from "./account/pages/AccountDashboard.jsx";
import AccountProfile from "./account/pages/AccountProfile.jsx";
import AccountOrders from "./account/pages/AccountOrders.jsx";
import OrderDetails from "./account/pages/OrderDetails.jsx";

// =========================================
// ADMIN STYLES
// =========================================

import "./admin/styles/admin.css";

// =========================================
// STOREFRONT HOME
// =========================================

function StorefrontHome() {
  return (
    <>
      <AnnouncementBar />

      <Header />

      <main>
        <Hero />

        <FeaturedCollections />

        <FeaturedProducts />
      </main>
    </>
  );
}

// =========================================
// MAIN APP
// =========================================

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* =====================================
            STOREFRONT
        ===================================== */}

        <Route
          path="/"
          element={<StorefrontHome />}
        />

        {/* =====================================
            AUTHENTICATION
        ===================================== */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/reset-password"
          element={<ResetPassword />}
        />

        {/* =====================================
            CUSTOMER ACCOUNT
        ===================================== */}

        <Route
          path="/account"
          element={<AccountLayout />}
        >
          {/* /account */}
          <Route
            index
            element={<AccountDashboard />}
          />

          {/* /account/profile */}
          <Route
            path="profile"
            element={<AccountProfile />}
          />

          {/* /account/orders */}
          <Route
            path="orders"
            element={<AccountOrders />}
          />

          {/* /account/orders/:orderId */}
          <Route
            path="orders/:orderId"
            element={<OrderDetails />}
          />
        </Route>

        {/* =====================================
            ADMIN PANEL
        ===================================== */}

        <Route
          path="/admin"
          element={<AdminLayout />}
        >

          {/* /admin */}
          <Route
            index
            element={<Dashboard />}
          />

          {/* /admin/products */}
          <Route
            path="products"
            element={<Products />}
          />

          {/* /admin/collections */}
          <Route
            path="collections"
            element={<Collections />}
          />

          {/* /admin/orders */}
          <Route
            path="orders"
            element={<Orders />}
          />

          {/* /admin/customers */}
          <Route
            path="customers"
            element={<Customers />}
          />

          {/* /admin/staff */}
          <Route
            path="staff"
            element={<Staff />}
          />

          {/* /admin/storefront */}
          <Route
            path="storefront"
            element={<Storefront />}
          />

          {/* /admin/content */}
          <Route
            path="content"
            element={<Content />}
          />

          {/* /admin/discounts */}
          <Route
            path="discounts"
            element={<Discounts />}
          />

          {/* /admin/settings */}
          <Route
            path="settings"
            element={<Settings />}
          />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;