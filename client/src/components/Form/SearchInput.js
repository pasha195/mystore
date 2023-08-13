import React, { useState } from "react";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaTimes } from "react-icons/fa"; // Import the search and close icons

const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false); // State for search bar open/close

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    setValues({ ...values, keyword: e.target.value });
  };

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isSearchOpen) {
      setValues({ ...values, keyword: "" });
    }
  };

  const inputBorderColor = values.keyword ? "1px solid black" : "none";

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <div>
        {isSearchOpen ? (
          <form
            className="d-flex search-form search-form-open"
            role="search"
            onSubmit={handleSubmit}
            style={{ width: "100%" }}
          >
            <div
              style={{
                position: "relative",
                flex: "1",
                display: "flex",
                alignItems: "center", // Center the icon vertically with the input field
                border: inputBorderColor,
                borderRadius: "30px",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
              }}
            >
              <input
                className="form-control"
                type="search"
                placeholder="Search..."
                aria-label="Search"
                value={values.keyword}
                onChange={handleInputChange}
                style={{
                  border: "none", // Remove the border for the input field
                  outline: "none",
                  padding: "10px 15px",
                  width: "100%",
                  borderRadius: "30px",
                  fontSize: "16px",
                }}
              />
              <button
                className="search-button"
                type="submit"
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  outline: "none",
                  cursor: "pointer",
                  padding: "1px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "40px",
                  height: "40px",
                }}
              >
                <FaSearch style={{ color: "gray" }} />
              </button>
            </div>
            <button
              type="button"
              onClick={handleSearchToggle}
              style={{
                backgroundColor: "transparent",
                border: "none",
                outline: "none",
                cursor: "pointer",
                padding: "1px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "40px",
                height: "40px",
              }}
            >
              <FaTimes style={{ color: "gray" }} />
            </button>
          </form>
        ) : (
          <button
            style={{
              border: "none",
              backgroundColor: "transparent",
              width: "68px",
            }}
            onClick={handleSearchToggle}
          >
            Search <FaSearch style={{ color: "gray" }} />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchInput;
