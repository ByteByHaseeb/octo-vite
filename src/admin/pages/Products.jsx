import React, { useMemo, useState } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  Package,
  Image as ImageIcon,
} from "lucide-react";

const initialProducts = [
  {
    id: 1,
    title: "Premium Everyday Essentials",
    vendor: "Octo",
    price: 45.5,
    compareAtPrice: 55,
    inventory: 42,
    collection: "Featured",
    status: "Active",
    image: "",
  },
  {
    id: 2,
    title: "Luxury Fragrance Collection",
    vendor: "Octo Beauty",
    price: 68,
    compareAtPrice: 80,
    inventory: 18,
    collection: "Beauty",
    status: "Active",
    image: "",
  },
  {
    id: 3,
    title: "Baby Care Essentials",
    vendor: "Octo Baby",
    price: 32.99,
    compareAtPrice: 39.99,
    inventory: 7,
    collection: "Baby",
    status: "Active",
    image: "",
  },
  {
    id: 4,
    title: "Daily Health Support",
    vendor: "Octo Health",
    price: 24.5,
    compareAtPrice: 29.99,
    inventory: 0,
    collection: "Health & Wellness",
    status: "Draft",
    image: "",
  },
  {
    id: 5,
    title: "Home Cleaning Essentials",
    vendor: "Octo Home",
    price: 19.99,
    compareAtPrice: 24.99,
    inventory: 31,
    collection: "Household",
    status: "Active",
    image: "",
  },
];

const collections = [
  "All Collections",
  "Featured",
  "Beauty",
  "Baby",
  "Health & Wellness",
  "Household",
];

