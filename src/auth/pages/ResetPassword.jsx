import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

function ResetPassword() {
  const [showPassword, setShowPassword] =
    useState(false);

  return (
    <div className="auth-page">
      <div className="auth-container">

        <div className="auth-brand">
          <div className="auth-logo">O</div>
          <span>Octo</span>
        </div>

        <div className="auth-card">

          <div className="auth-header">
            <h1>Set new password</h1>

            <p>
              Create a new password for your account.
            </p>
          </div>

          <form className="auth-form">

            <div className="auth-field">
              <label>New password</label>

              <div className="auth-password">

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter new password"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

              </div>
            </div>

            <div className="auth-field">
              <label>Confirm password</label>

              <input
                type="password"
                placeholder="Confirm new password"
              />
            </div>

            <button
              type="submit"
              className="auth-submit"
            >
              Update password
              <ArrowRight size={17} />
            </button>

          </form>

          <p className="auth-footer">
            <Link to="/login">
              Back to sign in
            </Link>
          </p>

        </div>

      </div>
    </div>
  );
}

export default ResetPassword;