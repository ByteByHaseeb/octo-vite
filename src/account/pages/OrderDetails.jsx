import React from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, PackageCheck } from "lucide-react";

function OrderDetails() {
  const { orderId } = useParams();

  return (
    <div className="account-page">
      <Link to="/account/orders" className="account-back-link">
        <ArrowLeft size={16} /> Back to Orders
      </Link>

      <div className="account-page-heading">
        <div>
          <p className="account-eyebrow">ORDER INFORMATION</p>
          <h1>Order #{orderId}</h1>
          <p>Placed on September 20, 2026</p>
        </div>

        <span className="account-status processing">
          Processing
        </span>
      </div>

      <section className="account-panel">
        <div className="account-panel-heading">
          <div>
            <h2>
              <PackageCheck size={20} /> Order Summary
            </h2>
            <p>Sample order information</p>
          </div>
        </div>

        <div className="account-order-product">
          <div className="account-product-placeholder">
            <PackageCheck size={28} />
          </div>

          <div>
            <strong>Premium Everyday Essentials</strong>
            <p>Quantity: 1</p>
          </div>

          <strong>£45.50</strong>
        </div>

        <div className="account-order-total">
          <span>Subtotal</span>
          <strong>£45.50</strong>
          <span>Shipping</span>
          <strong>Free</strong>
          <span>Total</span>
          <strong>£45.50</strong>
        </div>
      </section>
    </div>
  );
}

export default OrderDetails;