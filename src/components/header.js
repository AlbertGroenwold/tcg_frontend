import React, { useState } from "react";
import styles from "../styles/header.module.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const handleInfoClick = () => {
    // Scroll to footer when the information button is clicked
    const footer = document.getElementById("footer");
    footer.scrollIntoView({ behavior: "smooth" });
  };

  const navigate = useNavigate();  // Use navigate hook from react-router
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState([]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value); // Update the state with the current input value
  };

  const handleSearch = () => {
    if (!searchQuery) return;  // Don't search if query is empty

    try {
      // Navigate to the search results page and pass the query as a URL parameter
      navigate(`/results?item=${encodeURIComponent(searchQuery)}`);
    } catch (err) {
      console.error(err);  // Log error for debugging
    }
  };

  

  return (
    <header>
      <div className="left-section">
        <div className={styles.social_media_icons}>
          <a
            href="https://facebook.com"
            className="fab fa-facebook"
            aria-label="Facebook"
          ></a>
          <a
            href="https://twitter.com"
            className="fab fa-twitter"
            aria-label="Twitter"
          ></a>
          <a
            href="https://instagram.com"
            className="fab fa-instagram"
            aria-label="Instagram"
          ></a>
        </div>
        <div className="logo"><a href="/">Logo</a></div>
      </div>
      <div className={styles.search_container}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          id={styles.search_bar}
          placeholder="Search..."
        />
        <button
          className={`${styles.search_btn} fa-solid fa-magnifying-glass`}
          onClick={handleSearch}
        ></button>
      </div>
      <div className={styles.right_section}>
        <button
          className={`${styles.icon_btn} fa-solid fa-circle-info`}
          aria-label="Information"
          onClick={handleInfoClick}
        />

        <button className={styles.icon_btn} aria-label="Shopping Cart">
          <i className="fas fa-shopping-cart"></i>
        </button>
        <button className={styles.icon_btn} aria-label="Account Page">
          <i className="fas fa-user"></i>
        </button>
      </div>
    </header>
  );
};

export default Header;
