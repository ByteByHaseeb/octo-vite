import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

function Login() {
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
            <h1>Welcome back</h1>

            <p>
              Sign in to your account to continue.
            </p>
          </div>

          <form className="auth-form">

            <div className="auth-field">
              <label>Email address</label>

              <input
                type="email"
                placeholder="you@example.com"
              />
            </div>

            <div className="auth-field">

              <div className="auth-label-row">
                <label>Password</label>

                <Link to="/forgot-password">
                  Forgot password?
                </Link>
              </div>

              <div className="auth-password">
                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter your password"
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
              <span>Remember me</span>
            </label>

            <button
              type="submit"
              className="auth-submit"
            >
              Sign in
              <ArrowRight size={17} />
            </button>

          </form>

          <div className="auth-divider">
            <span>or</span>
          </div>

          <p className="auth-footer">
            Don't have an account?{" "}
            <Link to="/register">
              Create account
            </Link>
          </p>

        </div>

      </div>
    </div>
  );
}

export default Login;