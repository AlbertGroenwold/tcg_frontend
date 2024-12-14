import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    alert("Searching for: " + searchQuery);
  };

  const handleAccountClick = () => {
    navigate("/account");
  };

  return (
    <header>
      <div className="left-section">
        <div className="social-media-icons">
          <a href="https://facebook.com" className="fab fa-facebook" aria-label="Facebook"></a>
          <a href="https://twitter.com" className="fab fa-twitter" aria-label="Twitter"></a>
          <a href="https://instagram.com" className="fab fa-instagram" aria-label="Instagram"></a>
        </div>
        <div className="logo">Logo</div>
      </div>
      <div className="search-container">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          id="search-bar"
          placeholder="Search..."
        />
        <button
          className="search-btn fa-solid fa-magnifying-glass"
          onClick={handleSearch}
        ></button>
      </div>
      <div className="right-section">
        <button
          className="icon-btn fa-solid fa-circle-info"
          aria-label="Information"
        />
        <button className="icon-btn" aria-label="Shopping Cart">
          <i className="fas fa-shopping-cart"></i>
        </button>
        <button
          className="icon-btn"
          aria-label="Account Page"
          onClick={handleAccountClick}>
          <i className="fas fa-user"></i>
        </button>
      </div>
    </header>
  );
};

export default Header;
