import React, { useMemo, useState } from "react";
import {
  Plus,
  Search,
  Users,
  ShieldCheck,
  Pencil,
  Trash2,
  X,
  Check,
  RotateCcw,
} from "lucide-react";

const initialStaff = [
  {
    id: 1,
    name: "Alex Morgan",
    email: "alex@octo.com",
    role: "Super Admin",
    status: "Active",
  },
  {
    id: 2,
    name: "Sarah Wilson",
    email: "sarah@octo.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: 3,
    name: "James Carter",
    email: "james@octo.com",
    role: "Staff",
    status: "Active",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily@octo.com",
    role: "Staff",
    status: "Inactive",
  },
];

const permissionAreas = [
  "Products",
  "Collections",
  "Orders",
  "Customers",
  "Storefront",
  "Content",
  "Discounts",
  "Staff & Permissions",
  "Settings",
];

const permissionTypes = [
  "View",
  "Create",
  "Edit",
  "Delete",
];

const initialPermissions = {
  "Super Admin": {
    Products: {
      View: true,
      Create: true,
      Edit: true,
      Delete: true,
    },
    Collections: {
      View: true,
      Create: true,
      Edit: true,
      Delete: true,
    },
    Orders: {
      View: true,
      Create: true,
      Edit: true,
      Delete: true,
    },
    Customers: {
      View: true,
      Create: true,
      Edit: true,
      Delete: true,
    },
    Storefront: {
      View: true,
      Create: true,
      Edit: true,
      Delete: true,
    },
    Content: {
      View: true,
      Create: true,
      Edit: true,
      Delete: true,
    },
    Discounts: {
      View: true,
      Create: true,
      Edit: true,
      Delete: true,
    },
    "Staff & Permissions": {
      View: true,
      Create: true,
      Edit: true,
      Delete: true,
    },
    Settings: {
      View: true,
      Create: true,
      Edit: true,
      Delete: true,
    },
  },

  Admin: {
    Products: {
      View: true,
      Create: true,
      Edit: true,
      Delete: false,
    },
    Collections: {
      View: true,
      Create: true,
      Edit: true,
      Delete: false,
    },
    Orders: {
      View: true,
      Create: true,
      Edit: true,
      Delete: false,
    },
    Customers: {
      View: true,
      Create: true,
      Edit: true,
      Delete: false,
    },
    Storefront: {
      View: true,
      Create: false,
      Edit: true,
      Delete: false,
    },
    Content: {
      View: true,
      Create: true,
      Edit: true,
      Delete: false,
    },
    Discounts: {
      View: true,
      Create: true,
      Edit: true,
      Delete: false,
    },
    "Staff & Permissions": {
      View: true,
      Create: false,
      Edit: false,
      Delete: false,
    },
    Settings: {
      View: true,
      Create: false,
      Edit: false,
      Delete: false,
    },
  },

  Staff: {
    Products: {
      View: true,
      Create: false,
      Edit: false,
      Delete: false,
    },
    Collections: {
      View: true,
      Create: false,
      Edit: false,
      Delete: false,
    },
    Orders: {
      View: true,
      Create: false,
      Edit: true,
      Delete: false,
    },
    Customers: {
      View: true,
      Create: false,
      Edit: false,
      Delete: false,
    },
    Storefront: {
      View: true,
      Create: false,
      Edit: false,
      Delete: false,
    },
    Content: {
      View: true,
      Create: false,
      Edit: true,
      Delete: false,
    },
    Discounts: {
      View: true,
      Create: false,
      Edit: false,
      Delete: false,
    },
    "Staff & Permissions": {
      View: false,
      Create: false,
      Edit: false,
      Delete: false,
    },
    Settings: {
      View: false,
      Create: false,
      Edit: false,
      Delete: false,
    },
  },
};

