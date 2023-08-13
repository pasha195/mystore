import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
// import "../../styles/AuthStyles.css";

const Register = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      address: "",
      answer: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().required("Password is required"),
      phone: Yup.string()
        .matches(/^(\+92|0)?[0-9]{10}$/, "Invalid phone number")
        .required("Phone number is required")
        .test("phone-length", "Phone number should be 11 digits", (value) => value?.length === 11),
      address: Yup.string().required("Address is required"),
      answer: Yup.string().required("Answer is required"),
    }),
    onSubmit: async (values) => {
      try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/auth/register`, values);
        if (res && res.data.success) {
          toast.success(res.data && res.data.message);
          navigate("/login");
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
    },
  });


  return (
    <Layout title="Register - Ecommer App">
    <div className="my-5 d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      <div className="container rounded shadow" style={{ background: "white", padding: "20px", maxWidth: "400px",marginTop:'30px' }}>
        <form onSubmit={formik.handleSubmit}>
          <h4 className="title text-center animated-heading">REGISTER</h4>

              <div>

                <div className="mb-3">
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="fa fa-user"></i>
                    </span>
                    <input
                      type="text"
                      name="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="form-control"
                      id="name"
                      placeholder="Enter Your Name"
                      autoFocus
                    />
                  </div>
                  {formik.touched.name && formik.errors.name && (
                    <div style={{ color: 'red', fontSize: '0.8rem', marginTop: '0.5rem' }} className="error">{formik.errors.name}</div>
                  )}
                </div>
                <div className="mb-3">
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="fa fa-envelope"></i>
                    </span>
                    <input
                      type="email"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="form-control"
                      id="email"
                      placeholder="Enter Your Email"
                    />
                  </div>
                  {formik.touched.email && formik.errors.email && (
                    <div style={{ color: 'red', fontSize: '0.8rem', marginTop: '0.5rem' }} className="error">{formik.errors.email}</div>
                  )}
                </div>
                <div className="mb-3">
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="fa fa-lock"></i>
                    </span>
                    <input
                      type="password"
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="form-control"
                      id="password"
                      placeholder="Enter Your Password"
                    />
                  </div>
                  {formik.touched.password && formik.errors.password && (
                    <div style={{ color: 'red', fontSize: '0.8rem', marginTop: '0.5rem' }} className="error">{formik.errors.password}</div>
                  )}
                </div>
                <div className="mb-3">
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="fa fa-phone"></i>
                    </span>
                    <input
                      type="text"
                      name="phone"
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`form-control ${formik.touched.phone && formik.errors.phone ? "error" : ""}`}
                      id="phone"
                      placeholder="Enter Your Phone"
                    />
                  </div>
                  {formik.touched.phone && formik.errors.phone && (
                    <div style={{ color: 'red', fontSize: '0.8rem', marginTop: '0.5rem' }} className="error-message">{formik.errors.phone}</div>
                  )}
                </div>
                <div className="mb-3">
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="fa fa-address-card"></i>
                    </span>
                    <input
                      type="text"
                      name="address"
                      value={formik.values.address}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="form-control"
                      id="address"
                      placeholder="Enter Your Address"
                    />
                  </div>
                  {formik.touched.address && formik.errors.address && (
                    <div style={{ color: 'red', fontSize: '0.8rem', marginTop: '0.5rem' }} className="error">{formik.errors.address}</div>
                  )}
                </div>
                <div className="mb-3">
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="fa fa-star"></i>
                    </span>
                    <input
                      type="text"
                      name="answer"
                      value={formik.values.answer}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="form-control"
                      id="answer"
                      placeholder="Add Favorite Sport"
                    />
                  </div>
                  {formik.touched.answer && formik.errors.answer && (
                    <div style={{ color: 'red', fontSize: '0.8rem', marginTop: '0.5rem' }} className="error">{formik.errors.answer}</div>
                  )}
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  Already have an account?
                  <Link
                    className={`logintocontinue ${isHovered ? 'hovered' : ''}`}
                    to="/login"
                    style={{ color: 'teal', margin: '5px', textDecoration: 'none', transition: 'color 0.3s ease' }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    Login
                  </Link>
                </div>

                <div className="d-flex justify-content-center">
                  <button type="submit" className="btn btn-dark m-auto btn-md my-2" style={{ width: "100%", borderRadius: '0px' }}>
                    REGISTER
                  </button>

                </div>




              </div>

            </form>
          </div>
      </div>
      <style>
        {`
    .animated-heading {
      animation-name: slideIn;
      animation-duration: 1s;
      animation-delay: 0.5s;
      animation-fill-mode: forwards;
      opacity: 0;
    }

    @keyframes slideIn {
      from {
        transform: translateY(-20px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }

    .animated-heading:hover {
      transition: color 0.3s ease;
      color: teal;
    }
  `}
      </style>


    </Layout>

  );
};

export default Register;