function Products() {
  const [products, setProducts] = useState(initialProducts);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [collectionFilter, setCollectionFilter] =
    useState("All Collections");

  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [form, setForm] = useState({
    title: "",
    vendor: "",
    price: "",
    compareAtPrice: "",
    inventory: "",
    collection: "Featured",
    status: "Active",
  });

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const searchValue = search.toLowerCase().trim();

      const matchesSearch =
        product.title.toLowerCase().includes(searchValue) ||
        product.vendor.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "All Status" ||
        product.status === statusFilter;

      const matchesCollection =
        collectionFilter === "All Collections" ||
        product.collection === collectionFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesCollection
      );
    });
  }, [
    products,
    search,
    statusFilter,
    collectionFilter,
  ]);

  const totalProducts = products.length;

  const activeProducts = products.filter(
    (product) => product.status === "Active"
  ).length;

  const draftProducts = products.filter(
    (product) => product.status === "Draft"
  ).length;

  const outOfStock = products.filter(
    (product) => product.inventory <= 0
  ).length;

  const openAddModal = () => {
    setEditingProduct(null);

    setForm({
      title: "",
      vendor: "",
      price: "",
      compareAtPrice: "",
      inventory: "",
      collection: "Featured",
      status: "Active",
    });

    setShowModal(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);

    setForm({
      title: product.title,
      vendor: product.vendor,
      price: product.price,
      compareAtPrice: product.compareAtPrice,
      inventory: product.inventory,
      collection: product.collection,
      status: product.status,
    });

    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingProduct(null);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.title.trim()) {
      window.alert("Please enter a product title.");
      return;
    }

    if (editingProduct) {
      setProducts((current) =>
        current.map((product) =>
          product.id === editingProduct.id
            ? {
                ...product,
                title: form.title,
                vendor: form.vendor,
                price: Number(form.price) || 0,
                compareAtPrice:
                  Number(form.compareAtPrice) || 0,
                inventory: Number(form.inventory) || 0,
                collection: form.collection,
                status: form.status,
              }
            : product
        )
      );
    } else {
      const newProduct = {
        id: Date.now(),
        title: form.title,
        vendor: form.vendor || "Octo",
        price: Number(form.price) || 0,
        compareAtPrice:
          Number(form.compareAtPrice) || 0,
        inventory: Number(form.inventory) || 0,
        collection: form.collection,
        status: form.status,
        image: "",
      };

      setProducts((current) => [
        newProduct,
        ...current,
      ]);
    }

    closeModal();
  };

  const handleDelete = (productId) => {
    const product = products.find(
      (item) => item.id === productId
    );

    const confirmed = window.confirm(
      `Delete "${product?.title}"?`
    );

    if (!confirmed) return;

    setProducts((current) =>
      current.filter(
        (product) => product.id !== productId
      )
    );
  };

  const toggleStatus = (productId) => {
    setProducts((current) =>
      current.map((product) =>
        product.id === productId
          ? {
              ...product,
              status:
                product.status === "Active"
                  ? "Draft"
                  : "Active",
            }
          : product
      )
    );
  };

  return (
    <main className="admin-dashboard">
      {/* PAGE HEADER */}

      <div className="admin-page-header">
        <div>
          <p className="admin-breadcrumb">
            Admin / Products
          </p>

          <h1>Products</h1>

          <p>
            Manage your products, inventory, pricing and
            collections.
          </p>
        </div>

        <button
          type="button"
          className="admin-primary-button"
          onClick={openAddModal}
        >
          <Plus size={17} />
          Add Product
        </button>
      </div>

      {/* STATS */}

      <section className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-icon">
            <Package size={20} />
          </div>

          <div>
            <span>Total Products</span>
            <strong>{totalProducts}</strong>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon">
            <Package size={20} />
          </div>

          <div>
            <span>Active Products</span>
            <strong>{activeProducts}</strong>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon">
            <Package size={20} />
          </div>

          <div>
            <span>Draft Products</span>
            <strong>{draftProducts}</strong>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon">
            <Package size={20} />
          </div>

          <div>
            <span>Out of Stock</span>
            <strong>{outOfStock}</strong>
          </div>
        </div>
      </section>

      {/* PRODUCT PANEL */}

      <section className="admin-panel products-panel">
        <div className="admin-panel-header products-panel-header">
          <div>
            <h2>All Products</h2>
            <p>
              {filteredProducts.length} products found
            </p>
          </div>
        </div>

        {/* FILTERS */}

        <div className="products-filters">
          <div className="products-search">
            <Search size={18} />

            <input
              type="text"
              placeholder="Search products..."
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
            className="products-filter-select"
          >
            <option>All Status</option>
            <option>Active</option>
            <option>Draft</option>
          </select>

          <select
            value={collectionFilter}
            onChange={(event) =>
              setCollectionFilter(event.target.value)
            }
            className="products-filter-select"
          >
            {collections.map((collection) => (
              <option
                key={collection}
                value={collection}
              >
                {collection}
              </option>
            ))}
          </select>
        </div>

        {/* TABLE */}

        <div className="products-table-wrapper">
          <table className="products-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Vendor</th>
                <th>Price</th>
                <th>Inventory</th>
                <th>Collection</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <div className="product-table-product">
                        <div className="product-table-image">
                          {product.image ? (
                            <img
                              src={product.image}
                              alt={product.title}
                            />
                          ) : (
                            <ImageIcon size={20} />
                          )}
                        </div>

                        <div>
                          <strong>
                            {product.title}
                          </strong>
                          <span>
                            ID: #{product.id}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td>{product.vendor}</td>

                    <td>
                      <div className="product-price">
                        <strong>
                          £
                          {Number(
                            product.price
                          ).toFixed(2)}
                        </strong>

                        {product.compareAtPrice >
                          product.price && (
                          <span>
                            £
                            {Number(
                              product.compareAtPrice
                            ).toFixed(2)}
                          </span>
                        )}
                      </div>
                    </td>

                    <td>
                      <span
                        className={`product-inventory ${
                          product.inventory === 0
                            ? "out"
                            : product.inventory < 10
                            ? "low"
                            : ""
                        }`}
                      >
                        {product.inventory}
                      </span>
                    </td>

                    <td>
                      <span className="product-collection">
                        {product.collection}
                      </span>
                    </td>

                    <td>
                      <button
                        type="button"
                        className={`admin-status ${
                          product.status === "Active"
                            ? "active"
                            : "inactive"
                        }`}
                        onClick={() =>
                          toggleStatus(product.id)
                        }
                      >
                        {product.status}
                      </button>
                    </td>

                    <td>
                      <div className="products-actions">
                        <button
                          type="button"
                          className="staff-action-button"
                          title="Edit product"
                          onClick={() =>
                            openEditModal(product)
                          }
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          type="button"
                          className="staff-action-button danger"
                          title="Delete product"
                          onClick={() =>
                            handleDelete(product.id)
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
                    colSpan="7"
                    className="products-empty"
                  >
                    <Package size={30} />
                    <strong>
                      No products found
                    </strong>
                    <span>
                      Try changing your search or filters.
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
          <div className="staff-modal product-modal">
            <div className="staff-modal-header">
              <div>
                <h2>
                  {editingProduct
                    ? "Edit Product"
                    : "Add Product"}
                </h2>

                <p>
                  {editingProduct
                    ? "Update product information."
                    : "Create a new product."}
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
              <div className="product-form-image">
                <div className="product-form-image-placeholder">
                  <ImageIcon size={30} />
                </div>

                <div>
                  <strong>Product Image</strong>
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

              <div className="product-form-grid">
                <label>
                  Product Title
                  <input
                    name="title"
                    type="text"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Enter product title"
                  />
                </label>

                <label>
                  Vendor
                  <input
                    name="vendor"
                    type="text"
                    value={form.vendor}
                    onChange={handleChange}
                    placeholder="Enter vendor"
                  />
                </label>

                <label>
                  Price
                  <input
                    name="price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="0.00"
                  />
                </label>

                <label>
                  Compare-at Price
                  <input
                    name="compareAtPrice"
                    type="number"
                    step="0.01"
                    min="0"
                    value={form.compareAtPrice}
                    onChange={handleChange}
                    placeholder="0.00"
                  />
                </label>

                <label>
                  Inventory
                  <input
                    name="inventory"
                    type="number"
                    min="0"
                    value={form.inventory}
                    onChange={handleChange}
                    placeholder="0"
                  />
                </label>

                <label>
                  Collection
                  <select
                    name="collection"
                    value={form.collection}
                    onChange={handleChange}
                  >
                    {collections
                      .filter(
                        (collection) =>
                          collection !==
                          "All Collections"
                      )
                      .map((collection) => (
                        <option
                          key={collection}
                          value={collection}
                        >
                          {collection}
                        </option>
                      ))}
                  </select>
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
                  {editingProduct
                    ? "Save Changes"
                    : "Create Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

export default Products;