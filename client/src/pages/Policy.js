import React from "react";
import Layout from "./../components/Layout/Layout";
import { Container } from "react-bootstrap";
import privacyPolicy from "../../../client/src/privacy.jpg";
const Policy = () => {
  return (
    <Layout title={"Privacy Policy"}>

      <div className="bg-gradient" style={{ marginTop: '100px' }}>
        <Container>
          <div className="shadow p-5 text-center">
            <h1 className="section-title">Our Policy</h1>
            <p className="lead">our payments are safe with us.</p>

          </div>
        </Container>
      </div>
      <div className="row contactus ">
        <div className="col-md-4 ">
          <img
            src={privacyPolicy}
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>


        <div class="col-md-4 shadow">
          <p>Your data is safe with us.</p>
          <p>We respect your privacy.</p>
          <p>Your privacy, our promise.</p>
          <p>Your privacy is our top priority.</p>
          <p>We take your privacy seriously. </p>
          <p>Your privacy, our responsibility</p>
          <p>Your privacy, our responsibility</p>
          <p>We're committed to protecting your privacy.</p>
        </div>

      </div>
    </Layout>
  );
};

export default Policy;