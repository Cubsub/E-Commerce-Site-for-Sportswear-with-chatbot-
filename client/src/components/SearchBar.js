import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate(); // Get the navigate function

  // Handle the input change
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle the search button click or form submit
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Redirect to search results page with the search query
      navigate(`/search?q=${searchTerm}`);
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSearch}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search for products..."
      />
      <button type="submit" className="btn btn-primary">Search</button>
    </form>
  );
};

export default SearchBar;
