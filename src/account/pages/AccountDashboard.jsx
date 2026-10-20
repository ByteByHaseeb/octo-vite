import React from "react";
import { Link } from "react-router-dom";
import { Package, UserRound, ArrowUpRight } from "lucide-react";

const recentOrders = [
  {
    id: "#OCT-1001",
    date: "Sep 18, 2026",
    total: "£89.99",
    status: "Delivered",
  },
  {
    id: "#OCT-1002",
    date: "Sep 20, 2026",
    total: "£45.50",
    status: "Processing",
  },
];

function AccountDashboard() {
  return (
    <div className="account-page">
      <div className="account-page-heading">
        <div>
          <p className="account-eyebrow">MY ACCOUNT</p>
          <h1>Welcome back, John!</h1>
          <p>Manage your orders and account details.</p>
        </div>

        <Link to="/" className="account-primary-button">
          Continue Shopping
        </Link>
      </div>

      <div className="account-stats">
        <div className="account-stat-card">
          <div className="account-stat-icon">
            <Package size={21} />
          </div>
          <span>Total Orders</span>
          <h2>12</h2>
          <Link to="/account/orders">View all orders →</Link>
        </div>

        <div className="account-stat-card">
          <div className="account-stat-icon">
            <UserRound size={21} />
          </div>
          <span>Account Details</span>
          <h2>John Doe</h2>
          <Link to="/account/profile">Manage profile →</Link>
        </div>
      </div>

      <section className="account-panel">
        <div className="account-panel-heading">
          <div>
            <h2>Recent Orders</h2>
            <p>Track your latest purchases.</p>
          </div>

          <Link to="/account/orders">
            View all <ArrowUpRight size={16} />
          </Link>
        </div>

        <div className="account-table-wrap">
          <table className="account-table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Date</th>
                <th>Total</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.date}</td>
                  <td>{order.total}</td>
                  <td>
                    <span
                      className={`account-status ${
                        order.status === "Delivered"
                          ? "delivered"
                          : "processing"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <Link
                      to={`/account/orders/${order.id.replace("#", "")}`}
                      className="account-view-link"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default AccountDashboard;