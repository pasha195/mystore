import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleSidebarToggle = (e) => {
    e.stopPropagation();
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  // const handleOutsideClick = (e) => {
  //   if (!e.target.closest(".sidebar") && isSidebarOpen) {
  //     setIsSidebarOpen(false);
  //   }
  // };

  // useEffect(() => {
  //   document.addEventListener("click", handleOutsideClick);

  //   return () => {
  //     document.removeEventListener("click", handleOutsideClick);
  //   };
  // }, [isSidebarOpen]);


  const sidebarStyles = {
    position: "fixed",
    top: 60,
    left: isSidebarOpen ? 0 : "-100%",
    width: "250px",
    height: "100vh",
    backgroundColor: "black",
    color: "white",
    transition: "left 0.3s ease-in-out",
    zIndex: 999,
  };

  const sidebarContainerStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
  };
  const sidebarLinkStyles = {
    display: "block",
    padding: "10px",
    marginBottom: "10px",
    textDecoration: "none",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    borderBottom: "1px solid white",
    width: "100%",
  };
  
  

  const closeButtonStyles = {
    position: "absolute",
    top: "10px",
    right: "10px",
    cursor: "pointer",
    color: "white",
    backgroundColor:"black",
    border:'none'
  };
  const menuIconStyles = {
    position: "absolute",
    top: "70px",
    left: isSidebarOpen ? "-100px" : "222px",
    backgroundColor: "white",
    color: "black",
    zIndex: 999,
    border: "none",
    color: "black",
    display: isSidebarOpen ? "none" : "block",
    fontSize: "24px",
  };
  
  return (
    <>
      <div style={sidebarStyles} className="sidebar">
        <div style={sidebarContainerStyles}>
          <button
            style={closeButtonStyles}
            onClick={handleSidebarToggle}
          >
            &#10005;
          </button>
          <h4>My Admin Panel</h4>
          <NavLink
            to="/dashboard/admin/create-category"
            style={sidebarLinkStyles}
            activeStyle={{ backgroundColor: "#333" }}
          >
            Create Category
          </NavLink>
          <NavLink
            to="/dashboard/admin/create-product"
            style={sidebarLinkStyles}
            activeStyle={{ backgroundColor: "#333" }}
          >
            Create Product
          </NavLink>
          <NavLink
            to="/dashboard/admin/products"
            style={sidebarLinkStyles}
            activeStyle={{ backgroundColor: "#333" }}
          >
            Products
          </NavLink>
          <NavLink
            to="/dashboard/admin/orders"
            style={sidebarLinkStyles}
            activeStyle={{ backgroundColor: "#333" }}
          >
            Orders
          </NavLink>
          {/* <NavLink
            to="/dashboard/admin/users"
            style={sidebarLinkStyles}
            activeStyle={{ backgroundColor: "#333" }}
          >
            Users
          </NavLink> */}
        </div>
      </div>
      <button
        style={menuIconStyles}
        onClick={handleSidebarToggle}
      >
        &#9776;
      </button>
    </>
  );
};

export default AdminMenu;
