import React, { useEffect, useRef, useState } from "react";
import "./Header.css";

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const headerRef = useRef(null);

  const navigation = [
    {
      name: "Shop",
      megaMenu: true,
      columns: [
        {
          title: "Categories",
          links: [
            "Best Sellers",
            "New Arrivals",
            "Health & Wellness",
            "Beauty & Hygiene",
            "Grocery",
          ],
        },
        {
          title: "Home & Family",
          links: [
            "Household",
            "Baby Products",
            "Pet Products",
            "Personal Care",
          ],
        },
        {
          title: "Featured",
          links: [
            "Premium Collection",
            "Trending Products",
            "Special Offers",
            "Clearance",
          ],
        },
      ],
    },
    {
      name: "Beauty",
      megaMenu: true,
      columns: [
        {
          title: "Beauty",
          links: [
            "Skincare",
            "Hair Care",
            "Body Care",
            "Makeup",
            "Fragrances",
          ],
        },
        {
          title: "Popular Brands",
          links: [
            "Dove",
            "Nivea",
            "Unilever",
            "Lattafa",
            "Johnson's",
          ],
        },
      ],
    },
    {
      name: "Perfumes",
      megaMenu: true,
      columns: [
        {
          title: "Collections",
          links: [
            "Men's Fragrances",
            "Women's Fragrances",
            "Unisex Fragrances",
            "Perfume Sets",
          ],
        },
        {
          title: "Brands",
          links: [
            "Lattafa",
            "Maison Alhambra",
            "Ard Al Zaafaran",
            "Fragrance World",
          ],
        },
      ],
    },
    {
      name: "Wholesale",
      link: "#",
    },
    {
      name: "About",
      link: "#",
    },
  ];

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target)
      ) {
        setActiveMenu(null);
        setSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Prevent page scrolling when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const toggleMenu = (menuName) => {
    setActiveMenu(
      activeMenu === menuName ? null : menuName
    );
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setActiveMenu(null);
  };

  const handleSearch = (event) => {
    event.preventDefault();

    if (!searchValue.trim()) return;

    console.log("Searching for:", searchValue);
  };

  return (
    <header
      className="site-header"
      ref={headerRef}
    >
      <div className="header-container">

        {/* Logo */}
        <a
          href="#"
          className="header-logo"
          onClick={closeMobileMenu}
        >
          <span className="logo-mark">B</span>

          <span className="logo-text">
            BIG<span>BRANDS</span>
          </span>
        </a>

        {/* Desktop Navigation */}
    <nav className="desktop-navigation">
  {navigation.map((item) => (
    <div
      className="nav-item"
      key={item.name}
    >
      {item.megaMenu ? (
        <button
          className="nav-link nav-dropdown-button"
          type="button"
        >
          {item.name}

          <span className="nav-chevron">
            ↓
          </span>
        </button>
      ) : (
        <a
          href={item.link}
          className="nav-link"
        >
          {item.name}
        </a>
      )}

      {item.megaMenu && (
        <div className="mega-menu">
          <div className="mega-menu-inner">

            {item.columns.map((column, index) => (
              <div
                className="mega-column"
                key={index}
              >
                <h4>{column.title}</h4>

                <div className="mega-links">
                  {column.links.map((link) => (
                    <a
                      href="#"
                      key={link}
                    >
                      <span>{link}</span>

                      <span className="mega-arrow">
                        →
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            ))}

            <div className="mega-feature">
              <span className="feature-label">
                FEATURED
              </span>

              <h3>
                Discover something exceptional.
              </h3>

              <p>
                Explore our premium collection
                of carefully selected products.
              </p>

              <a href="#">
                Explore Collection →
              </a>
            </div>

          </div>
        </div>
      )}
    </div>
  ))}
</nav>

        {/* Right Actions */}
        <div className="header-actions">

          {/* Desktop Search */}
          <form
            className="desktop-search"
            onSubmit={handleSearch}
          >
            <span className="search-icon">
              ⌕
            </span>

            <input
              type="text"
              placeholder="Search products..."
              value={searchValue}
              onChange={(event) =>
                setSearchValue(event.target.value)
              }
            />

            {searchValue && (
              <button
                type="button"
                className="search-clear"
                onClick={() => setSearchValue("")}
              >
                ×
              </button>
            )}
          </form>

          {/* Account */}
          <button
            className="header-icon-button"
            type="button"
            aria-label="Account"
          >
            ♙
          </button>

          {/* Cart */}
          <button
            className="header-icon-button cart-button"
            type="button"
            aria-label="Cart"
          >
            ♧

            <span className="cart-count">
              0
            </span>
          </button>

          {/* Mobile Search */}
          <button
            className="mobile-search-button"
            onClick={() => setSearchOpen(!searchOpen)}
            type="button"
            aria-label="Search"
          >
            ⌕
          </button>

          {/* Hamburger */}
        <button
  className={`hamburger ${mobileMenuOpen ? "is-open" : ""}`}
  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
  type="button"
  aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
  aria-expanded={mobileMenuOpen}
>
  <span></span>
  <span></span>
  <span></span>
</button>
</div>
</div>


      {/* Mobile Search */}
      <div
        className={`mobile-search ${
          searchOpen ? "is-visible" : ""
        }`}
      >
        <form onSubmit={handleSearch}>
          <span>⌕</span>

          <input
            type="text"
            placeholder="Search products..."
            value={searchValue}
            onChange={(event) =>
              setSearchValue(event.target.value)
            }
          />

          <button type="submit">
            Search
          </button>
        </form>
      </div>

      {/* Mobile Menu */}
      <div
        className={`mobile-menu ${
          mobileMenuOpen ? "is-open" : ""
        }`}
      >
        <div className="mobile-menu-inner">

          {navigation.map((item) => (
            <div
              className="mobile-nav-item"
              key={item.name}
            >
              {item.megaMenu ? (
                <>
                  <button
                    className="mobile-nav-link"
                    onClick={() => toggleMenu(item.name)}
                    type="button"
                  >
                    <span>{item.name}</span>

                    <span
                      className={`mobile-chevron ${
                        activeMenu === item.name
                          ? "rotate"
                          : ""
                      }`}
                    >
                      +
                    </span>
                  </button>

                  <div
                    className={`mobile-submenu ${
                      activeMenu === item.name
                        ? "show"
                        : ""
                    }`}
                  >
                    {item.columns.map((column) => (
                      <div
                        className="mobile-column"
                        key={column.title}
                      >
                        <h4>{column.title}</h4>

                        {column.links.map((link) => (
                          <a
                            href="#"
                            key={link}
                            onClick={closeMobileMenu}
                          >
                            {link}
                          </a>
                        ))}
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <a
                  href={item.link}
                  className="mobile-nav-link"
                  onClick={closeMobileMenu}
                >
                  {item.name}
                </a>
              )}
            </div>
          ))}

          {/* Mobile CTA */}
          <div className="mobile-cta">
            <span>
              Looking for wholesale?
            </span>

            <a href="#">
              Explore B2B →
            </a>
          </div>

        </div>
      </div>
    </header>
  );
}

export default Header;