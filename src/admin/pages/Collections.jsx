import React, { useMemo, useState } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  FolderTree,
  Image as ImageIcon,
} from "lucide-react";

const initialCollections = [
  {
    id: 1,
    title: "Featured",
    description: "Our featured products and latest picks.",
    handle: "featured",
    productCount: 24,
    status: "Active",
    image: "",
  },
  {
    id: 2,
    title: "Beauty & Hygiene",
    description: "Beauty, skincare and personal care products.",
    handle: "beauty-hygiene",
    productCount: 86,
    status: "Active",
    image: "",
  },
  {
    id: 3,
    title: "Baby Products",
    description: "Everyday essentials for babies and parents.",
    handle: "baby-products",
    productCount: 42,
    status: "Active",
    image: "",
  },
  {
    id: 4,
    title: "Health & Wellness",
    description: "Health and wellness essentials.",
    handle: "health-wellness",
    productCount: 58,
    status: "Active",
    image: "",
  },
  {
    id: 5,
    title: "Household",
    description: "Useful products for your home.",
    handle: "household",
    productCount: 71,
    status: "Active",
    image: "",
  },
  {
    id: 6,
    title: "Grocery",
    description: "Food, drinks and everyday grocery products.",
    handle: "grocery",
    productCount: 93,
    status: "Draft",
    image: "",
  },
];

