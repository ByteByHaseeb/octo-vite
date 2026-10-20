import React, { useMemo, useState } from "react";
import {
  Search,
  ShoppingCart,
  Eye,
  X,
  PackageCheck,
} from "lucide-react";

const initialOrders = [
  {
    id: "1001",
    customer: "John Smith",
    email: "john@example.com",
    date: "September 20, 2026",
    items: 3,
    subtotal: 82.5,
    shipping: 0,
    total: 82.5,
    paymentStatus: "Paid",
    status: "Processing",
    products: [
      {
        name: "Premium Everyday Essentials",
        quantity: 1,
        price: 45.5,
      },
      {
        name: "Daily Health Support",
        quantity: 2,
        price: 18.5,
      },
    ],
  },
  {
    id: "1002",
    customer: "Sarah Wilson",
    email: "sarah@example.com",
    date: "September 19, 2026",
    items: 1,
    subtotal: 68,
    shipping: 5,
    total: 73,
    paymentStatus: "Paid",
    status: "Shipped",
    products: [
      {
        name: "Luxury Fragrance Collection",
        quantity: 1,
        price: 68,
      },
    ],
  },
  {
    id: "1003",
    customer: "James Carter",
    email: "james@example.com",
    date: "September 18, 2026",
    items: 2,
    subtotal: 65.98,
    shipping: 0,
    total: 65.98,
    paymentStatus: "Pending",
    status: "Pending",
    products: [
      {
        name: "Baby Care Essentials",
        quantity: 2,
        price: 32.99,
      },
    ],
  },
  {
    id: "1004",
    customer: "Emily Davis",
    email: "emily@example.com",
    date: "September 17, 2026",
    items: 1,
    subtotal: 19.99,
    shipping: 4.99,
    total: 24.98,
    paymentStatus: "Paid",
    status: "Delivered",
    products: [
      {
        name: "Home Cleaning Essentials",
        quantity: 1,
        price: 19.99,
      },
    ],
  },
  {
    id: "1005",
    customer: "Michael Brown",
    email: "michael@example.com",
    date: "September 16, 2026",
    items: 1,
    subtotal: 24.5,
    shipping: 0,
    total: 24.5,
    paymentStatus: "Refunded",
    status: "Cancelled",
    products: [
      {
        name: "Daily Health Support",
        quantity: 1,
        price: 24.5,
      },
    ],
  },
];

