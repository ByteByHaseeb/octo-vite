import React from "react";
import "./Announcement-bar.css";

function AnnouncementBar() {
  const announcements = [
    "FREE SHIPPING ON ORDERS OVER £50",
    "SAVE 10% WITH CODE SAVE10",
    "PREMIUM PRODUCTS • GREAT VALUE",
    "SHOP NOW • LIMITED TIME OFFER",
  ];

  return (
    <div className="announcement-bar">
      <div className="announcement-glow announcement-glow-one"></div>
      <div className="announcement-glow announcement-glow-two"></div>

      <div className="announcement-track">
        {[...announcements, ...announcements].map((text, index) => (
          <React.Fragment key={index}>
            <div className="announcement-item">
              <span className="announcement-star">✦</span>
              <span>{text}</span>
            </div>

            <span className="announcement-divider">•</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default AnnouncementBar;