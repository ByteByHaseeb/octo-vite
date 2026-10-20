import React from "react";

function AdminPage({
  title,
  description,
  actionLabel,
  children,
}) {
  return (
    <main className="admin-dashboard">
      <div className="admin-page-header">
        <div>
          <p className="admin-breadcrumb">
            Admin / {title}
          </p>

          <h1>{title}</h1>

          {description && (
            <p>{description}</p>
          )}
        </div>

        {actionLabel && (
          <button className="admin-primary-button">
            {actionLabel}
          </button>
        )}
      </div>

      {children}
    </main>
  );
}

export default AdminPage;