function createHandle(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function Collections() {
  const [collections, setCollections] = useState(
    initialCollections
  );

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("All Status");

  const [showModal, setShowModal] = useState(false);
  const [editingCollection, setEditingCollection] =
    useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    handle: "",
    productCount: 0,
    status: "Active",
  });

  const filteredCollections = useMemo(() => {
    return collections.filter((collection) => {
      const searchValue = search.toLowerCase().trim();

      const matchesSearch =
        collection.title
          .toLowerCase()
          .includes(searchValue) ||
        collection.description
          .toLowerCase()
          .includes(searchValue) ||
        collection.handle
          .toLowerCase()
          .includes(searchValue);

      const matchesStatus =
        statusFilter === "All Status" ||
        collection.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [collections, search, statusFilter]);

  const totalCollections = collections.length;

  const activeCollections = collections.filter(
    (collection) => collection.status === "Active"
  ).length;

  const draftCollections = collections.filter(
    (collection) => collection.status === "Draft"
  ).length;

  const totalProducts = collections.reduce(
    (total, collection) =>
      total + Number(collection.productCount || 0),
    0
  );

  const openAddModal = () => {
    setEditingCollection(null);

    setForm({
      title: "",
      description: "",
      handle: "",
      productCount: 0,
      status: "Active",
    });

    setShowModal(true);
  };

  const openEditModal = (collection) => {
    setEditingCollection(collection);

    setForm({
      title: collection.title,
      description: collection.description,
      handle: collection.handle,
      productCount: collection.productCount,
      status: collection.status,
    });

    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingCollection(null);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleTitleChange = (event) => {
    const value = event.target.value;

    setForm((current) => ({
      ...current,
      title: value,
      handle: editingCollection
        ? current.handle
        : createHandle(value),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.title.trim()) {
      window.alert("Please enter a collection title.");
      return;
    }

    if (editingCollection) {
      setCollections((current) =>
        current.map((collection) =>
          collection.id === editingCollection.id
            ? {
                ...collection,
                title: form.title,
                description: form.description,
                handle:
                  form.handle || createHandle(form.title),
                productCount:
                  Number(form.productCount) || 0,
                status: form.status,
              }
            : collection
        )
      );
    } else {
      const newCollection = {
        id: Date.now(),
        title: form.title,
        description: form.description,
        handle:
          form.handle || createHandle(form.title),
        productCount:
          Number(form.productCount) || 0,
        status: form.status,
        image: "",
      };

      setCollections((current) => [
        newCollection,
        ...current,
      ]);
    }

    closeModal();
  };

  const handleDelete = (collectionId) => {
    const collection = collections.find(
      (item) => item.id === collectionId
    );

    const confirmed = window.confirm(
      `Delete "${collection?.title}"?`
    );

    if (!confirmed) return;

    setCollections((current) =>
      current.filter(
        (collection) => collection.id !== collectionId
      )
    );
  };

  const toggleStatus = (collectionId) => {
    setCollections((current) =>
      current.map((collection) =>
        collection.id === collectionId
          ? {
              ...collection,
              status:
                collection.status === "Active"
                  ? "Draft"
                  : "Active",
            }
          : collection
      )
    );
  };

  return (
    <main className="admin-dashboard">
      {/* PAGE HEADER */}

      <div className="admin-page-header">
        <div>
          <p className="admin-breadcrumb">
            Admin / Collections
          </p>

          <h1>Collections</h1>

          <p>
            Organize your products into collections and
            categories.
          </p>
        </div>

        <button
          type="button"
          className="admin-primary-button"
          onClick={openAddModal}
        >
          <Plus size={17} />
          Add Collection
        </button>
      </div>

      {/* STATS */}

      <section className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-icon">
            <FolderTree size={20} />
          </div>

          <div>
            <span>Total Collections</span>
            <strong>{totalCollections}</strong>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon">
            <FolderTree size={20} />
          </div>

          <div>
            <span>Active</span>
            <strong>{activeCollections}</strong>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon">
            <FolderTree size={20} />
          </div>

          <div>
            <span>Draft</span>
            <strong>{draftCollections}</strong>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon">
            <FolderTree size={20} />
          </div>

          <div>
            <span>Products Assigned</span>
            <strong>{totalProducts}</strong>
          </div>
        </div>
      </section>

      {/* COLLECTIONS PANEL */}

      <section className="admin-panel collections-panel">
        <div className="admin-panel-header">
          <div>
            <h2>All Collections</h2>

            <p>
              {filteredCollections.length} collections found
            </p>
          </div>
        </div>

        {/* FILTERS */}

        <div className="collections-filters">
          <div className="collections-search">
            <Search size={18} />

            <input
              type="text"
              placeholder="Search collections..."
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
            className="collections-filter-select"
          >
            <option>All Status</option>
            <option>Active</option>
            <option>Draft</option>
          </select>
        </div>

        {/* COLLECTION TABLE */}

        <div className="collections-table-wrapper">
          <table className="collections-table">
            <thead>
              <tr>
                <th>Collection</th>
                <th>Handle</th>
                <th>Products</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredCollections.length > 0 ? (
                filteredCollections.map((collection) => (
                  <tr key={collection.id}>
                    <td>
                      <div className="collection-table-item">
                        <div className="collection-table-image">
                          {collection.image ? (
                            <img
                              src={collection.image}
                              alt={collection.title}
                            />
                          ) : (
                            <ImageIcon size={20} />
                          )}
                        </div>

                        <div>
                          <strong>
                            {collection.title}
                          </strong>

                          <span>
                            {collection.description}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td>
                      <code>
                        /collections/
                        {collection.handle}
                      </code>
                    </td>

                    <td>
                      <strong className="collection-product-count">
                        {collection.productCount}
                      </strong>
                    </td>

                    <td>
                      <button
                        type="button"
                        className={`admin-status ${
                          collection.status === "Active"
                            ? "active"
                            : "inactive"
                        }`}
                        onClick={() =>
                          toggleStatus(collection.id)
                        }
                      >
                        {collection.status}
                      </button>
                    </td>

                    <td>
                      <div className="collections-actions">
                        <button
                          type="button"
                          className="staff-action-button"
                          title="Edit collection"
                          onClick={() =>
                            openEditModal(collection)
                          }
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          type="button"
                          className="staff-action-button danger"
                          title="Delete collection"
                          onClick={() =>
                            handleDelete(collection.id)
                          }
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="collections-empty"
                  >
                    <FolderTree size={30} />

                    <strong>
                      No collections found
                    </strong>

                    <span>
                      Try changing your search or filter.
                    </span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* ADD / EDIT MODAL */}

      {showModal && (
        <div
          className="staff-modal-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeModal();
            }
          }}
        >
          <div className="staff-modal collection-modal">
            <div className="staff-modal-header">
              <div>
                <h2>
                  {editingCollection
                    ? "Edit Collection"
                    : "Add Collection"}
                </h2>

                <p>
                  {editingCollection
                    ? "Update collection information."
                    : "Create a new product collection."}
                </p>
              </div>

              <button
                type="button"
                className="staff-modal-close"
                onClick={closeModal}
              >
                <X size={19} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              {/* IMAGE */}

              <div className="collection-form-image">
                <div className="collection-form-image-placeholder">
                  <ImageIcon size={30} />
                </div>

                <div>
                  <strong>Collection Image</strong>

                  <p>
                    Image upload will be connected to
                    storage later.
                  </p>

                  <button
                    type="button"
                    className="admin-secondary-button"
                    disabled
                  >
                    Upload Image
                  </button>
                </div>
              </div>

              <div className="collection-form-grid">
                <label>
                  Collection Title

                  <input
                    name="title"
                    type="text"
                    value={form.title}
                    onChange={handleTitleChange}
                    placeholder="e.g. Beauty & Hygiene"
                  />
                </label>

                <label>
                  Handle

                  <input
                    name="handle"
                    type="text"
                    value={form.handle}
                    onChange={handleChange}
                    placeholder="beauty-hygiene"
                  />

                  <small>
                    Used in the collection URL.
                  </small>
                </label>

                <label className="collection-description-field">
                  Description

                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Describe this collection..."
                    rows="4"
                  />
                </label>

                <label>
                  Product Count

                  <input
                    name="productCount"
                    type="number"
                    min="0"
                    value={form.productCount}
                    onChange={handleChange}
                    placeholder="0"
                  />
                </label>

                <label>
                  Status

                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                  >
                    <option>Active</option>
                    <option>Draft</option>
                  </select>
                </label>
              </div>

              <div className="staff-modal-actions">
                <button
                  type="button"
                  className="admin-secondary-button"
                  onClick={closeModal}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="admin-primary-button"
                >
                  {editingCollection
                    ? "Save Changes"
                    : "Create Collection"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

export default Collections;