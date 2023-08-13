import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import toast from "react-hot-toast";
import "../styles/CartStyles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faShoppingBag, faTimes } from "@fortawesome/free-solid-svg-icons";
import Magnifier from "react-magnifier";
import Modal from "react-modal";
import ProductDetails from './ProductDetails';
import emailjs from "emailjs-com";
import Swal from "sweetalert2";

Modal.setAppElement("#root");

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const initialCart = JSON.parse(localStorage.getItem("cart")) || [];
  const [showSendOrder, setShowSendOrder] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [btnLoading, setbtnLoading] = useState(false);
  const productNames = [...new Set(cart.map(item => item.name))];



  useEffect(() => {
    getToken();
    setShowSendOrder(cart.length > 0);
  }, [auth?.token]);

  const openModal = () => {
    setIsModalOpen(true);
  };


  const closeModal = () => {
    setIsModalOpen(false);
  };

  const sendOrderWithoutPayment = async () => {
    try {
      if (cart.length === 0) {
        return;
      }


      openModal();

      
    } catch (error) {
      console.log(error);
    }
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    contact: Yup.string()
      .required('Contact number is required')
      .test('is-pakistan-number', 'Invalid Pakistan contact number', value => {
        // Validate Pakistan phone number format
        const phoneRegex = /^[+]?[0-9]{11}$/;
        return phoneRegex.test(value);
      }),
  });


  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map(item => {
        total += item.price * item.quantity;
      });
      return total.toLocaleString("en-PK", {
        style: "currency",
        currency: "PKR",
      });
    } catch (error) {
      console.log(error);
    }
  };


  // Delete item
  const removeCartItem = (productId) => {
    const updatedCart = cart.filter(item => item._id !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/product/braintree/token`
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  // Handle payments
  const handlePayment = async () => {
    try {
      if (cart.length === 0) {
        return; // Do not process payment if cart is empty
      }

      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/product/braintree/payment`,
        {
          nonce,
          cart,
        }
      );
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
  });

  const [isSendOrderDisabled, setIsSendOrderDisabled] = useState(true);


  useEffect(() => {
    setIsSendOrderDisabled(
      formData.name.trim() === '' ||
      formData.email.trim() === '' ||
      formData.contact.trim() === ''
    );
  }, [formData]);




  const sendOrderonEmail = async (values) => {
    values.preventDefault(); // Prevent the default form submission behavior

    try {
      setbtnLoading(true);

      if (cart.length === 0) {
        return;
      }

      // Send email using EmailJS
      const templateParams = {
        from_name: formData.name,
        to_email: "mabdullahnasir01@gmail.com",
        message_html: `Order details:
          Product Names: ${productNames.join(", ")}
          Price: ${totalPrice()}
          Name: ${formData.name}
          Email: ${formData.email}
          Contact: ${formData.contact}
          Address: ${auth?.user?.address}`,
      };

      await emailjs.send(
        'service_2kgy84k',
        'template_fqq6b15',
        templateParams,
        "o8T8dbMRHPaw5cZcc"
      );

      // Show success alert and close modal
      Swal.fire({
        icon: "success",
        title: "THANK YOU!",
        text: "Your Order Has been send! Our team will contact you soon.",
      }).then((result) => {
        if (result.isConfirmed) {
          closeModal();
          setCart([]); // Clear the cart
          localStorage.removeItem("cart"); // Remove items from localStorage
        }
      });
    } catch (error) {
      console.error("Error sending Order:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error sending Order. Please try again later...",
      });

    }
    finally {
      setbtnLoading(false);
    }
  };




  return (
    <Layout>

      <div className="cart-page" style={{backgroundColor:'white'}}>
      
        <div style={{backgroundColor:'black',borderBottomRightRadius:'40px',borderBottomLeftRadius:'40px'}}>
          <div className="col-md-12">
            <h1 style={{color:'white'}} className="text-center p-2">
              {!auth?.user
                ? "Hello Guest"
                : `Hi  ${auth?.token && auth?.user?.name}`}
              <p className="text-center">
                {cart?.length
                  ? `You Have  ${cart.length} items in your cart ${auth?.token ? "" : "please login to checkout !"
                  }`
                  : " Your Cart Is Empty"}
              </p>
            </h1>
          </div>
        </div>


        <div className="container" >
          <div className="row">


            <div className="col-md-7" >


              {cart?.map((p) => (
                <div className="row d-flex flex-row card cart-item-card" key={p._id}>
                  <div className="col-md-4 cart-item-image">
                    <Magnifier
                      src={`${process.env.REACT_APP_API_URL}/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                    />
                  </div>
                  <div className="col-md-8 cart-item-details">

                    <h6 className="cart-item-name">Product Name:  {p.name}</h6>

                    {p.description && <p className="cart-item-description">{p.description.substring(0, 50)}</p>}
                    <p className="cart-item-price">  Price: Rs. {p.price} </p>
                    <FontAwesomeIcon className="mt-2" style={{ cursor: 'pointer', position: 'absolute', top: '0px', right: '10px' }} icon={faTimes} onClick={() => removeCartItem(p._id)} />
                  </div>
                  <div className="col-md-4"></div>
                  <div className="col-md-8 cart-quantity-control">


                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => {

                        const itemIndex = cart.findIndex(item => item._id === p._id);

                        if (itemIndex !== -1) {

                          const updatedCart = [...cart];
                          if (updatedCart[itemIndex].quantity > 1) {
                            updatedCart[itemIndex].quantity -= 1;
                          } else {
                            updatedCart.splice(itemIndex, 1);
                          }

                          setCart(updatedCart);
                          localStorage.setItem('cart', JSON.stringify(updatedCart));
                        }
                      }}
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </button>


                    <span className="cart-item-quantity">

                      {p.quantity}
                    </span>



                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => {
                        // Find the item index in the cart
                        const itemIndex = cart.findIndex(item => item._id === p._id);

                        if (itemIndex !== -1) {
                          // Clone the cart array to avoid modifying the state directly
                          const updatedCart = [...cart];
                          updatedCart[itemIndex].quantity += 1;

                          setCart(updatedCart);
                          localStorage.setItem('cart', JSON.stringify(updatedCart));
                        }
                      }}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>

                  </div>

                </div>
              ))}


              {cart?.length === 0 && (
                <div className="text-center my-5">
                  <button
                    style={{ borderRadius: '30px' }}
                    className="btn btn-dark"
                    onClick={() => navigate("/")}
                  >
                    Continue Shopping
                    <FontAwesomeIcon className="mx-2" icon={faShoppingBag} />
                  </button>
                </div>
              )}
            </div>



            <div className="col-md-5 cart-summary my-4" >
              <h2>Cart Details</h2>
              <p>Total | Checkout | Payment</p>
              <hr />

              <div className="mb-3">
                <div className="card shadow">
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <h5>Total</h5>
                      <h3 style={{ color: 'green' }}>{totalPrice()}</h3>
                    </div>
                  </div>
                </div>
              </div>

              {auth?.user?.address ? (
                <>
                  <div className="mb-3">
                    <div className="card shadow">
                      <div className="card-body">
                        <div className="d-flex justify-content-between">
                          <h5>Current Address</h5>
                          <div className="col-md-6"> <h5 style={{ color: 'orange' }}>{auth.user.address}</h5></div>
                        </div>
                      </div>
                    </div>

                    <button
                      style={{
                        borderRadius: '0px', maxWidth: '450px',
                        width: '100%',
                      }}
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  </div>
                </>
              ) : (
                <div className="mb-3">
                  {auth?.token ? (
                    <button

                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() =>
                        navigate("/login", {
                          state: "/cart",
                        })
                      }
                    >
                      Please Login to checkout
                    </button>
                  )}
                </div>
              )}
              <div className="mt-2">
                {/* Conditionally render the "Send Order Without Payment" button */}
                {showSendOrder && (
                  <button
                    style={{
                      maxWidth: "450px",
                      width: "100%",
                      border: "1px solid teal",
                      borderRadius: "0px",
                      backgroundColor: "orange",
                    }}
                    className="btn btn-dark my-3 mb-3 btn-payment"
                    onClick={sendOrderWithoutPayment}
                    disabled={loading || !auth?.user?.address}
                  >
                    Send Order Without Payment
                  </button>
                )}
              </div>
              <div className="mt-2">
                {!clientToken || !auth?.token || !cart?.length ? (
                  ""
                ) : (
                  <>
                    <DropIn

                      options={{

                        authorization: clientToken,
                        // paypal: {
                        //   flow: "vault",
                        // },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                      style={{
                        zIndex: 1001, // Set a higher value than the modal's z-index
                      }}
                    />
                    <button
                      style={{
                        maxWidth: '450px', // Set the maximum width of the button
                        width: '100%', // Take up the full available width within the maxWidth limit
                        border: '1px solid teal',
                        borderRadius: '0px',
                        backgroundColor: 'black',
                      }}
                      className="btn btn-dark my-3 mb-3 btn-payment"
                      onClick={handlePayment}
                      disabled={loading || !instance || !auth?.user?.address}
                    >
                      {loading ? "Processing ...." : "Make Payment"}
                    </button>

                  </>
                )}

              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen} closeModal={closeModal}
        onRequestClose={closeModal}
        contentLabel="Order Details Modal"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            zIndex: 1000,
          },
          content: {
            position: "absolute",
            top: "55%",
            left: "50%",

            transform: "translate(-50%, -50%)",
            maxWidth: "9 00px",
            width: "90%",
            height: "80%",
            padding: "30px",
            borderRadius: "10px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            zIndex: 1001,
            backgroundColor: "#fff",
          },
        }}
      >
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button onClick={closeModal} style={{ border: "none", background: "none" }}>
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </button>
        </div>
        <h2 style={{ marginBottom: "20px", justifyContent: 'center', alignItems: 'center', display: 'flex' }}>Order Details</h2>

        <Formik
          initialValues={{
            name: '',
            email: '',
            contact: '',
            
          }}
          validationSchema={validationSchema}
          onSubmit={sendOrderonEmail}
        >
          <form>


            <div className="form-group">
              <div className="product-container">
                <label>Product Name:</label>
                <div className="product-name">

                  {productNames.map(name => (
                    <option key={name} value={name}>{name}</option>
                  ))}
                </div>
              </div>

            </div>

            <div className="form-group">
              <label htmlFor="totalprice">Total Price </label>
              <input type="text" id="totalprice" className="form-control" value={totalPrice()} readOnly />
            </div>

            <div className="form-group">
              <label htmlFor="name">Name</label>
              <Field

                name="name"
                placeholder="Enter Your name"
                id="name"
                className="form-control"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                required
                placeholder="Enter Your email"
                type="email"
                id="email"
                className="form-control"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />

            </div>
            <div className="form-group">
              <label htmlFor="contact">Contact</label>
              <input
                required
                placeholder="Enter Your contact number"
                type="tel"
                id="contact"
                className="form-control"
                value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Address</label>
              <textarea id="message" rows="4" value={auth?.user?.address} className="form-control" readOnly></textarea>
            </div>

            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <button
                type="submit"
                className="btn btn-dark"
                onClick={sendOrderonEmail}
                disabled={isSendOrderDisabled || btnLoading}
              >
                {btnLoading ? "Sending ..." : "Send Order"}
              </button>

            </div>
          </form>

        </Formik>
      </Modal>


    </Layout>
  );
};

export default CartPage;



