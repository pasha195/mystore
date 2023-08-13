import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";
import { useAuth } from "../../context/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";

const Login = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/auth/login`, values);
        if (res && res.data.success) {
          Swal.fire({
            icon: 'success',
            title: 'Login Successful',
            text: res.data.message,
            timer: 2000, // Display success message for 1.5 seconds
            showConfirmButton: false,
          });
          setAuth({
            ...auth,
            user: res.data.user,
            token: res.data.token,
          });
          localStorage.setItem("auth", JSON.stringify(res.data));
          navigate(location.state || "/");
        }
        
         else {
          toast.error(res.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
    },
  });

  return (
    <Layout title="Login - Ecommerce App">
      <div className="form-container" style={{ minHeight: "90vh", }}>
        <form onSubmit={formik.handleSubmit}>
          <h4 className="title"> LOGIN </h4>

          <div className="mb-3">
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`form-control ${formik.touched.email && formik.errors.email ? "error" : ""}`}
              id="exampleInputEmail1"
              placeholder="Enter Your Email"
              required
            />
            {formik.touched.email && formik.errors.email && (
              <div style={{ color: 'red', fontSize: '0.8rem', marginTop: '0.5rem' }} className="error-message">{formik.errors.email}</div>
            )}
          </div>

            <div className="mb-3">
              <input
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`form-control ${formik.touched.password && formik.errors.password ? "error" : ""}`}
                id="exampleInputPassword1"
                placeholder="Enter Your Password"
                required
              />
              {formik.touched.password && formik.errors.password && (
                <div style={{ color: 'red', fontSize: '0.8rem', marginTop: '0.5rem' }} className="error-message">{formik.errors.password}</div>
              )}
            
          
        </div>




      <button type="submit" className="btn btn-primary"
        style={{ width: '100%' }}>

        LOGIN
      </button>
      <div className="login-link my-2 mx-5">
        Don't have an account ?
        <Link style={{ color: 'black', margin: '5px', textDecoration: 'none', color: 'teal' }} to="/register">Register</Link>
      </div>
      <a
        style={{
          cursor: 'pointer',
          textDecoration: 'none',
          backgroundColor: 'transparent',
          display: 'flex',
          justifyContent: 'center', 
          color: 'gray',
          border: 'none',
          marginTop: '1rem', 
        }}
        className=""
        onClick={() => {
          navigate("/forgot-password");
        }}
      >
        Forgot Password
      </a>
    </form>
      </div >
    </Layout >
  );
};

export default Login;
