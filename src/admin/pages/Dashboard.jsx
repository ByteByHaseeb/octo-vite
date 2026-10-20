import React from "react";
import {
  DollarSign,
  ShoppingBag,
  Package,
  Users,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

const stats = [
  {
    title: "Total Sales",
    value: "£24,580",
    change: "+12.5%",
    positive: true,
    icon: DollarSign,
  },
  {
    title: "Total Orders",
    value: "1,248",
    change: "+8.2%",
    positive: true,
    icon: ShoppingBag,
  },
  {
    title: "Products",
    value: "486",
    change: "+4.6%",
    positive: true,
    icon: Package,
  },
  {
    title: "Customers",
    value: "3,842",
    change: "-2.4%",
    positive: false,
    icon: Users,
  },
];

const recentOrders = [
  {
    id: "#ORD-1001",
    customer: "John Smith",
    date: "Sep 21, 2026",
    amount: "£120.00",
    status: "Paid",
  },
  {
    id: "#ORD-1002",
    customer: "Sarah Ahmed",
    date: "Sep 21, 2026",
    amount: "£85.50",
    status: "Processing",
  },
  {
    id: "#ORD-1003",
    customer: "Michael Brown",
    date: "Sep 20, 2026",
    amount: "£210.00",
    status: "Shipped",
  },
  {
    id: "#ORD-1004",
    customer: "Emma Wilson",
    date: "Sep 20, 2026",
    amount: "£64.99",
    status: "Paid",
  },
  {
    id: "#ORD-1005",
    customer: "Ali Hassan",
    date: "Sep 19, 2026",
    amount: "£145.00",
    status: "Processing",
  },
];

function Dashboard() {
  return (
    <main className="admin-dashboard">
      <div className="admin-page-header">
        <div>
          <p className="admin-breadcrumb">
            Admin / Dashboard
          </p>

          <h1>Dashboard</h1>

          <p>
            Welcome back. Here's what's happening with your store.
          </p>
        </div>

        <button className="admin-primary-button">
          View Store
          <ArrowUpRight size={17} />
        </button>
      </div>

      <section className="admin-stats-grid">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div className="admin-stat-card" key={stat.title}>
              <div className="admin-stat-top">
                <div className="admin-stat-icon">
                  <Icon size={20} />
                </div>

                <span
                  className={`admin-stat-change ${
                    stat.positive ? "positive" : "negative"
                  }`}
                >
                  {stat.positive ? (
                    <ArrowUpRight size={14} />
                  ) : (
                    <ArrowDownRight size={14} />
                  )}

                  {stat.change}
                </span>
              </div>

              <div className="admin-stat-content">
                <span>{stat.title}</span>
                <strong>{stat.value}</strong>
              </div>
            </div>
          );
        })}
      </section>

      <section className="admin-content-grid">
        <div className="admin-panel admin-orders-panel">
          <div className="admin-panel-header">
            <div>
              <h2>Recent Orders</h2>
              <p>Your latest customer orders.</p>
            </div>

            <button className="admin-text-button">
              View all
            </button>
          </div>

          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td>
                      <strong>{order.id}</strong>
                    </td>

                    <td>{order.customer}</td>

                    <td>{order.date}</td>

                    <td>
                      <strong>{order.amount}</strong>
                    </td>

                    <td>
                      <span
                        className={`admin-order-status ${order.status
                          .toLowerCase()
                          .replace(" ", "-")}`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="admin-panel admin-overview-panel">
          <div className="admin-panel-header">
            <div>
              <h2>Store Overview</h2>
              <p>Current store status.</p>
            </div>
          </div>

          <div className="admin-overview-list">
            <div className="admin-overview-item">
              <div>
                <span>Products</span>
                <strong>486</strong>
              </div>

              <div className="admin-progress">
                <span style={{ width: "72%" }}></span>
              </div>
            </div>

            <div className="admin-overview-item">
              <div>
                <span>Orders</span>
                <strong>1,248</strong>
              </div>

              <div className="admin-progress">
                <span style={{ width: "58%" }}></span>
              </div>
            </div>

            <div className="admin-overview-item">
              <div>
                <span>Customers</span>
                <strong>3,842</strong>
              </div>

              <div className="admin-progress">
                <span style={{ width: "84%" }}></span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Dashboard;