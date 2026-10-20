
import React, { useMemo, useState } from "react";
import {
  Search,
  Plus,
  Users,
  ShoppingBag,
  Wallet,
  UserRound,
  Eye,
  Pencil,
  Trash2,
  X,
  Mail,
  Phone,
  MapPin,
  CalendarDays,
  ArrowUpRight,
} from "lucide-react";

import AdminPage from "../components/AdminPage";

const initialCustomers = [
  {
    id: 1,
    firstName: "John",
    lastName: "Smith",
    email: "john@example.com",
    phone: "+44 7700 900101",
    city: "London",
    country: "United Kingdom",
    date: "2026-09-20",
    status: "Active",
    orders: 3,
    spent: 182.50,
    notes: "",
  },
  {
    id: 2,
    firstName: "Sarah",
    lastName: "Wilson",
    email: "sarah@example.com",
    phone: "+44 7700 900102",
    city: "Manchester",
    country: "United Kingdom",
    date: "2026-09-18",
    status: "Active",
    orders: 5,
    spent: 348.00,
    notes: "",
  },
  {
    id: 3,
    firstName: "James",
    lastName: "Carter",
    email: "james@example.com",
    phone: "+44 7700 900103",
    city: "Birmingham",
    country: "United Kingdom",
    date: "2026-09-15",
    status: "Active",
    orders: 2,
    spent: 96.48,
    notes: "",
  },
  {
    id: 4,
    firstName: "Emily",
    lastName: "Davis",
    email: "emily@example.com",
    phone: "+44 7700 900104",
    city: "Leeds",
    country: "United Kingdom",
    date: "2026-09-12",
    status: "Inactive",
    orders: 0,
    spent: 0,
    notes: "",
  },
  {
    id: 5,
    firstName: "Michael",
    lastName: "Brown",
    email: "michael@example.com",
    phone: "+44 7700 900105",
    city: "Liverpool",
    country: "United Kingdom",
    date: "2026-09-10",
    status: "Active",
    orders: 4,
    spent: 267.99,
    notes: "",
  },
  {
    id: 6,
    firstName: "Olivia",
    lastName: "Taylor",
    email: "olivia@example.com",
    phone: "+44 7700 900106",
    city: "Bristol",
    country: "United Kingdom",
    date: "2026-09-05",
    status: "Active",
    orders: 1,
    spent: 45.50,
    notes: "",
  },
];

const sampleOrderHistory = {
  1: [
    { id: "#1001", date: "20 Sep 2026", total: 82.50, status: "Processing" },
    { id: "#0992", date: "12 Sep 2026", total: 55.00, status: "Delivered" },
    { id: "#0975", date: "03 Sep 2026", total: 45.00, status: "Delivered" },
  ],
  2: [
    { id: "#1002", date: "18 Sep 2026", total: 73.00, status: "Shipped" },
    { id: "#0988", date: "10 Sep 2026", total: 120.00, status: "Delivered" },
  ],
};

const emptyCustomer = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  city: "",
  country: "United Kingdom",
  status: "Active",
  notes: "",
};

function formatMoney(value) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(Number(value) || 0);
}

