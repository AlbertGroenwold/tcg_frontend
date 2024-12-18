import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/home.css"; // Global styles

const HomePage = () => {
  const [sections, setSections] = useState({
    new: [],
    on_sale: [],
    best_sellers: [],
    top_rated: [],
    fallback: [],
  });

  const tilesData = [
    {
      name: "Pokémon",
      image: "/images/pokemon.jpg",
      subcategories: [
        { name: "Booster Boxes", image: "/images/booster_boxes.jpg" },
        { name: "Booster Packs", image: "/images/booster_packs.jpg" },
      ],
    },
    {
      name: "Accessories",
      image: "/images/accessories.jpg",
      subcategories: [
        { name: "Sleeves", image: "/images/sleeves.jpg" },
        { name: "Binders", image: "/images/binders.jpg" },
      ],
    },
    {
      name: "test",
      image: "/images/accessories.jpg",
      subcategories: [
        { name: "testSleeves", image: "/images/sleeves.jpg" },
        { name: "testBinders", image: "/images/binders.jpg" },
      ],
    },
    
    {
      name: "test 2",
      image: "/images/accessories.jpg",
      subcategories: [
        { name: "test 2Sleeves", image: "/images/sleeves.jpg" },
        { name: "test 2Binders", image: "/images/binders.jpg" },
      ],
    },
    {
      name: "test 3",
      image: "/images/accessories.jpg",
      subcategories: [
        { name: "test 3Sleeves", image: "/images/sleeves.jpg" },
        { name: "test 3Binders", image: "/images/binders.jpg" },
      ],
    },
  ];

  useEffect(() => {
    // Fetch all homepage sections dynamically
    fetch("http://127.0.0.1:8000/api/homepage/")
      .then((response) => response.json())
      .then((data) => setSections(data))
      .catch((error) => console.error("Error fetching homepage sections:", error));
  }, []);

  const renderItemSection = (title, items) => (
    <div className="section">
      <h2>{title}</h2>
      <div className="items-container">
        {items.length > 0 ? (
          items.map((item) => (
            <div key={item.id} className="item-card">
              <Link to={`/product/${item.name}`} className="item-link">
                <img
                  src={item.image || "/images/placeholder.jpg"}
                  alt={item.name}
                  className="item-image"
                />
                <h3 className="item-name">{item.name}</h3>
                {item.discount_price ? (
                  <p className="item-price">
                    <span className="original-price">R {item.original_price}</span>{" "}
                    R {item.price}
                  </p>
                ) : (
                  <p className="item-price">R {item.price}</p>
                )}
              </Link>
            </div>
          ))
        ) : (
          <p>No items available.</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="homepage-container">
      {/* Top Div with Tiles */}
      <div className="tiles-container">
        {tilesData.map((category, index) => (
          <div key={index} className="tile-row">
            <div className="tile">
            <Link to={`/collections/${category.name}`} className="item-link">
              <img
                src={category.image}
                alt={category.name}
                className="tile-image"
              />
              </Link>
              <p className="tile-title">{category.name}</p>
            </div>
            {category.subcategories.map((subcategory, subIndex) => (
              <div key={subIndex} className="tile">
              <Link to={`/collections/${subcategory.name}`} className="item-link">
                <img
                  src={subcategory.image}
                  alt={subcategory.name}
                  className="tile-image"
                />
              </Link>
                <p className="tile-title">{subcategory.name}</p>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Dynamic Sections */}
      {renderItemSection("New", sections.new)}
      {renderItemSection("On Sale", sections.on_sale)}
      {renderItemSection("Best Sellers", sections.best_sellers)}
      {renderItemSection("Top Rated", sections.top_rated)}

      {/* Fallback Items */}
      {sections.fallback.length > 0 &&
        renderItemSection("Featured Items", sections.fallback)}
    </div>
  );
};

export default HomePage;
