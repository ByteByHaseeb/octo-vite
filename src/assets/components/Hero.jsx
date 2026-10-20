import React from "react";
import "./Hero.css";

function Hero() {
  return (
    <section className="hero-section">
      {/* Background Effects */}
      <div className="hero-glow hero-glow-one"></div>
      <div className="hero-glow hero-glow-two"></div>
      <div className="hero-orb hero-orb-one"></div>
      <div className="hero-orb hero-orb-two"></div>

      <div className="hero-grid"></div>

      <div className="hero-container">

        {/* Left Content */}
        <div className="hero-content">

          {/* Premium Badge */}
          <div className="hero-badge">
            <span className="hero-badge-icon">✦</span>

            <span>Premium Products · Exceptional Value</span>
          </div>

          {/* Heading */}
     <h1 className="hero-title">
  Everything You Need,
  <br />
  <span className="hero-title-highlight">
    All In One Place.
  </span>
</h1>

          {/* Description */}
          <p className="hero-description">
            Discover a carefully selected collection of
            premium everyday essentials, beauty, wellness,
            fragrances and more delivered with quality
            you can trust.
          </p>

          {/* Feature Points */}
          <div className="hero-features">

            <div className="hero-feature">
              <span className="hero-feature-icon">✦</span>
              <span>Premium Quality</span>
            </div>

            <div className="hero-feature">
              <span className="hero-feature-icon">✓</span>
              <span>Trusted Products</span>
            </div>

            <div className="hero-feature">
              <span className="hero-feature-icon">◆</span>
              <span>Great Value</span>
            </div>

          </div>

          {/* CTA */}
          <div className="hero-actions">

            <a
              href="#collections"
              className="hero-primary-button"
            >
              <span>Explore Collection</span>

              <span className="hero-button-arrow">
                →
              </span>
            </a>

            <a
              href="#featured"
              className="hero-secondary-button"
            >
              View Best Sellers
            </a>

          </div>

          {/* Small Trust Text */}
          <div className="hero-trust">
            <span className="hero-trust-stars">
              ★★★★★
            </span>

            <span>
              Trusted quality for everyday essentials
            </span>
          </div>

        </div>

        {/* Right Visual */}
        <div className="hero-visual">

          <div className="hero-visual-glow"></div>

          {/* Main Glass Card */}
          <div className="hero-card hero-main-card">

            <div className="hero-card-top">
              <span>CURATED COLLECTION</span>

              <span className="hero-card-dot"></span>
            </div>

            <div className="hero-card-center">

              <div className="hero-card-circle">
                <span>BB</span>
              </div>

              <h3>
                Premium
                <br />
                Essentials
              </h3>

              <p>
                Carefully selected.
                <br />
                Simply better.
              </p>

            </div>

            <div className="hero-card-bottom">
              <span>EXPLORE</span>

              <span>↗</span>
            </div>

          </div>

          {/* Floating Card 1 */}
          <div className="hero-floating-card hero-floating-one">
            <span className="floating-icon">✦</span>

            <div>
              <strong>Premium</strong>
              <small>Quality Selection</small>
            </div>
          </div>

          {/* Floating Card 2 */}
          <div className="hero-floating-card hero-floating-two">
            <span className="floating-check">✓</span>

            <div>
              <strong>Trusted</strong>
              <small>Everyday Essentials</small>
            </div>
          </div>

        </div>

      </div>

      {/* Bottom Scroll Indicator */}
      <div className="hero-scroll">
        <span>SCROLL TO EXPLORE</span>

        <span className="hero-scroll-line"></span>
      </div>

    </section>
  );
}

export default Hero;