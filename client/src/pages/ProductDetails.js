import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ProductDetailsStyles.css";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import { faArrowDown, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Magnifier from 'react-magnifier';
import Swal from "sweetalert2";
const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [cart, setCart] = useCart();

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
  //initalp details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);
  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);

    } catch (error) {
      console.log(error);
    }
  };
  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="row container product-details">
        <div className="col-md-6">
        <Magnifier
            src={`${process.env.REACT_APP_API_URL}/api/v1/product/product-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
          />
        </div>
        <div className="col-md-6 product-details-info">
          <h1 className="text-center">Product Details</h1>
          <hr />
          <h6><b>Name</b> : {product.name}</h6>
          <h6><b>Description</b> : {product.description}</h6>

          <h6>
            <b>Price</b>  :
            {product?.price?.toLocaleString("en-PK", {
              style: "currency",
              currency: "PKR",
            })}
          </h6>

          <h6>
            <b>Discounted Price</b>  :
            {product?.discountedPrice?.toLocaleString("en-PK", {
              style: "currency",
              currency: "PKR",
            })}
          </h6>

          <h6><b>Category</b> : {product?.category?.name}</h6>

          <button
            style={{
              backgroundColor: cart.some(item => item._id === product._id) ? 'gray' : 'orange',
              fontWeight: 'bold',
              fontFamily: 'sans-serif',
              color: 'white',
              transition: 'background-color 0.3s, color 0.3s',
              borderRadius: '5px',
              border: 'none',
              width: '100%'
            }}
            className="btn btn-primary btn-block btn-add-to-cart"
            onClick={() => addToCart(product)}
            onMouseEnter={(e) => {
              if (!cart.some(item => item._id === product._id)) {
                e.target.style.backgroundColor = 'black';
                e.target.style.color = 'white';
                e.target.style.border = '1px solid white';
              }
            }}
            onMouseLeave={(e) => {
              if (!cart.some(item => item._id === product._id)) {
                e.target.style.backgroundColor = 'orange';
                e.target.style.color = 'white';
                e.target.style.border = 'none';
              }
            }}
            disabled={cart.some(item => item._id === product._id)}
          >
            <FontAwesomeIcon icon={faShoppingCart} style={{ marginRight: "10px" }} />
            {cart.some(item => item._id === product._id) ? 'ALREADY ADDED' : 'ADD TO CART'}
          </button>
        </div>
      </div>
      <hr />
      <div className="containr similar-products">
        <h4  style={{fontWeight:'bold',fontFamily:'math',display:'flex',alignItems:'center',justifyContent:'center'}} className="my-5">Similar Products   <FontAwesomeIcon color="orange" icon={faArrowDown} /> </h4> 
             {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products found</p>
        )}
        <div className="d-flex flex-wrap">
          {relatedProducts?.map((p) => (
            <div className="card m-5" key={p._id}>
              <img
                src={`${process.env.REACT_APP_API_URL}/api/v1/product/product-photo/${p._id}`}
              
                alt={p.name}
              
              />
              <div className="card-body">
                <div className="card-name-price">
                  <h5 className="card-title">{p.name}</h5>
                  <h5 className="card-title card-price">
                    {p.price.toLocaleString("en-PK", {
                      style: "currency",
                      currency: "PKR",
                    })}
                  </h5>

                </div>
                <div className="card-name-price">

                  <h6 style={{ color: 'gray', textDecoration: 'line-through' }}>
                    {p.discountedPrice.toLocaleString("en-PK", {
                      style: "currency",
                      currency: "PKR",
                    })}
                  </h6>

                </div>

                <p className="card-text ">
                  {p.description.substring(0, 60)}...
                </p>
                <div className="card-name-price">
                  <button
                    className="btn btn-dark ms-1"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;