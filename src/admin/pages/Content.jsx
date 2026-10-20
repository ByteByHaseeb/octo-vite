import React from "react";
import AdminPage from "../components/AdminPage";

function Content() {
  return (
    <AdminPage
      title="Content"
      description="Manage banners, homepage sections and store content."
    >
      <div className="admin-empty-state">
        <h2>Content Management</h2>

        <p>
          Homepage content and promotional sections will
          be managed here.
        </p>
      </div>
    </AdminPage>
  );
}

export default Content;