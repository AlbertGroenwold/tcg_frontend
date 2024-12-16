import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles.css"; // Import the external CSS file

const Sidebar = ({ categories = [] }) => {
  const [expanded, setExpanded] = useState([]); // Track expanded sections
  const [selectedCategory, setSelectedCategory] = useState(null); // Track the selected category
  const navigate = useNavigate();
  const location = useLocation(); // Hook to monitor the current route

  // Reset expanded state when location changes
  useEffect(() => {
    if (location.pathname === "/cart" || location.pathname === "/account") {
      setExpanded([]); // Reset expanded categories
      setSelectedCategory(null); // Clear selected category
    }
  }, [location.pathname]);

  // Toggle expand/collapse for a section
  const toggleExpand = (categoryId, parentId = null) => {
    if (expanded.includes(categoryId)) {
      setExpanded((prev) => prev.filter((id) => id !== categoryId));
    } else {
      if (parentId === null) {
        setExpanded([categoryId]); // Collapse other top-level categories
      } else {
        setExpanded((prev) => [...prev, categoryId]);
      }
    }
  };

  // Handle category clicks
  const handleCategoryClick = (category) => {
    setSelectedCategory(category.id); // Set the clicked category as selected

    if (category.children && category.children.length > 0) {
      toggleExpand(category.id, category.parent);
    } else {
      navigate(`/collections/${encodeURIComponent(category.name)}`);
    }
  };

  // Recursive function to render categories and their children
  const renderCategories = (categories, level = 0) => {
    return (
      <ul className={`sidebar-list ${level === 0 ? "top-level" : "nested"}`}>
        {categories.map((category) => {
          const isSelected = selectedCategory === category.id;
          const isAncestor =
            expanded.includes(category.id) ||
            category.children?.some(
              (child) =>
                selectedCategory === child.id || expanded.includes(child.id)
            );

          return (
            <li key={category.id} className="sidebar-item">
              <span
                className={`sidebar-link ${
                  isSelected || isAncestor ? "bold" : ""
                }`}
                onClick={() => handleCategoryClick(category)}
              >
                {category.name}
              </span>
              {expanded.includes(category.id) &&
                category.children &&
                renderCategories(category.children, level + 1)}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <aside className="sidebar-container">
      <nav>{renderCategories(categories)}</nav>
    </aside>
  );
};

export default Sidebar;
