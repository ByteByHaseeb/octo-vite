import React from "react";
import { UserRound } from "lucide-react";

function AccountProfile() {
  return (
    <div className="account-page">
      <div className="account-page-heading">
        <div>
          <p className="account-eyebrow">ACCOUNT SETTINGS</p>
          <h1>My Profile</h1>
          <p>View and manage your personal information.</p>
        </div>
      </div>

      <section className="account-panel account-profile-panel">
        <div className="account-panel-heading">
          <div>
            <h2><UserRound size={20} /> Personal Information</h2>
            <p>Your account details</p>
          </div>
        </div>

        <form
          className="account-form"
          onSubmit={(event) => {
            event.preventDefault();
            alert("Profile editing will be connected later.");
          }}
        >
          <div className="account-form-grid">
            <label>
              First Name
              <input type="text" defaultValue="John" />
            </label>

            <label>
              Last Name
              <input type="text" defaultValue="Doe" />
            </label>

            <label>
              Email Address
              <input
                type="email"
                defaultValue="john@example.com"
              />
            </label>

            <label>
              Phone Number
              <input type="tel" placeholder="Enter phone number" />
            </label>
          </div>

          <button type="submit" className="account-primary-button">
            Save Changes
          </button>
        </form>
      </section>
    </div>
  );
}

export default AccountProfile;