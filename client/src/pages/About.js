import React from "react";
import Layout from "./../components/Layout/Layout";
import { Container, Row, Col, Image, Card } from "react-bootstrap";
import aboutUsImage from "../../../client/src/aboutus.jpg";
const About = () => {
  return (
    <Layout title={"About us - Ecommer app"}>
      
      <div className="bg-gradient" style={{marginTop:'100px'}}>
        <Container>
          <div className="shadow p-5 text-center">
            <h1 className="section-title">About Us</h1>
            <p className="lead">Welcome to Our Store</p>
          </div>
        </Container>
      </div>
       <Container>
      <section className="section-intro my-4">
        <Row>
          <Col md={6} style={{textAlign:"justify"}}>
           
            <p>
            <b>A</b>t eShop, we believe in the power of online shopping to bring convenience, variety, and exceptional service right to your fingertips. We strive to create an enjoyable and seamless shopping experience for our customers, offering a wide range of high-quality products and excellent customer service.
            </p>
            <p>
            <b>O</b>ur mission is to provide you with a one-stop destination for all your shopping needs. Whether you're looking for the latest fashion trends, tech gadgets, home decor, or even everyday essentials, we have you covered. We carefully curate our product selection to ensure that you find exactly what you're looking for, and we are constantly adding new and exciting items to our inventory.
            </p>
            <span> <b>T</b>hank you for choosing eShop as your go-to destination for all your online shopping needs</span>
          </Col>
          <Col md={6}>
            <Image
              src={aboutUsImage}
              alt="About Us"
              fluid
              rounded
            />
          </Col>
        </Row>
      </section>
{/* 
      <section className="section-team">
        <h2>Our Team</h2>
        <Row>
          <Col md={4}>
            <Card>
              <Card.Img
                variant="top"
                src="/images/team-member1.jpg"
                alt="Team Member 1"
              />
              <Card.Body>
                <Card.Title>John Doe</Card.Title>
                <Card.Text>Co-Founder</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Img
                variant="top"
                src="/images/team-member2.jpg"
                alt="Team Member 2"
              />
              <Card.Body>
                <Card.Title>Jane Smith</Card.Title>
                <Card.Text>Marketing Manager</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Img
                variant="top"
                src="/images/team-member3.jpg"
                alt="Team Member 3"
              />
              <Card.Body>
                <Card.Title>Mike Johnson</Card.Title>
                <Card.Text>Product Designer</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </section> */}

<section className="section-values mb-5">
  <h2 style={{ display: 'flex', justifyContent: 'center', marginBottom: '70px' }}>Our Values</h2>
  <div className="values-table">
    <table style={{ borderCollapse: 'separate', borderSpacing: '0 10px' }}>
      <thead>
        <tr>
          <th></th>
          <th style={{ borderBottom: '2px solid #000' }}>Quality <i className="fas fa-check-circle"></i></th>
          <th style={{ borderBottom: '2px solid #000' }}>Customer Satisfaction</th>
          <th style={{ borderBottom: '2px solid #000' }}>Innovation</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td ></td>
          <td  style={{ borderBottom: '1px solid #ccc', }}>
            <p className="mx-2" >We prioritize delivering products of the highest quality, ensuring your satisfaction and trust.</p>
          </td>
          <td style={{ borderBottom: '1px solid #ccc' ,borderLeft: '1px solid #ccc' }}>
            <p className="mx-2" style={{textAlign:"justify"}}> Your happiness is our ultimate goal, and we strive to create a positive and memorable shopping experience for you.</p>
          </td>
          <td style={{ borderBottom: '1px solid #ccc',borderLeft: '1px solid #ccc' }}>
            <p className="mx-2" style={{textAlign:"justify"}}>We embrace innovation to continually enhance your shopping experience, bringing you cutting-edge products and features that set us apart from the competition.</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</section>


    </Container>
  
    </Layout>
  );
};

export default About;