function formatDate(value) {
  if (!value) return "—";

  return new Date(`${value}T12:00:00`).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function CustomerAvatar({ customer, large = false }) {
  const initials =
    `${customer.firstName?.[0] || ""}${customer.lastName?.[0] || ""}`.toUpperCase();

  return (
    <div className={`customer-avatar ${large ? "customer-avatar-large" : ""}`}>
      {initials || "?"}
    </div>
  );
}

function Customers() {
  const [customers, setCustomers] = useState(initialCustomers);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [modal, setModal] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [form, setForm] = useState(emptyCustomer);
  const [formError, setFormError] = useState("");

  const filteredCustomers = useMemo(() => {
    const query = search.trim().toLowerCase();

    return customers
      .filter((customer) => {
        const fullName =
          `${customer.firstName} ${customer.lastName}`.toLowerCase();

        const matchesSearch =
          !query ||
          fullName.includes(query) ||
          customer.email.toLowerCase().includes(query) ||
          customer.phone.includes(query);

        const matchesStatus =
          statusFilter === "All" || customer.status === statusFilter;

        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === "oldest") return a.date.localeCompare(b.date);
        if (sortBy === "name") {
          return `${a.firstName} ${a.lastName}`.localeCompare(
            `${b.firstName} ${b.lastName}`
          );
        }
        if (sortBy === "spent") return b.spent - a.spent;

        return b.date.localeCompare(a.date);
      });
  }, [customers, search, statusFilter, sortBy]);

  const activeCount = customers.filter(
    (customer) => customer.status === "Active"
  ).length;

  const totalOrders = customers.reduce(
    (total, customer) => total + customer.orders,
    0
  );

  const totalSpent = customers.reduce(
    (total, customer) => total + customer.spent,
    0
  );

  function openAddModal() {
    setSelectedCustomer(null);
    setForm({ ...emptyCustomer });
    setFormError("");
    setModal("form");
  }

  function openEditModal(customer) {
    setSelectedCustomer(customer);
    setForm({
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      phone: customer.phone,
      city: customer.city,
      country: customer.country,
      status: customer.status,
      notes: customer.notes || "",
    });
    setFormError("");
    setModal("form");
  }

  function openDetails(customer) {
    setSelectedCustomer(customer);
    setModal("details");
  }

  function closeModal() {
    setModal(null);
    setSelectedCustomer(null);
    setFormError("");
  }

  function handleSave(event) {
    event.preventDefault();
    setFormError("");

    const firstName = form.firstName.trim();
    const lastName = form.lastName.trim();
    const email = form.email.trim().toLowerCase();

    if (!firstName || !lastName || !email) {
      setFormError("First name, last name and email are required.");
      return;
    }

    const duplicateEmail = customers.some(
      (customer) =>
        customer.email.toLowerCase() === email &&
        customer.id !== selectedCustomer?.id
    );

    if (duplicateEmail) {
      setFormError("A customer with this email already exists.");
      return;
    }

    if (selectedCustomer) {
      setCustomers((current) =>
        current.map((customer) =>
          customer.id === selectedCustomer.id
            ? { ...customer, ...form, firstName, lastName, email }
            : customer
        )
      );
    } else {
      const newCustomer = {
        ...form,
        firstName,
        lastName,
        email,
        id: Math.max(0, ...customers.map((customer) => customer.id)) + 1,
        date: new Date().toLocaleDateString("en-CA"),
        orders: 0,
        spent: 0,
      };

      setCustomers((current) => [newCustomer, ...current]);
    }

    closeModal();
  }

  function toggleStatus(customer) {
    setCustomers((current) =>
      current.map((item) =>
        item.id === customer.id
          ? {
              ...item,
              status: item.status === "Active" ? "Inactive" : "Active",
            }
          : item
      )
    );

    if (selectedCustomer?.id === customer.id) {
      setSelectedCustomer((current) => ({
        ...current,
        status: current.status === "Active" ? "Inactive" : "Active",
      }));
    }
  }

  function deleteCustomer(customer) {
    const confirmed = window.confirm(
      `Delete ${customer.firstName} ${customer.lastName}? This only removes the sample record from this frontend.`
    );

    if (!confirmed) return;

    setCustomers((current) =>
      current.filter((item) => item.id !== customer.id)
    );

    if (selectedCustomer?.id === customer.id) closeModal();
  }

  return (
    <AdminPage
      title="Customers"
      description="Manage customer profiles, contact details and purchase history."
    >
      <div className="customer-stats-grid">
        <div className="customer-stat-card">
          <div className="customer-stat-top">
            <span>Total customers</span>
            <span className="customer-stat-icon">
              <Users size={19} />
            </span>
          </div>
          <strong>{customers.length}</strong>
          <p>All customer records</p>
        </div>

        <div className="customer-stat-card">
          <div className="customer-stat-top">
            <span>Active customers</span>
            <span className="customer-stat-icon">
              <UserRound size={19} />
            </span>
          </div>
          <strong>{activeCount}</strong>
          <p>{customers.length - activeCount} inactive</p>
        </div>

        <div className="customer-stat-card">
          <div className="customer-stat-top">
            <span>Total orders</span>
            <span className="customer-stat-icon">
              <ShoppingBag size={19} />
            </span>
          </div>
          <strong>{totalOrders}</strong>
          <p>Across all sample customers</p>
        </div>

        <div className="customer-stat-card">
          <div className="customer-stat-top">
            <span>Total spent</span>
            <span className="customer-stat-icon">
              <Wallet size={19} />
            </span>
          </div>
          <strong>{formatMoney(totalSpent)}</strong>
          <p>Combined customer spend</p>
        </div>
      </div>

      <section className="admin-panel customer-list-panel">
        <div className="admin-panel-header customer-list-heading">
          <div>
            <h2>All customers</h2>
            <p>View and manage your customer records.</p>
          </div>

          <button
            type="button"
            className="admin-primary-button"
            onClick={openAddModal}
          >
            <Plus size={17} />
            Add customer
          </button>
        </div>

        <div className="customer-toolbar">
          <label className="customer-search">
            <Search size={18} />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search name, email or phone..."
              aria-label="Search customers"
            />
          </label>

          <select
            className="customer-filter-select"
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            aria-label="Filter by status"
          >
            <option value="All">All statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <select
            className="customer-filter-select"
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            aria-label="Sort customers"
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="name">Name A–Z</option>
            <option value="spent">Highest spend</option>
          </select>
        </div>

        <div className="customer-table-wrap">
          <table className="admin-table customer-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Status</th>
                <th>Orders</th>
                <th>Total spent</th>
                <th>Location</th>
                <th>Date added</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.id}>
                  <td>
                    <div className="customer-identity">
                      <CustomerAvatar customer={customer} />
                      <div>
                        <strong>
                          {customer.firstName} {customer.lastName}
                        </strong>
                        <span>{customer.email}</span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <button
                      type="button"
                      className={`customer-status-badge ${
                        customer.status === "Active"
                          ? "customer-status-active"
                          : "customer-status-inactive"
                      }`}
                      onClick={() => toggleStatus(customer)}
                      title="Click to change customer status"
                    >
                      <span />
                      {customer.status}
                    </button>
                  </td>

                  <td>{customer.orders}</td>
                  <td className="customer-spent">
                    {formatMoney(customer.spent)}
                  </td>
                  <td>
                    <div className="customer-location">
                      <MapPin size={14} />
                      {customer.city || "—"}
                    </div>
                  </td>
                  <td>{formatDate(customer.date)}</td>

                  <td>
                    <div className="customer-row-actions">
                      <button
                        type="button"
                        title="View customer"
                        aria-label={`View ${customer.firstName}`}
                        onClick={() => openDetails(customer)}
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        type="button"
                        title="Edit customer"
                        aria-label={`Edit ${customer.firstName}`}
                        onClick={() => openEditModal(customer)}
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        type="button"
                        className="customer-delete-action"
                        title="Delete customer"
                        aria-label={`Delete ${customer.firstName}`}
                        onClick={() => deleteCustomer(customer)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredCustomers.length === 0 && (
                <tr>
                  <td colSpan={7}>
                    <div className="customer-empty-state">
                      <Users size={30} />
                      <strong>No customers found</strong>
                      <span>Try another search or change the status filter.</span>
                      <button
                        type="button"
                        className="admin-secondary-button"
                        onClick={() => {
                          setSearch("");
                          setStatusFilter("All");
                        }}
                      >
                        Clear filters
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="customer-table-footer">
          Showing <strong>{filteredCustomers.length}</strong> of{" "}
          <strong>{customers.length}</strong> customers
        </div>
      </section>

      {modal && (
        <div
          className="customer-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeModal();
          }}
        >
          <section
            className={`customer-modal ${
              modal === "details" ? "customer-details-modal" : ""
            }`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="customer-modal-title"
          >
            <div className="customer-modal-header">
              <div>
                <h2 id="customer-modal-title">
                  {modal === "details"
                    ? "Customer details"
                    : selectedCustomer
                      ? "Edit customer"
                      : "Add customer"}
                </h2>
                <p>
                  {modal === "details"
                    ? "Contact information and order history."
                    : "Enter the customer's information below."}
                </p>
              </div>

              <button
                type="button"
                className="customer-modal-close"
                onClick={closeModal}
                aria-label="Close dialog"
              >
                <X size={20} />
              </button>
            </div>

            {modal === "form" ? (
              <form onSubmit={handleSave}>
                <div className="customer-modal-body">
                  {formError && (
                    <div className="customer-form-error">{formError}</div>
                  )}

                  <div className="customer-form-grid">
                    <label className="customer-form-field">
                      First name *
                      <input
                        required
                        value={form.firstName}
                        onChange={(event) =>
                          setForm({ ...form, firstName: event.target.value })
                        }
                        placeholder="First name"
                      />
                    </label>

                    <label className="customer-form-field">
                      Last name *
                      <input
                        required
                        value={form.lastName}
                        onChange={(event) =>
                          setForm({ ...form, lastName: event.target.value })
                        }
                        placeholder="Last name"
                      />
                    </label>

                    <label className="customer-form-field customer-form-full">
                      Email address *
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={(event) =>
                          setForm({ ...form, email: event.target.value })
                        }
                        placeholder="customer@example.com"
                      />
                    </label>

                    <label className="customer-form-field customer-form-full">
                      Phone number
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(event) =>
                          setForm({ ...form, phone: event.target.value })
                        }
                        placeholder="+44 7700 900000"
                      />
                    </label>

                    <label className="customer-form-field">
                      City
                      <input
                        value={form.city}
                        onChange={(event) =>
                          setForm({ ...form, city: event.target.value })
                        }
                        placeholder="City"
                      />
                    </label>

                    <label className="customer-form-field">
                      Country
                      <input
                        value={form.country}
                        onChange={(event) =>
                          setForm({ ...form, country: event.target.value })
                        }
                        placeholder="Country"
                      />
                    </label>

                    <label className="customer-form-field customer-form-full">
                      Status
                      <select
                        value={form.status}
                        onChange={(event) =>
                          setForm({ ...form, status: event.target.value })
                        }
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </label>

                    <label className="customer-form-field customer-form-full">
                      Notes
                      <textarea
                        rows={3}
                        value={form.notes}
                        onChange={(event) =>
                          setForm({ ...form, notes: event.target.value })
                        }
                        placeholder="Internal notes about this customer..."
                      />
                    </label>
                  </div>
                </div>

                <div className="customer-modal-footer">
                  <button
                    type="button"
                    className="admin-secondary-button"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="admin-primary-button">
                    {selectedCustomer ? "Save changes" : "Add customer"}
                  </button>
                </div>
              </form>
            ) : (
              <>
                <div className="customer-modal-body">
                  <div className="customer-profile-summary">
                    <CustomerAvatar customer={selectedCustomer} large />
                    <div>
                      <h3>
                        {selectedCustomer.firstName}{" "}
                        {selectedCustomer.lastName}
                      </h3>
                      <p>{selectedCustomer.email}</p>
                      <span
                        className={`customer-status-badge ${
                          selectedCustomer.status === "Active"
                            ? "customer-status-active"
                            : "customer-status-inactive"
                        }`}
                      >
                        <span />
                        {selectedCustomer.status}
                      </span>
                    </div>
                  </div>

                  <div className="customer-detail-stats">
                    <div>
                      <span>Total orders</span>
                      <strong>{selectedCustomer.orders}</strong>
                    </div>
                    <div>
                      <span>Total spent</span>
                      <strong>{formatMoney(selectedCustomer.spent)}</strong>
                    </div>
                  </div>

                  <div className="customer-detail-section">
                    <h3>Contact information</h3>

                    <div className="customer-detail-line">
                      <Mail size={17} />
                      <div>
                        <span>Email</span>
                        <strong>{selectedCustomer.email}</strong>
                      </div>
                    </div>

                    <div className="customer-detail-line">
                      <Phone size={17} />
                      <div>
                        <span>Phone</span>
                        <strong>{selectedCustomer.phone || "Not provided"}</strong>
                      </div>
                    </div>

                    <div className="customer-detail-line">
                      <MapPin size={17} />
                      <div>
                        <span>Location</span>
                        <strong>
                          {[selectedCustomer.city, selectedCustomer.country]
                            .filter(Boolean)
                            .join(", ") || "Not provided"}
                        </strong>
                      </div>
                    </div>

                    <div className="customer-detail-line">
                      <CalendarDays size={17} />
                      <div>
                        <span>Customer since</span>
                        <strong>{formatDate(selectedCustomer.date)}</strong>
                      </div>
                    </div>
                  </div>

                  {selectedCustomer.notes && (
                    <div className="customer-notes">
                      <strong>Internal notes</strong>
                      <p>{selectedCustomer.notes}</p>
                    </div>
                  )}

                  <div className="customer-detail-section">
                    <div className="customer-order-heading">
                      <h3>Recent orders</h3>
                      <span>{selectedCustomer.orders} total</span>
                    </div>

                    {(sampleOrderHistory[selectedCustomer.id] || []).length >
                    0 ? (
                      <div className="customer-order-list">
                        {sampleOrderHistory[selectedCustomer.id].map((order) => (
                          <div className="customer-order-item" key={order.id}>
                            <div>
                              <strong>{order.id}</strong>
                              <span>{order.date}</span>
                            </div>
                            <div className="customer-order-item-end">
                              <strong>{formatMoney(order.total)}</strong>
                              <span>{order.status}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="customer-no-orders">
                        <ShoppingBag size={20} />
                        <span>
                          No sample order history is available for this customer.
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="customer-modal-footer customer-details-footer">
                  <button
                    type="button"
                    className="admin-secondary-button"
                    onClick={() => toggleStatus(selectedCustomer)}
                  >
                    {selectedCustomer.status === "Active"
                      ? "Deactivate customer"
                      : "Activate customer"}
                  </button>
                  <button
                    type="button"
                    className="admin-primary-button"
                    onClick={() => openEditModal(selectedCustomer)}
                  >
                    <Pencil size={16} />
                    Edit customer
                  </button>
                </div>
              </>
            )}
          </section>
        </div>
      )}
    </AdminPage>
  );
}

export default Customers;
