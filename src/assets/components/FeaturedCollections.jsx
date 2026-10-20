import React from "react";
import "./FeaturedCollections.css";

const collections = [
  {
    id: 1,
    category: "Beauty & Hygiene",
    title: "Beauty Essentials",
    description: "Everyday beauty and personal care products selected for quality.",
    products: "120+ Products",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1200&q=85",
    size: "large",
  },
  {
    id: 2,
    category: "Fragrances",
    title: "Premium Fragrances",
    description: "Discover signature scents from renowned fragrance brands.",
    products: "85+ Products",
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1000&q=85",
    size: "small",
  },
  {
    id: 3,
    category: "Health & Wellness",
    title: "Health & Wellness",
    description: "Trusted essentials to support your everyday wellbeing.",
    products: "95+ Products",
    image:
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1000&q=85",
    size: "small",
  },
  {
    id: 4,
    category: "Baby Care",
    title: "Baby Essentials",
    description: "Gentle, trusted products made for little ones.",
    products: "70+ Products",
    image:
      "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=1000&q=85",
    size: "small",
  },
  {
    id: 5,
    category: "Household",
    title: "Home Essentials",
    description: "Practical household products for a cleaner, easier home.",
    products: "110+ Products",
    image:
      "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=1000&q=85",
    size: "small",
  },
  {
    id: 6,
    category: "Food & Drinks",
    title: "Food & Beverages",
    description: "Popular everyday favourites, snacks and refreshing drinks.",
    products: "100+ Products",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1000&q=85",
    size: "small",
  },
];

function FeaturedCollections() {
  return (
    <section className="featured-collections" id="collections">
      <div className="featured-collections-container">

        {/* Section Header */}
        <div className="collections-header">
          <div className="collections-heading">
            <span className="collections-eyebrow">
              CURATED FOR YOU
            </span>

            <h2>
              Explore Our
              <span> Collections.</span>
            </h2>
          </div>

          <p className="collections-intro">
            From everyday essentials to premium fragrances and
            wellness products, discover carefully selected collections
            designed to make shopping simple.
          </p>
        </div>

        {/* Collection Grid */}
        <div className="collections-grid">
          {collections.map((collection) => (
            <a
              href="#"
              className={`collection-card collection-card-${collection.size}`}
              key={collection.id}
            >
              <div className="collection-image-wrapper">
                <img
                  src={collection.image}
                  alt={collection.title}
                  className="collection-image"
                />

                <div className="collection-overlay"></div>
              </div>

              <div className="collection-content">
                <span className="collection-category">
                  {collection.category}
                </span>

                <h3>{collection.title}</h3>

                <p>{collection.description}</p>

                <div className="collection-bottom">
                  <span className="collection-products">
                    {collection.products}
                  </span>

                  <span className="collection-arrow">
                    ↗
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="collections-footer">
          <div>
            <span>DISCOVER MORE</span>
            <p>Explore our complete collection of products.</p>
          </div>

          <a href="#all-products" className="collections-button">
            View All Collections
            <span>→</span>
          </a>
        </div>

      </div>
    </section>
  );
}

export default FeaturedCollections;