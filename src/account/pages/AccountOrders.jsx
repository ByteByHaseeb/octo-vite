import React from "react";
import { Link } from "react-router-dom";

const orders = [
  {
    id: "OCT-1001",
    date: "Sep 18, 2026",
    total: "£89.99",
    status: "Delivered",
  },
  {
    id: "OCT-1002",
    date: "Sep 20, 2026",
    total: "£45.50",
    status: "Processing",
  },
  {
    id: "OCT-1003",
    date: "Sep 21, 2026",
    total: "£120.00",
    status: "Shipped",
  },
];

function AccountOrders() {
  return (
    <div className="account-page">
      <div className="account-page-heading">
        <div>
          <p className="account-eyebrow">PURCHASE HISTORY</p>
          <h1>My Orders</h1>
          <p>View your orders and track their status.</p>
        </div>
      </div>

      <section className="account-panel">
        <div className="account-panel-heading">
          <div>
            <h2>All Orders</h2>
            <p>{orders.length} sample orders</p>
          </div>
        </div>

        <div className="account-table-wrap">
          <table className="account-table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Date</th>
                <th>Total</th>
                <th>Status</th>
                <th>Details</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td>{order.date}</td>
                  <td>{order.total}</td>
                  <td>
                    <span
                      className={`account-status ${order.status.toLowerCase()}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <Link
                      to={`/account/orders/${order.id}`}
                      className="account-view-link"
                    >
                      View Order
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

export default AccountOrders;