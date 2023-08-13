import React from "react";
import Layout from "../components/Layout/Layout";
import { useSearch } from "../context/search";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();
  return (
    <Layout title={"Search results"}>
      <div className="container my-3">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {values?.results.length < 1
              ?  "No Products Found"
              : `Found ${values?.results.length}`}
          </h6>
          <div className="d-flex flex-wrap mt-4">
            {values?.results.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }} key={p._id}>
                <img
                  src={`${process.env.REACT_APP_API_URL}/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text"> {p.description.substring(0, 30)}...</p>
                  <p className="card-text">Price: ${p.price}</p>
                  <p className="card-text">Discounted Price  <p style={{ color: 'gray', textDecoration: 'line-through' }}>$ {p.discountedPrice}</p></p>

                  <div className="d-flex justify-content-center flex-column">
                    <button onClick={() => navigate(`/product/${p.slug}`)}
                      style={{ color: 'white', backgroundColor: 'orange', width: '100%', borderColor: 'black' }} className="btn btn-primary">More Details</button>

                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
