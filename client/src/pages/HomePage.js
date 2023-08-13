import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox, Radio, Spin } from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../context/cart";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "./../components/Layout/Layout";
import "../styles/Homepage.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import SearchInput from "../components/Form/SearchInput";
import Swal from 'sweetalert2';
//import styles 👇
import 'react-modern-drawer/dist/index.css'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [isCategoryFilterOpen, setCategoryFilterOpen] = useState(false);
  const [isPriceFilterOpen, setPriceFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterOpen, setFilterOpen] = useState(false);




  // const handleAddToCart = (product) => {
  //   if (cart.some(item => item._id === product._id)) {
  //     toast.success('Item is already in the cart');
  //   } else {
  //     const updatedCart = [...cart, product];
  //     setCart(updatedCart);
  //     localStorage.setItem('cart', JSON.stringify(updatedCart));
  //     toast.success('Item added to cart');
  //   }
  // };


  const addToCart = (product) => {
    const existingItem = cart.find(item => item._id === product._id);
    if (existingItem) {
      const updatedCart = cart.map(item =>
        item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    } else {

      const updatedCart = [...cart, { ...product, quantity: 1, isNew: true }];
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      Swal.fire({
        icon: 'success',
        title: 'Added to Cart',
        text: 'Item added to your cart successfully.',
        showConfirmButton: false,
        timer: 1500, // Display success message for 1.5 seconds
      });
    }
  };



  useEffect(() => {
    // Load products and cart from localStorage on component mount
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);

  }, []);


  // Function to handle favorite click

  const handleFilterToggle = () => {
    setFilterOpen(!isFilterOpen);
  };
  const handleFavoriteClick = (product) => {
    const updatedProducts = products.map((p) => {
      if (p._id === product._id) {
        return { ...p, favorite: !p.favorite };
      }
      return p;
    });
    setProducts(updatedProducts);
  };
  const handleCategoryFilterToggle = () => {
    setCategoryFilterOpen(!isCategoryFilterOpen);
  };

  const handlePriceFilterToggle = () => {
    setPriceFilterOpen(!isPriceFilterOpen);
  };





  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //get total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/product/product-count`
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // filter by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //get filtered product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/product/product-filters`,
        {
          checked,
          radio,
        }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };


  const images = [
    require("../../../client/src/bannertop.jpg"),
    require("../../../client/src/banner.jpg"),


  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Function to increment the current index and loop back to 0 when reaching the end
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };
  const prevImageIndex = (currentImageIndex - 1 + images.length) % images.length;

  const imageStyles = {
    currentImage: {
      left: `-${currentImageIndex * 100}%`,
    },
    prevImage: {
      left: `-${prevImageIndex * 100}%`,
    },
  };
  // Automatically switch to the next image every 5 seconds
  useEffect(() => {
    const interval = setInterval(nextImage, 2000);
    return () => clearInterval(interval); // Clear interval on unmount
  }, []);





  return (
    <Layout title={"ALL Products - Your eCommerce Website "}>
      {/* banner image */}


      <div className="banner-container">
        <div className="slider-container">
          <div className="slider-images" style={imageStyles.currentImage}>
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`slider-image-${index}`}
                className="slider-image"
              />
            ))}
          </div>
          <div className="slider-images" style={imageStyles.prevImage}>
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`slider-image-${index}`}
                className="slider-image"
              />
            ))}
          </div>
        </div>
      </div>




      {/* banner image End*/}


      <div id='shop-items' className="container-fluid row home-page">


        <div className="col-md-12">
          {/* filter & search bar */}

          <div style={{ display: 'flex', alignItems: 'center' }}>


            <div style={{ position: 'relative', margin: '4px', padding: '8px', width: '100%' }}>
              <button
                className="btn btn-link"
                onClick={handleFilterToggle}
                style={{
                  marginBottom: '8px',
                  textDecoration: 'none',
                  color: 'gray',
                  fontWeight: isFilterOpen ? 'bold' : 'normal',
                }}
              >
                Filters
              </button>
              {isFilterOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: '0',
                    zIndex: '1',
                    backgroundColor: '#FFFFFF',
                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                    borderRadius: 'none',
                    border: '1px solid gray',
                    minWidth: '300px',
                    padding: '8px',
                    display: 'flex',
                    transition: '',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                  }}
                  className="d-flex flex-column"
                >
                  <div style={{ flex: '1' }}>
                    <button
                      className="btn btn-link"
                      onClick={handleCategoryFilterToggle}
                      style={{
                        marginBottom: '8px',
                        textDecoration: 'none',
                        color: 'gray',
                      }}
                    >
                      Category
                    </button>
                    {isCategoryFilterOpen && (
                      <div className="d-flex flex-column mx-2">
                        {/* Category Filter */}
                        {categories?.map((c) => (
                          <Checkbox
                            key={c._id}
                            onChange={(e) => handleFilter(e.target.checked, c._id)}
                          >
                            {c.name}
                          </Checkbox>
                        ))}
                      </div>
                    )}
                  </div>
                  <div style={{ flex: '1', borderTop: '1px solid gray', paddingTop: '8px' }}>
                    <button
                      className="btn btn-link"
                      onClick={handlePriceFilterToggle}
                      style={{
                        marginBottom: '8px',
                        textDecoration: 'none',
                        color: 'gray',
                      }}
                    >
                      Price
                    </button>
                    {isPriceFilterOpen && (
                      <div className="d-flex flex-column mx-2">
                        {/* Price Filter */}
                        <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                          {Prices?.map((p) => (
                            <div key={p._id}>
                              <Radio value={p.array}>{p.name}</Radio>
                            </div>
                          ))}
                        </Radio.Group>
                      </div>
                    )}
                  </div>
                  <button
                    className="btn btn-link"
                    style={{
                      marginBottom: '8px',
                      textDecoration: 'none',
                      color: 'black',
                      backgroundColor: 'orange'
                    }}
                    onClick={() => window.location.reload()}
                  >
                    Reset Filter
                  </button>

                </div>
              )}
            </div>


            <div style={{ marginLeft: 'auto' }}>
              <SearchInput />
            </div>
          </div>



          {loading ? (
            <div className="d-flex justify-content-center mt-5">
              <Spin size="large" />
            </div>
          ) : (
            <div className="row d-flex justify-content-flex-start">
              {products?.map((p) => (
                <div
                  className="col-md-3"
                  style={{ marginBottom: '10px' }}
                  key={p._id}
                >
                  <div className="card m-2" style={{ height: '100%', width: '100%' }}>
                    <img
                      onClick={() => navigate(`/product/${p.slug}`)}
                      src={`${process.env.REACT_APP_API_URL}/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                      style={{
                        height: '180px',
                        objectFit: 'contain',
                        transition: 'opacity 0.3s',
                        cursor: 'pointer',
                        position: 'relative',
                      }}

                      onLoad={() => setIsLoading(false)}
                      onMouseEnter={(e) => {
                        e.target.style.opacity = '0.8';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.opacity = '1';
                      }}
                    />
                    {isLoading && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '20%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                        }}
                      >
                        <div className="spinner-border" role="status" style={{ color: 'orange' }}>
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    )}

                    <div className="card-body">
                      <div className="card-name-price">
                        <div className="d-flex justify-content-between align-items-center">
                          <h5 className="card-title">{p.name}</h5>
                          <FontAwesomeIcon
                            icon={p.favorite ? solidHeart : regularHeart}
                            onClick={() => handleFavoriteClick(p)}
                            style={{
                              cursor: 'pointer',
                              color: p.favorite ? 'red' : 'gray',
                            }}
                          />
                        </div>
                        <p className="card-text">{p.description.substring(0, 20)}...</p>
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <h5 className="card-title card-price">
                              {p.price.toLocaleString('en-PK', {
                                style: 'currency',
                                currency: 'PKR',
                              })}
                            </h5>
                          </div>
                          <div>

                            <h6 style={{ color: 'gray', textDecoration: ' line-through' }} className="card-title card-price">
                              {p.discountedPrice.toLocaleString('en-PK', {
                                style: 'currency',
                                currency: 'PKR',

                              })}
                            </h6>

                          </div>

                        </div>


                      </div>

                      {/* cart button  */}

                      <div className="card-name-price" key={p._id}>
                        <button
                          style={{
                            backgroundColor: cart.some(item => item._id === p._id) ? 'gray' : 'orange',
                            fontWeight: 'bold',
                            fontFamily: 'sans-serif',
                            color: 'white',
                            transition: 'background-color 0.3s, color 0.3s',
                            borderRadius: '5px',
                            border: 'none',
                            width: '100%'
                          }}
                          className="btn btn-primary btn-block btn-add-to-cart"
                          onClick={() => addToCart(p)}
                          onMouseEnter={(e) => {
                            if (!cart.some(item => item._id === p._id)) {
                              e.target.style.backgroundColor = 'black';
                              e.target.style.color = 'white';
                              e.target.style.border = '1px solid white';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!cart.some(item => item._id === p._id)) {
                              e.target.style.backgroundColor = 'orange';
                              e.target.style.color = 'white';
                              e.target.style.border = 'none';
                            }
                          }}
                          disabled={cart.some(item => item._id === p._id)}
                        >
                          <FontAwesomeIcon icon={faShoppingCart} style={{ marginRight: "10px" }} />
                          {cart.some(item => item._id === p._id) ? 'ALREADY ADDED' : 'ADD TO CART'}
                        </button>
                      </div>





                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="m-2 p-3 d-flex justify-content-center">
            {products && products.length < total && (
              <div className="col col-sm-6 d-flex justify-content-center">
                <button
                  className="btn btn-outline-darkorange btn-sm btn-responsive"
                  onClick={() => setPage(page + 1)}
                  style={{
                    backgroundColor: 'white',
                    width: '60%',
                    color: 'orange',
                    fontFamily: 'math',
                    borderRadius: '0px',
                    fontWeight: 'bold',
                    fontSize: "15px",
                    border: '2px solid darkorange ',

                  }}
                >
                  See More
                </button>
              </div>
            )}
          </div>



        </div>

      </div>

      {/* {showNotification && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            zIndex: 9999,
            opacity: 0,
            animation: "modalFadeIn 0.3s forwards",
          }}
        >
          <div
            style={{
              width: "300px",
              height: "150px",
              backgroundColor: "#000",
              borderRadius: "8px",
              color: "#fff",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              position: "relative",
              transform: "translateY(-100%)",
              animation: "modalSlideDown 0.3s forwards",
            }}
          >
            <button
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                border: "none",
                backgroundColor: "transparent",
                fontSize: "20px",
                cursor: "pointer",
                marginLeft: "10px",
                color: "#fff",
              }}
              onClick={handleClose}
            >
              X
            </button>
            <h2 style={{ marginTop: "40px" }}>Limited time offer</h2>
            <p>on watch</p>
            <h3>{remainingTime}</h3>
          </div>
        </div>
      )} */}


    </Layout>
  );
};

export default HomePage;
