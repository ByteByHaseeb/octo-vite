import React, { useState } from "react";
import "./FeaturedProducts.css";

const productCollections = {
  Fragrances: [
    {
      id: 1,
      brand: "Lattafa",
      title: "Khamrah Eau de Parfum",
      description:
        "A warm and luxurious fragrance with rich gourmand and woody notes.",
      price: 49.99,
      salePrice: 39.99,
      image:
        "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=85",
      badge: "BEST SELLER",
    },
    {
      id: 2,
      brand: "Maison Alhambra",
      title: "Amber & Oud Eau de Parfum",
      description:
        "An elegant blend of amber, oud and warm oriental accords.",
      price: 44.99,
      salePrice: 34.99,
      image:
        "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=900&q=85",
      badge: "SAVE 22%",
    },
    {
      id: 3,
      brand: "Ard Al Zaafaran",
      title: "Oud Collection",
      description:
        "A sophisticated oriental fragrance designed for a lasting impression.",
      price: 39.99,
      salePrice: 31.99,
      image:
        "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=900&q=85",
      badge: "POPULAR",
    },
    {
      id: 4,
      brand: "Ahmed Al Maghribi",
      title: "Royal Blend Parfum",
      description:
        "A refined fragrance combining fresh, floral and deep woody notes.",
      price: 59.99,
      salePrice: 47.99,
      image:
        "https://images.unsplash.com/photo-1587017539504-67cfbddac569?auto=format&fit=crop&w=900&q=85",
      badge: "NEW",
    },
  ],

  Beauty: [
    {
      id: 5,
      brand: "Dove",
      title: "Beauty Care Essentials",
      description:
        "Everyday personal care essentials designed for gentle skin care.",
      price: 14.99,
      salePrice: 11.99,
      image:
        "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=900&q=85",
      badge: "SAVE 20%",
    },
    {
      id: 6,
      brand: "Nivea",
      title: "Hydrating Skin Care Set",
      description:
        "A simple daily routine for soft, hydrated and healthy-looking skin.",
      price: 24.99,
      salePrice: 19.99,
      image:
        "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=900&q=85",
      badge: "POPULAR",
    },
    {
      id: 7,
      brand: "Unilever",
      title: "Daily Beauty Essentials",
      description:
        "A curated selection of trusted beauty and hygiene essentials.",
      price: 19.99,
      salePrice: 15.99,
      image:
        "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=900&q=85",
      badge: "BEST SELLER",
    },
    {
      id: 8,
      brand: "Premium Care",
      title: "Complete Care Collection",
      description:
        "Premium everyday products for your personal care routine.",
      price: 29.99,
      salePrice: 23.99,
      image:
        "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=900&q=85",
      badge: "NEW",
    },
  ],

  Health: [
    {
      id: 9,
      brand: "Wellness",
      title: "Daily Wellness Essentials",
      description:
        "Everyday wellness products selected for a healthier lifestyle.",
      price: 22.99,
      salePrice: 18.99,
      image:
        "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=900&q=85",
      badge: "POPULAR",
    },
    {
      id: 10,
      brand: "VitaCare",
      title: "Wellness Care Pack",
      description:
        "A convenient selection of everyday health and wellness essentials.",
      price: 34.99,
      salePrice: 27.99,
      image:
        "https://images.unsplash.com/photo-1550572017-edd951b55104?auto=format&fit=crop&w=900&q=85",
      badge: "SAVE 20%",
    },
    {
      id: 11,
      brand: "Care Plus",
      title: "Personal Care Essentials",
      description:
        "Trusted essentials for your everyday personal care needs.",
      price: 17.99,
      salePrice: 14.99,
      image:
        "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=900&q=85",
      badge: "BEST SELLER",
    },
    {
      id: 12,
      brand: "Wellness Co.",
      title: "Everyday Health Pack",
      description:
        "Simple and practical products for your daily wellness routine.",
      price: 26.99,
      salePrice: 21.99,
      image:
        "https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&w=900&q=85",
      badge: "NEW",
    },
  ],

  Baby: [
    {
      id: 13,
      brand: "Johnson's",
      title: "Gentle Baby Care",
      description:
        "Gentle everyday essentials specially selected for baby care.",
      price: 18.99,
      salePrice: 14.99,
      image:
        "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=900&q=85",
      badge: "BEST SELLER",
    },
    {
      id: 14,
      brand: "Baby Care",
      title: "Baby Essentials Set",
      description:
        "A practical collection of trusted essentials for little ones.",
      price: 29.99,
      salePrice: 23.99,
      image:
        "https://images.unsplash.com/photo-1604917019116-4b9f2e5e7f2a?auto=format&fit=crop&w=900&q=85",
      badge: "SAVE 20%",
    },
    {
      id: 15,
      brand: "Little One",
      title: "Baby Daily Care",
      description:
        "Soft and gentle products for everyday baby care.",
      price: 16.99,
      salePrice: 13.99,
      image:
        "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=900&q=85",
      badge: "POPULAR",
    },
    {
      id: 16,
      brand: "Baby Essentials",
      title: "Complete Baby Pack",
      description:
        "Everything you need for a simple and comfortable baby routine.",
      price: 39.99,
      salePrice: 31.99,
      image:
        "https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&w=900&q=85",
      badge: "NEW",
    },
  ],

  Household: [
    {
      id: 17,
      brand: "Home Essentials",
      title: "Everyday Cleaning Care",
      description:
        "Reliable household essentials for a cleaner, fresher home.",
      price: 12.99,
      salePrice: 9.99,
      image:
        "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=900&q=85",
      badge: "SAVE 23%",
    },
    {
      id: 18,
      brand: "Clean Home",
      title: "Home Care Essentials",
      description:
        "Practical products designed to make everyday cleaning easier.",
      price: 19.99,
      salePrice: 15.99,
      image:
        "https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=900&q=85",
      badge: "POPULAR",
    },
    {
      id: 19,
      brand: "Fresh Home",
      title: "Kitchen Essentials",
      description:
        "Useful everyday products for a cleaner and organised kitchen.",
      price: 15.99,
      salePrice: 12.99,
      image:
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=900&q=85",
      badge: "BEST SELLER",
    },
    {
      id: 20,
      brand: "Home Care",
      title: "Premium Home Collection",
      description:
        "A curated selection of practical household essentials.",
      price: 27.99,
      salePrice: 22.99,
      image:
        "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=900&q=85",
      badge: "NEW",
    },
  ],
};

