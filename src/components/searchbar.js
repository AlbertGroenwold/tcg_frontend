import React, { useState,useEffect,useRef} from "react";
import styles from "../styles/searchbar.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const Searchbar = () => {
  const navigate = useNavigate(); // Use navigate hook from react-router
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [allData, setAllData] = useState([]); // To hold all data fetched from the backend

  const searchRef = useRef(null); // Reference for the search input
  const suggestionsRef = useRef(null); // Reference for the suggestions list


  // Fetch suggestions data from the backend on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/allItems/");
        setAllData(response.data); // Set the fetched data to state // Set the fetched data to state
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []); 

  // Close suggestions if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current && !searchRef.current.contains(event.target) &&
        suggestionsRef.current && !suggestionsRef.current.contains(event.target)
      ) {
        setFilteredResults([]); // Clear suggestions when clicking outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

   // Handle input change and filter results
   const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.trim() === "") {
      setFilteredResults([]);
      return;
    }

    const matches = allData.filter((item) =>
      item.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredResults(matches);
  };

  const handleSearch = (event , searchQuery) => {
    if (!searchQuery) return; // Don't search if query is empty
    event.preventDefault();
    try {
      // Navigate to the search results page and pass the query as a URL parameter
      navigate(`/results?item=${encodeURIComponent(searchQuery)}`);
      setFilteredResults([]);
    } catch (err) {
      console.error(err); // Log error for debugging
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion); // Set the search query to the clicked suggestion
    handleSearch({ preventDefault: () => {} }, suggestion); // Trigger search with the clicked suggestion
  };

  return (
      <form onSubmit={(e) => handleSearch(e, searchQuery)} className={styles.search_container}>
        <input
          ref={searchRef}
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          id={styles.search_bar}
          placeholder="Search..."
        />
        <button
          type="submit"
          className={`${styles.search_btn} fa-solid fa-magnifying-glass`}
        ></button>
        {filteredResults.length > 0 && (
        <ul className={styles.search_suggestions_list} ref={suggestionsRef}>
          {filteredResults.map((item, index) => (
            <li
              key={index}
              className={styles.search_suggestions_list_item}
              onClick={() => handleSuggestionClick(item)} // Optional: Select item on click
            >
              {item}
            </li>
          ))}
        </ul>
      )}
      </form>
      
  );
};

export default Searchbar;
