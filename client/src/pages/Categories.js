import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useCategory from "../hooks/useCategory";
import Layout from "../components/Layout/Layout";
import SearchInput from "../components/Form/SearchInput";

const Categories = () => {
  const categories = useCategory();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(categories.length === 0);
  }, [categories]);

  return (
    <Layout title={"All Categories"}>
      <div className="container" style={{ marginTop: "100px" }}>
        {/* <SearchInput
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        /> */}
        {isLoading ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "100vh" }}
          >
            <div className="spinner-border text-dark" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="row container">
            {categories.map((c) => (
              <div className="col-md-4 mt-5 mb-3 gx-3 gy-3" key={c._id}>
                <div className="card bg-dark ">
                  <Link
                    to={`/category/${c.slug}`}
                    className="btn cat-btn"
                    style={{ color: "white", fontWeight: "bold" }}
                  >
                    {c.name}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Categories;