function Staff() {
  const [staff, setStaff] = useState(initialStaff);

  const [search, setSearch] = useState("");

  const [roleFilter, setRoleFilter] = useState("All");

  const [showModal, setShowModal] = useState(false);

  const [editingMember, setEditingMember] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "Staff",
  });

  const [selectedRole, setSelectedRole] =
    useState("Super Admin");

  const [permissions, setPermissions] =
    useState(initialPermissions);

  const filteredStaff = useMemo(() => {
    return staff.filter((member) => {
      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        member.name.toLowerCase().includes(searchText) ||
        member.email.toLowerCase().includes(searchText);

      const matchesRole =
        roleFilter === "All" ||
        member.role === roleFilter;

      return matchesSearch && matchesRole;
    });
  }, [staff, search, roleFilter]);

  const openAddModal = () => {
    setEditingMember(null);

    setForm({
      name: "",
      email: "",
      role: "Staff",
    });

    setShowModal(true);
  };

  const openEditModal = (member) => {
    setEditingMember(member);

    setForm({
      name: member.name,
      email: member.email,
      role: member.role,
    });

    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingMember(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.name.trim() || !form.email.trim()) {
      return;
    }

    if (editingMember) {
      setStaff((current) =>
        current.map((member) =>
          member.id === editingMember.id
            ? {
                ...member,
                name: form.name.trim(),
                email: form.email.trim(),
                role: form.role,
              }
            : member
        )
      );
    } else {
      const newMember = {
        id: Date.now(),
        name: form.name.trim(),
        email: form.email.trim(),
        role: form.role,
        status: "Active",
      };

      setStaff((current) => [
        newMember,
        ...current,
      ]);
    }

    closeModal();
  };

  const toggleStatus = (id) => {
    setStaff((current) =>
      current.map((member) =>
        member.id === id
          ? {
              ...member,
              status:
                member.status === "Active"
                  ? "Inactive"
                  : "Active",
            }
          : member
      )
    );
  };

  const deleteMember = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this staff member?"
    );

    if (!confirmed) return;

    setStaff((current) =>
      current.filter(
        (member) => member.id !== id
      )
    );
  };

  const updatePermission = (
    area,
    permission,
    value
  ) => {
    setPermissions((current) => ({
      ...current,
      [selectedRole]: {
        ...current[selectedRole],
        [area]: {
          ...current[selectedRole][area],
          [permission]: value,
        },
      },
    }));
  };

  const resetPermissions = () => {
    const confirmed = window.confirm(
      `Reset all ${selectedRole} permissions to their default values?`
    );

    if (!confirmed) return;

    setPermissions((current) => ({
      ...current,
      [selectedRole]:
        initialPermissions[selectedRole],
    }));
  };

  const savePermissions = () => {
    window.alert(
      `${selectedRole} permissions saved successfully.`
    );
  };

  const getRolePermissionCount = (role) => {
    return permissionAreas.reduce(
      (total, area) => {
        return (
          total +
          permissionTypes.filter(
            (permission) =>
              permissions[role]?.[area]?.[permission]
          ).length
        );
      },
      0
    );
  };

  return (
    <main className="admin-dashboard">

      {/* =====================================
          PAGE HEADER
      ===================================== */}

      <div className="admin-page-header">

        <div>
          <p className="admin-breadcrumb">
            Admin / Staff
          </p>

          <h1>
            Staff & Permissions
          </h1>

          <p>
            Manage staff members, roles, and access levels.
          </p>
        </div>

        <button
          type="button"
          className="admin-primary-button"
          onClick={openAddModal}
        >
          <Plus size={17} />
          Add Staff
        </button>

      </div>

      {/* =====================================
          STATS
      ===================================== */}

      <div className="admin-stats-grid">

        <div className="admin-stat-card">

          <div className="admin-stat-top">
            <span>Total Staff</span>
            <Users size={20} />
          </div>

          <div className="admin-stat-content">
            <strong>{staff.length}</strong>
            <span>Staff accounts</span>
          </div>

        </div>

        <div className="admin-stat-card">

          <div className="admin-stat-top">
            <span>Active Members</span>
            <ShieldCheck size={20} />
          </div>

          <div className="admin-stat-content">
            <strong>
              {
                staff.filter(
                  (member) =>
                    member.status === "Active"
                ).length
              }
            </strong>

            <span>Currently active</span>
          </div>

        </div>

        <div className="admin-stat-card">

          <div className="admin-stat-top">
            <span>Administrators</span>
            <ShieldCheck size={20} />
          </div>

          <div className="admin-stat-content">
            <strong>
              {
                staff.filter(
                  (member) =>
                    member.role === "Admin" ||
                    member.role === "Super Admin"
                ).length
              }
            </strong>

            <span>Admin-level accounts</span>
          </div>

        </div>

        <div className="admin-stat-card">

          <div className="admin-stat-top">
            <span>Selected Role</span>
            <ShieldCheck size={20} />
          </div>

          <div className="admin-stat-content">
            <strong>
              {getRolePermissionCount(selectedRole)}
            </strong>

            <span>
              Active permissions
            </span>
          </div>

        </div>

      </div>

      {/* =====================================
          TEAM MEMBERS
      ===================================== */}

      <section className="admin-panel">

        <div className="admin-panel-header staff-panel-header">

          <div>
            <h2>
              Team Members
            </h2>

            <p>
              Manage your team and their account roles.
            </p>
          </div>

          <div className="staff-filters">

            <div className="staff-search">

              <Search size={17} />

              <input
                type="text"
                placeholder="Search staff..."
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
              />

            </div>

            <select
              value={roleFilter}
              onChange={(event) =>
                setRoleFilter(event.target.value)
              }
            >
              <option value="All">
                All Roles
              </option>

              <option value="Super Admin">
                Super Admin
              </option>

              <option value="Admin">
                Admin
              </option>

              <option value="Staff">
                Staff
              </option>
            </select>

          </div>

        </div>

        <div className="admin-table-wrapper">

          <table className="admin-table">

            <thead>
              <tr>
                <th>Team Member</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {filteredStaff.length > 0 ? (
                filteredStaff.map((member) => (

                  <tr key={member.id}>

                    <td>

                      <div className="staff-member-cell">

                        <div className="staff-avatar">
                          {member.name
                            .split(" ")
                            .map(
                              (part) => part[0]
                            )
                            .join("")
                            .slice(0, 2)}
                        </div>

                        <div>

                          <strong>
                            {member.name}
                          </strong>

                          <span>
                            {member.email}
                          </span>

                        </div>

                      </div>

                    </td>

                    <td>

                      <span
                        className={`staff-role ${member.role
                          .toLowerCase()
                          .replaceAll(" ", "-")}`}
                      >
                        {member.role}
                      </span>

                    </td>

                    <td>

                      <button
                        type="button"
                        className={`admin-status ${member.status.toLowerCase()}`}
                        onClick={() =>
                          toggleStatus(member.id)
                        }
                      >
                        {member.status}
                      </button>

                    </td>

                    <td>

                      <div className="staff-actions">

                        <button
                          type="button"
                          className="staff-action-button"
                          title="Edit"
                          onClick={() =>
                            openEditModal(member)
                          }
                        >
                          <Pencil size={17} />
                        </button>

                        <button
                          type="button"
                          className="staff-action-button danger"
                          title="Delete"
                          onClick={() =>
                            deleteMember(member.id)
                          }
                        >
                          <Trash2 size={17} />
                        </button>

                      </div>

                    </td>

                  </tr>

                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="staff-empty"
                  >
                    No staff members found.
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>

      </section>

      {/* =====================================
          ROLES
      ===================================== */}

      <section className="admin-panel staff-permissions-panel">

        <div className="admin-panel-header">

          <div>
            <h2>
              Roles & Permissions
            </h2>

            <p>
              Select a role to manage its permissions.
            </p>
          </div>

        </div>

        <div className="staff-role-grid">

          {["Super Admin", "Admin", "Staff"].map(
            (role) => (

              <button
                type="button"
                key={role}
                className={`staff-role-card ${
                  selectedRole === role
                    ? "selected"
                    : ""
                }`}
                onClick={() =>
                  setSelectedRole(role)
                }
              >

                <div className="staff-role-card-top">

                  <ShieldCheck size={20} />

                  <span>
                    {role}
                  </span>

                </div>

                <p>
                  {role === "Super Admin"
                    ? "Full access to all platform features."
                    : role === "Admin"
                    ? "Manage store operations and assigned areas."
                    : "Access only the areas assigned to them."}
                </p>

                <div className="staff-permission-tags">

                  <span>
                    {
                      getRolePermissionCount(role)
                    } permissions
                  </span>

                </div>

              </button>

            )
          )}

        </div>

      </section>

      {/* =====================================
          PERMISSION MATRIX
      ===================================== */}

      <section className="admin-panel permission-matrix-panel">

        <div className="admin-panel-header">

          <div>
            <h2>
              {selectedRole} Permissions
            </h2>

            <p>
              Control what this role can access and manage.
            </p>
          </div>

          <div className="staff-modal-actions">

            <button
              type="button"
              className="admin-secondary-button"
              onClick={resetPermissions}
            >
              <RotateCcw size={15} />
              Reset
            </button>

            <button
              type="button"
              className="admin-primary-button"
              onClick={savePermissions}
            >
              <Check size={15} />
              Save Permissions
            </button>

          </div>

        </div>

        <div className="permission-table-wrapper">

          <table className="permission-table">

            <thead>

              <tr>

                <th>
                  Area
                </th>

                {permissionTypes.map(
                  (permission) => (
                    <th key={permission}>
                      {permission}
                    </th>
                  )
                )}

              </tr>

            </thead>

            <tbody>

              {permissionAreas.map(
                (area) => (

                  <tr key={area}>

                    <td>
                      <strong>
                        {area}
                      </strong>
                    </td>

                    {permissionTypes.map(
                      (permission) => {

                        const enabled =
                          permissions[
                            selectedRole
                          ]?.[area]?.[
                            permission
                          ];

                        return (
                          <td
                            key={permission}
                          >

                            <button
                              type="button"
                              className={
                                enabled
                                  ? "permission-allowed"
                                  : "permission-denied"
                              }
                              onClick={() =>
                                updatePermission(
                                  area,
                                  permission,
                                  !enabled
                                )
                              }
                              aria-label={`${permission} ${area}`}
                            >
                              {enabled ? (
                                <Check
                                  size={16}
                                />
                              ) : (
                                "—"
                              )}
                            </button>

                          </td>
                        );
                      }
                    )}

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

      </section>

      {/* =====================================
          ADD / EDIT STAFF MODAL
      ===================================== */}

      {showModal && (

        <div className="staff-modal-overlay">

          <div className="staff-modal">

            <div className="staff-modal-header">

              <div>

                <h2>
                  {editingMember
                    ? "Edit Staff Member"
                    : "Add Staff Member"}
                </h2>

                <p>
                  {editingMember
                    ? "Update staff information."
                    : "Create a new team member."}
                </p>

              </div>

              <button
                type="button"
                className="staff-modal-close"
                onClick={closeModal}
              >
                <X size={20} />
              </button>

            </div>

            <form onSubmit={handleSubmit}>

              <label>

                Full Name

                <input
                  required
                  value={form.name}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      name: event.target.value,
                    })
                  }
                  placeholder="Enter full name"
                />

              </label>

              <label>

                Email Address

                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      email: event.target.value,
                    })
                  }
                  placeholder="name@example.com"
                />

              </label>

              <label>

                Assign Role

                <select
                  value={form.role}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      role: event.target.value,
                    })
                  }
                >
                  <option value="Staff">
                    Staff
                  </option>

                  <option value="Admin">
                    Admin
                  </option>

                  <option value="Super Admin">
                    Super Admin
                  </option>

                </select>

              </label>

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
                  {editingMember
                    ? "Save Changes"
                    : "Add Member"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </main>
  );
}

export default Staff;