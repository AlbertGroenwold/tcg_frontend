import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";  // To access the query in the URL

const SearchResults = () => {
  const [results, setResults] = useState([]);  // Search results state
  const location = useLocation();  // Get current URL location

  // Extract the query parameter from the URL
  const query = new URLSearchParams(location.search).get("item");

  useEffect(() => {
    if (!query) return;  // If there's no query, don't make a request

    const fetchResults = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/search/`, {
          params: { item: query },
        });
        setResults(response.data || []);  // Set search results
      } catch (err) {
        console.error(err);  // Log any errors
      }
    };

    fetchResults();
  }, [query]);  // Re-run when the query changes

  return (
    <div>
      <h1>Search Results for: "{query}"</h1>
      <ul>
        {results.length > 0 ? (
          results.map((item) => (
            <li key={item.id}>
              <Link to={`/product/${item.id}`}>{item.name}</Link>
            </li>
          ))
        ) : (
          <li>No results found</li>
        )}
      </ul>
    </div>
  );
};

export default SearchResults;
