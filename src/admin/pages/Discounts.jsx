import React from "react";
import AdminPage from "../components/AdminPage";

function Discounts() {
  return (
    <AdminPage
      title="Discounts"
      description="Create and manage discount codes and promotions."
      actionLabel="+ Create Discount"
    >
      <div className="admin-empty-state">
        <h2>Discounts</h2>

        <p>
          Discount codes and promotional rules will be
          managed here.
        </p>
      </div>
    </AdminPage>
  );
}

export default Discounts;