const orderStatuses = [
  "All Status",
  "Pending",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

const paymentStatuses = [
  "All Payments",
  "Paid",
  "Pending",
  "Refunded",
];

function Orders() {
  const [orders, setOrders] = useState(initialOrders);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("All Status");
  const [paymentFilter, setPaymentFilter] =
    useState("All Payments");

  const [selectedOrder, setSelectedOrder] =
    useState(null);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const searchValue = search
        .toLowerCase()
        .trim();

      const matchesSearch =
        order.id.toLowerCase().includes(searchValue) ||
        order.customer
          .toLowerCase()
          .includes(searchValue) ||
        order.email
          .toLowerCase()
          .includes(searchValue);

      const matchesStatus =
        statusFilter === "All Status" ||
        order.status === statusFilter;

      const matchesPayment =
        paymentFilter === "All Payments" ||
        order.paymentStatus === paymentFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPayment
      );
    });
  }, [
    orders,
    search,
    statusFilter,
    paymentFilter,
  ]);

  const totalOrders = orders.length;

  const pendingOrders = orders.filter(
    (order) =>
      order.status === "Pending" ||
      order.status === "Processing"
  ).length;

  const completedOrders = orders.filter(
    (order) => order.status === "Delivered"
  ).length;

  const totalRevenue = orders
    .filter((order) => order.paymentStatus === "Paid")
    .reduce((total, order) => total + order.total, 0);

  const updateOrderStatus = (
    orderId,
    newStatus
  ) => {
    setOrders((current) =>
      current.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status: newStatus,
            }
          : order
      )
    );

    setSelectedOrder((current) =>
      current?.id === orderId
        ? {
            ...current,
            status: newStatus,
          }
        : current
    );
  };

  return (
    <main className="admin-dashboard">
      {/* PAGE HEADER */}

      <div className="admin-page-header">
        <div>
          <p className="admin-breadcrumb">
            Admin / Orders
          </p>

          <h1>Orders</h1>

          <p>
            Manage customer orders, payments and
            fulfillment.
          </p>
        </div>
      </div>

      {/* STATS */}

      <section className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-icon">
            <ShoppingCart size={20} />
          </div>

          <div>
            <span>Total Orders</span>
            <strong>{totalOrders}</strong>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon">
            <ShoppingCart size={20} />
          </div>

          <div>
            <span>Pending Orders</span>
            <strong>{pendingOrders}</strong>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon">
            <PackageCheck size={20} />
          </div>

          <div>
            <span>Completed</span>
            <strong>{completedOrders}</strong>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon">
            <ShoppingCart size={20} />
          </div>

          <div>
            <span>Paid Revenue</span>
            <strong>
              £{totalRevenue.toFixed(2)}
            </strong>
          </div>
        </div>
      </section>

      {/* ORDERS PANEL */}

      <section className="admin-panel orders-panel">
        <div className="admin-panel-header">
          <div>
            <h2>All Orders</h2>

            <p>
              {filteredOrders.length} orders found
            </p>
          </div>
        </div>

        {/* FILTERS */}

        <div className="orders-filters">
          <div className="orders-search">
            <Search size={18} />

            <input
              type="text"
              placeholder="Search order, customer or email..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />
          </div>

          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value)
            }
            className="orders-filter-select"
          >
            {orderStatuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>

          <select
            value={paymentFilter}
            onChange={(event) =>
              setPaymentFilter(event.target.value)
            }
            className="orders-filter-select"
          >
            {paymentStatuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        {/* ORDERS TABLE */}

        <div className="orders-table-wrapper">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Items</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order.id}>
                    <td>
                      <strong className="order-number">
                        #{order.id}
                      </strong>
                    </td>

                    <td>
                      <div className="order-customer">
                        <strong>
                          {order.customer}
                        </strong>

                        <span>{order.email}</span>
                      </div>
                    </td>

                    <td>{order.date}</td>

                    <td>
                      {order.items}{" "}
                      {order.items === 1
                        ? "item"
                        : "items"}
                    </td>

                    <td>
                      <strong>
                        £{order.total.toFixed(2)}
                      </strong>
                    </td>

                    <td>
                      <span
                        className={`order-payment ${order.paymentStatus
                          .toLowerCase()
                          .replace(" ", "-")}`}
                      >
                        {order.paymentStatus}
                      </span>
                    </td>

                    <td>
                      <select
                        value={order.status}
                        onChange={(event) =>
                          updateOrderStatus(
                            order.id,
                            event.target.value
                          )
                        }
                        className={`order-status-select ${order.status
                          .toLowerCase()
                          .replace(" ", "-")}`}
                      >
                        {orderStatuses
                          .filter(
                            (status) =>
                              status !== "All Status"
                          )
                          .map((status) => (
                            <option
                              key={status}
                              value={status}
                            >
                              {status}
                            </option>
                          ))}
                      </select>
                    </td>

                    <td>
                      <button
                        type="button"
                        className="staff-action-button"
                        title="View order"
                        onClick={() =>
                          setSelectedOrder(order)
                        }
                      >
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="orders-empty"
                  >
                    <ShoppingCart size={30} />

                    <strong>
                      No orders found
                    </strong>

                    <span>
                      Try changing your search or
                      filters.
                    </span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* ORDER DETAILS MODAL */}

      {selectedOrder && (
        <div
          className="staff-modal-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedOrder(null);
            }
          }}
        >
          <div className="staff-modal order-details-modal">
            <div className="staff-modal-header">
              <div>
                <p className="admin-breadcrumb">
                  ORDER DETAILS
                </p>

                <h2>
                  Order #{selectedOrder.id}
                </h2>

                <p>
                  {selectedOrder.date}
                </p>
              </div>

              <button
                type="button"
                className="staff-modal-close"
                onClick={() =>
                  setSelectedOrder(null)
                }
              >
                <X size={19} />
              </button>
            </div>

            {/* CUSTOMER */}

            <div className="order-detail-section">
              <div className="order-detail-heading">
                <h3>Customer</h3>
              </div>

              <div className="order-customer-detail">
                <strong>
                  {selectedOrder.customer}
                </strong>

                <span>
                  {selectedOrder.email}
                </span>
              </div>
            </div>

            {/* PRODUCTS */}

            <div className="order-detail-section">
              <div className="order-detail-heading">
                <h3>Products</h3>
              </div>

              <div className="order-products">
                {selectedOrder.products.map(
                  (product, index) => (
                    <div
                      className="order-product"
                      key={`${product.name}-${index}`}
                    >
                      <div className="order-product-image">
                        <PackageCheck size={22} />
                      </div>

                      <div className="order-product-info">
                        <strong>
                          {product.name}
                        </strong>

                        <span>
                          Quantity: {product.quantity}
                        </span>
                      </div>

                      <strong>
                        £
                        {(
                          product.price *
                          product.quantity
                        ).toFixed(2)}
                      </strong>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* TOTALS */}

            <div className="order-detail-totals">
              <div>
                <span>Subtotal</span>
                <strong>
                  £
                  {selectedOrder.subtotal.toFixed(
                    2
                  )}
                </strong>
              </div>

              <div>
                <span>Shipping</span>
                <strong>
                  {selectedOrder.shipping === 0
                    ? "Free"
                    : `£${selectedOrder.shipping.toFixed(
                        2
                      )}`}
                </strong>
              </div>

              <div className="order-total-row">
                <span>Total</span>
                <strong>
                  £
                  {selectedOrder.total.toFixed(2)}
                </strong>
              </div>
            </div>

            {/* STATUS */}

            <div className="order-detail-section">
              <div className="order-detail-heading">
                <h3>Order Status</h3>
              </div>

              <select
                value={selectedOrder.status}
                onChange={(event) =>
                  updateOrderStatus(
                    selectedOrder.id,
                    event.target.value
                  )
                }
                className="order-detail-status"
              >
                {orderStatuses
                  .filter(
                    (status) => status !== "All Status"
                  )
                  .map((status) => (
                    <option
                      key={status}
                      value={status}
                    >
                      {status}
                    </option>
                  ))}
              </select>
            </div>

            <div className="staff-modal-actions">
              <button
                type="button"
                className="admin-secondary-button"
                onClick={() =>
                  setSelectedOrder(null)
                }
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Orders;