import React from "react";
import AdminPage from "../components/AdminPage";

function Settings() {
  return (
    <AdminPage
      title="Settings"
      description="Manage your store and administrative settings."
    >
      <div className="admin-empty-state">
        <h2>Settings</h2>

        <p>
          Store configuration, staff permissions and other
          settings will be managed here.
        </p>
      </div>
    </AdminPage>
  );
}

export default Settings;