const collectionTabs = Object.keys(productCollections);

function calculateDiscount(price, salePrice) {
  return Math.round(((price - salePrice) / price) * 100);
}

function FeaturedProducts() {
  const [activeCollection, setActiveCollection] = useState("Fragrances");
  const [wishlist, setWishlist] = useState([]);

  const products = productCollections[activeCollection];

  const toggleWishlist = (productId) => {
    setWishlist((current) =>
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId]
    );
  };

  return (
    <section className="featured-products" id="featured">
      <div className="featured-products-container">

        {/* Header */}
        <div className="products-header">
          <div className="products-heading">
            <span className="products-eyebrow">
              CURATED SELECTION
            </span>

            <h2>
              Featured
              <span> Products.</span>
            </h2>
          </div>

          <p>
            Discover customer favourites and carefully selected
            products from our most popular collections.
          </p>
        </div>

        {/* Collection Tabs */}
        <div className="product-tabs-wrapper">
          <div className="product-tabs" role="tablist">
            {collectionTabs.map((collection) => (
              <button
                key={collection}
                type="button"
                className={`product-tab ${
                  activeCollection === collection ? "active" : ""
                }`}
                onClick={() => setActiveCollection(collection)}
              >
                {collection}
              </button>
            ))}
          </div>
        </div>

        {/* Products */}
        <div className="products-grid" key={activeCollection}>
          {products.map((product) => {
            const discount = calculateDiscount(
              product.price,
              product.salePrice
            );

            const saving = (
              product.price - product.salePrice
            ).toFixed(2);

            const isWishlisted = wishlist.includes(product.id);

            return (
              <article className="product-card" key={product.id}>

                {/* Image */}
                <div className="product-image-wrapper">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="product-image"
                  />

                  <span className="product-badge">
                    {product.badge}
                  </span>

                  <button
                    type="button"
                    className={`wishlist-button ${
                      isWishlisted ? "active" : ""
                    }`}
                    onClick={() => toggleWishlist(product.id)}
                    aria-label={
                      isWishlisted
                        ? "Remove from wishlist"
                        : "Add to wishlist"
                    }
                  >
                    {isWishlisted ? "♥" : "♡"}
                  </button>

                  <button
                    type="button"
                    className="quick-view-button"
                  >
                    Quick View
                  </button>
                </div>

                {/* Details */}
                <div className="product-details">
                  <span className="product-brand">
                    {product.brand}
                  </span>

                  <h3>{product.title}</h3>

                  <p className="product-description">
                    {product.description}
                  </p>

                  <div className="product-rating">
                    <span>★★★★★</span>
                    <small>4.8</small>
                  </div>

                  {/* Pricing */}
                  <div className="product-pricing">
                    <span className="product-sale-price">
                      £{product.salePrice.toFixed(2)}
                    </span>

                    <span className="product-original-price">
                      £{product.price.toFixed(2)}
                    </span>

                    <span className="product-discount">
                      -{discount}%
                    </span>
                  </div>

                  <div className="product-saving">
                    You save £{saving}
                  </div>

                  {/* CTA */}
                  <button
                    type="button"
                    className="product-cart-button"
                  >
                    <span>Add to Cart</span>
                    <span>+</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="products-footer">
          <a href="#all-products" className="products-view-button">
            View All Products
            <span>→</span>
          </a>
        </div>

      </div>
    </section>
  );
}

export default FeaturedProducts;