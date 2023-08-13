import React, { useState, useEffect } from "react";
import { NavLink, Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd"
import { FaRegHeart } from "react-icons/fa";
import '../../styles/Header.css'
import Swal from 'sweetalert2';
const Header = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false); // Track scrolling state
  useEffect(() => {
    // Listen for scroll events and update the scrolled state
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    // toast.success("Logout Successfully");
    Swal.fire({
      icon: 'success',
      title: 'Logged Out',
      text: 'You have been logged out successfully.',
      timer: 2000,
      showConfirmButton: false,
    });
  };


  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 995px)");
    setIsSmallScreen(mediaQuery.matches);

    const handleResize = () => {
      setIsSmallScreen(mediaQuery.matches);
    };

    mediaQuery.addListener(handleResize);

    return () => {
      mediaQuery.removeListener(handleResize);
    };
  }, []);
  useEffect(() => {
    const startLoading = () => {
      setIsLoading(true);
    };

    const finishLoading = () => {
      setIsLoading(false);
    };

    const timeoutId = setTimeout(startLoading, 300);


    const loadingTimeoutId = setTimeout(finishLoading, 1000);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(loadingTimeoutId);
    };
  }, []);
  return (
    <>
      {isLoading && (
        <div
          style={{
            height: "3px",
            position: "fixed",
            top: "66px",
            left: 0,
            width: "100%",
            backgroundColor: "red",
            zIndex: 9999,
            transition: "width 0.3s",
          }}
        />
      )}
      <nav
        className={`navbar navbar-expand-lg fixed-top ${menuOpen ? "navbar-open" : ""
          } ${isScrolled ? "scrolled" : ""}`}
      >
        <div className="container-fluid">
          <div style={{ backgroundColor: 'transparent' }} className="col-md-3">

            <Link to="/" className="navbar-brand">
              <img
                className="logo"
                src={require("../../../src/logo.png")}
                alt="Logo"
                style={{
                  width: "140px",
                  height: "50px",
                  userSelect: "none",
                  objectFit: "contain",
                }}
              />
            </Link>
          </div>

          {isSmallScreen && (
            <button
              style={{
                border: "none",
                background: "none",
                padding: "0.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#000",
                transition: "color 0.3s",
              }}
              className={`navbar-toggler ${menuOpen ? "collapsed" : ""}`}
              type="button"
              onClick={toggleMenu}
              aria-expanded={menuOpen}
            >
              <span className="" style={{ fontSize: "1.2rem" }}>
                {!menuOpen ? (
                  <i className="fas fa-bars"></i>
                ) : (
                  <i className="fas fa-times"></i>
                )}
              </span>
            </button>
          )}

          <div
            className={`col-md-4 collapse navbar-collapse ${menuOpen ? "show" : ""}`}
            id="navbarNav"
          >
            <div className={`navbar-nav m-auto justify-content-center `}>
              <NavLink
                to="/"
                className="nav-link"
                style={{
                  color: "#000",
                  fontFamily: "sans-serif",
                  fontWeight: "bold",
                  transition: "color 0.3s",
                  fontSize: "12px",
                }}
              >
                Home
              </NavLink>
              <NavLink
                to="/categories"
                className="nav-link"
                style={{
                  color: "#000",
                  fontFamily: "sans-serif",
                  fontWeight: "bold",
                  transition: "color 0.3s",
                  fontSize: "12px",
                }}
              >
                Shop
              </NavLink>

              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to={"/categories"}
                  data-bs-toggle="dropdown"
                  style={{
                    color: "#000",
                    fontFamily: "sans-serif",
                    fontWeight: "bold",
                    transition: "color 0.3s",
                    fontSize: "12px",
                    position: "relative",
                  }}
                >

                  Categories
                  <span
                    style={{
                      position: "absolute",
                      top: "-10px",
                      right: "-10px",
                      color: "red",
                      padding: "3px 6px",
                      fontSize: "10px",
                    }}
                  >
                    New
                  </span>
                </Link>

                <ul className="dropdown-menu  slide-dowm">
                  <li>
                    <Link
                      className="dropdown-item"
                      to={"/categories"}
                      style={{ color: "#000", transition: "color 0.3s" }}
                    >
                      All Categories
                    </Link>
                  </li>
                  {categories?.map((c) => (
                    <li key={c.id}>
                      <Link
                        className="dropdown-item"
                        to={`/category/${c.slug}`}
                        style={{ color: "#000", transition: "color 0.3s" }}
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

            </div>

            <div className={`navbar-nav ms-auto  ${menuOpen ? "menu-open" : ""}`} style={{ marginRight: '10px' }}>

              <span
                className="heart-icon"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  marginRight: "10px",
                  cursor: 'pointer'
                }}
              >
                <FaRegHeart />
              </span>
              {!auth?.user ? (
                <>

                  <NavLink
                    to="/register"
                    className="nav-link"
                    style={{
                      color: "#000",
                      fontFamily: "sans-serif",
                      fontWeight: "bold",
                      transition: "color 0.3s",
                      fontSize: "12px",
                    }}
                  >
                    Register
                  </NavLink>
                  <NavLink
                    to="/login"
                    className="nav-link"
                    style={{
                      color: "#000",
                      fontFamily: "sans-serif",
                      fontWeight: "bold",
                      transition: "color 0.3s",
                      fontSize: "12px",
                    }}
                  >
                    Login
                  </NavLink>
                </>
              ) : (
                <li className="nav-item dropdown">
                  <NavLink
                    className="nav-link dropdown-toggle"
                    to="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    style={{
                      border: "none",
                      color: "#000",
                      transition: "color 0.3s",
                      fontSize: "12px",
                    }}
                  >
                    {auth?.user?.name}
                  </NavLink>
                  <ul className="dropdown-menu">
                    <li>
                      <NavLink
                        to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                        className="dropdown-item"
                        style={{
                          color: "#000",
                          transition: "color 0.3s",
                          fontSize: "12px",
                        }}
                      >
                        Dashboard
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        onClick={handleLogout}
                        to="/login"
                        className="dropdown-item"
                        style={{
                          color: "#000",
                          transition: "color 0.3s",
                          fontSize: "12px",
                        }}
                      >
                        Logout
                      </NavLink>
                    </li>
                  </ul>
                </li>
              )}

              <NavLink
                to="/cart"
                className="nav-link"
                style={{
                  color: "#000",
                  transition: "color 0.3s",
                  fontSize: "12px",
                  fontWeight: 'bold'
                }}
              >
                <Badge
                  style={{
                    backgroundColor: "transparent",
                    color: `${isScrolled ? 'white' : "orange"}`
                  }}
                  count={cart?.length}
                  showZero
                  offset={[10, -5]}
                >
                  🛒Cart
                </Badge>

              </NavLink>

            </div>


          </div>

          {/* <SearchInput
          style={{
            border: "none",
            outline: "none",
            padding: "5px 10px",
            borderRadius: "20px",
            backgroundColor: "#f2f2f2",
            transition: "background-color 0.3s",
          }}
        /> */}
        </div>
      </nav>
    </>
  );
};

export default Header;
