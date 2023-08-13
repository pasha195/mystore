import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
const Products = () => {
  const [products, setProducts] = useState([]);

  //getall products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/product/get-product`);
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Someething Went Wrong");
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Layout>
      <div className=" dashboard">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-12">
          <h1 className="text-center">All Products List</h1>
         <div className="row">
         <div className="col-md-3"></div>
         <div className="col-md-9">
         <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <Link
                key={p._id}
                to={`/dashboard/admin/product/${p.slug}`}
                className="product-link"
              >

                <div className="row">
                  <div className="col-md-3"></div>
                  <div className="card m-2 col-md-7" style={{ width: "18rem", height: 'auto' }}>
                    <img
                      src={`${process.env.REACT_APP_API_URL}/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-text">{p.description}</p>
                    </div>
                  </div>

                </div>

              </Link>
            ))}
          </div>
         </div>
         </div>
       
        </div>
      </div>
    </Layout>
  );
};

export default Products;