import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

function Register() {
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
            <h1>Create your account</h1>

            <p>
              Join Octo and start shopping.
            </p>
          </div>

          <form className="auth-form">

            <div className="auth-row">

              <div className="auth-field">
                <label>First name</label>

                <input
                  type="text"
                  placeholder="John"
                />
              </div>

              <div className="auth-field">
                <label>Last name</label>

                <input
                  type="text"
                  placeholder="Smith"
                />
              </div>

            </div>

            <div className="auth-field">
              <label>Email address</label>

              <input
                type="email"
                placeholder="you@example.com"
              />
            </div>

            <div className="auth-field">
              <label>Password</label>

              <div className="auth-password">

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Create a password"
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

            <label className="auth-checkbox">
              <input type="checkbox" />
              <span>
                I agree to the Terms and Privacy Policy
              </span>
            </label>

            <button
              type="submit"
              className="auth-submit"
            >
              Create account
              <ArrowRight size={17} />
            </button>

          </form>

          <p className="auth-footer">
            Already have an account?{" "}
            <Link to="/login">
              Sign in
            </Link>
          </p>

        </div>

      </div>
    </div>
  );
}

export default Register;