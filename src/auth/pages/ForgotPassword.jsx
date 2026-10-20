import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

function ForgotPassword() {
  return (
    <div className="auth-page">
      <div className="auth-container">

        <div className="auth-brand">
          <div className="auth-logo">O</div>
          <span>Octo</span>
        </div>

        <div className="auth-card">

          <div className="auth-header">
            <h1>Forgot password?</h1>

            <p>
              Enter your email and we'll send you
              instructions to reset your password.
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

            <button
              type="submit"
              className="auth-submit"
            >
              Send reset link
              <ArrowRight size={17} />
            </button>

          </form>

          <p className="auth-footer">
            Remember your password?{" "}
            <Link to="/login">
              Back to sign in
            </Link>
          </p>

        </div>

      </div>
    </div>
  );
}

export default ForgotPassword;