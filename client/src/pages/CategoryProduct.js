import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/CategoryProductStyles.css";
import axios from "axios";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [loadingCategory, setLoadingCategory] = useState(true);

  useEffect(() => {
    if (params?.slug) getProductsByCat();
  }, [params?.slug]);

  const getProductsByCat = async () => {
    try {
      setLoadingCategory(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
      setLoadingCategory(false);
    } catch (error) {
      console.log(error);
      setLoadingCategory(false);
    }
  };
  const spinnerContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  };

  return (
    <Layout>
      {loadingCategory ? (
        <div style={spinnerContainerStyle}>
          <Spin indicator={<LoadingOutlined style={{ fontSize: 48, color: "red" }} spin />} />
        </div>
      ) : (
        <div className="container" style={{marginTop:'100px'}}>
          <h4 className="text-center">Category - {category?.name}</h4>
          <h6 className="text-center">{products?.length} results found</h6>
          <div className="row">
            {products?.map((p) => (
              <div className="col-md-4 col-12" key={p._id}>
                <div className="card m-2">
                  <img
                    src={`${process.env.REACT_APP_API_URL}/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <div className="card-name-price d-flex justify-content-between">
                      <h5 className="card-title">{p.name}</h5>
                      <h5 className="card-title card-price">
                        {p.price.toLocaleString("en-PK", {
                          style: "currency",
                          currency: "PKR",
                        })}
                      </h5>
                    </div>

                    <h5 className="card-title card-price">
                        {p.discountedPrice.toLocaleString("en-PK", {
                          style: "currency",
                          currency: "PKR",
                        })}
                      </h5>
                    <p className="card-text">{p.description.substring(0, 60)}...</p>

                    <div className="card-name-price">
                      <button
                        style={{ width: "100%",color:'white',backgroundColor:'orange' }}
                        className="btn btn-info ms-1"
                        onClick={() => navigate(`/product/${p.slug}`)}
                      >
                        More Details
                      </button>
                   
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default CategoryProduct;
