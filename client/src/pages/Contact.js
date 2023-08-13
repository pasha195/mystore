import React, { useState } from "react";
import Layout from "./../components/Layout/Layout";
import { BiMap, BiPhone, BiEnvelopeOpen } from "react-icons/bi";
import { Container, Image } from "react-bootstrap";
import contactUsImage from "../../../client/src/contactus.jpg";
import FloatingLabel from '../../../client/src/FloatingLabel';
import Swal from "sweetalert2";
import emailjs from "emailjs-com";
const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !message) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill all fields!",
      });
      return;
    }

    try {
      await sendEmail();
      // Clear form fields
      setName("");
      setEmail("");
      setMessage("");
      // Show success alert
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Your message has been sent.",
      });
    } catch (error) {
      console.error("Error sending email:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error sending email. Please try again later.",
      });
    }
  };

  const sendEmail = async () => {
    const templateParams = {
      from_name: name,
      from_email: email,
      message: message,
    };

    return emailjs.send(
      "service_9n0o5wi",
      "template_p49xf5j",
      templateParams,
      "o8T8dbMRHPaw5cZcc"
    );
  };

  

  const handleEmailClick = () => {
    window.location.href = "mailto:mabdulahnasir01@gmail.com";
  };

  const handlePhoneClick = () => {
    window.location.href = "tel:+923060130046";
  };

  const handleMapClick = () => {
    const address = "Johar Town, Lahore, Punjab";
    const formattedAddress = encodeURIComponent(address);
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${formattedAddress}`;

    window.open(mapUrl, "_blank");
  };
  return (
    <Layout title="Contact us">
      <div className="bg-gradient" style={{ marginTop: "100px" }}>
        <Container>
          <div className="shadow p-5 text-center">
            <h1 className="section-title">Contact Us</h1>
            <p className="lead">How can I help you?</p>
          </div>
        </Container>
      </div>

      <div className="justify-content-center align-items-center my-5 mx-5">
        <div className="map-container">
          <iframe
            title="Google Maps"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13604.720789017055!2d74.2979068!3d31.5208293!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190432f1c961e9%3A0x43f792770c474db0!2sJohar%20Town%2C%20Lahore%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2sus!4v1626088966349!5m2!1sen!2sus"
            width="100%"
            height="300"
            frameBorder="0"
            style={{ border: "0" }}
            allowFullScreen=""
            aria-hidden="false"
            tabIndex="0"
          ></iframe>

        </div>
      </div>

      <div className="row contactus" style={{ marginBottom: '150px' }}>

        <div className="col-md-5">
          <Container>
            <div className="shadow p-5 contact-form">
              <div className="info-section">
                <div className="mb-3">
                  <Image
                    src={contactUsImage}
                    alt="About Us"
                    fluid
                    rounded
                  />
                </div>

                <div
                  style={{ fontWeight: 700, cursor: 'pointer', color: 'black' }}
                  className="info-item"
                  onClick={handleEmailClick}
                  onMouseEnter={(e) => (e.target.style.color = 'orange')}
                  onMouseLeave={(e) => (e.target.style.color = 'black')}
                >
                  <p><BiEnvelopeOpen className="info-icon" /> mabdulahnasir01@gmail.com</p>
                </div>

                <div
                  style={{ fontWeight: 700, cursor: 'pointer', color: 'black' }}
                  className="info-item"
                  onClick={handleMapClick}
                  onMouseEnter={(e) => (e.target.style.color = 'orange')}
                  onMouseLeave={(e) => (e.target.style.color = 'black')}
                >
                  <p><BiMap className="info-icon" /> Johar Town, Lahore, Punjab</p>
                </div>

                <div
                  style={{ fontWeight: 700, cursor: 'pointer', color: 'black' }}
                  className="info-item"
                  onClick={handlePhoneClick}
                  onMouseEnter={(e) => (e.target.style.color = 'orange')}
                  onMouseLeave={(e) => (e.target.style.color = 'black')}
                >
                  <p><BiPhone className="info-icon" /> +92-306-0130046</p>
                </div>
              </div>
            </div>
          </Container>
        </div>



      </div>
      {/* contact form  */}
      <div className="row contactus" style={{ marginBottom: "150px" }}>
        <div className="col-md-8">
          <Container>
            <div className="shadow p-5 contact-form">
              <h2 style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                Get in Touch
              </h2>
              <div className="contact-form-section">
                <form className="form has-floated-label" onSubmit={handleSubmit}>
                  <div className="form-group mt-4">
                    <label style={{ fontWeight: "bold" }} htmlFor="name">
                      Name
                    </label>
                    <input
                    style={{borderBottom:'1px solid black',borderTop:'none',borderLeft:'none',borderRight:'none'}}
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="form-group mt-4">
                    <label style={{ fontWeight: "bold" }} htmlFor="email">
                      Email
                    </label>
                    <input
                      style={{borderBottom:'1px solid black',borderTop:'none',borderLeft:'none',borderRight:'none'}}
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-group mt-4">
                    <label style={{ fontWeight: "bold" }} htmlFor="message">
                      Message
                    </label>
                    <textarea
                      style={{borderBottom:'1px solid black',borderTop:'none',borderLeft:'none',borderRight:'none'}}
                      className="form-control"
                      id="message"
                      rows="3"
                      placeholder="Enter your message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary mt-4"
                    style={{
                      padding: "1em 1.5em",
                      font: "inherit",
                      cursor: "pointer",
                      backgroundColor: "black",
                      color: "white",
                      textTransform: "uppercase",
                    }}
                  >
                    Submit
                  </button>
                </form>
                <FloatingLabel formSelector=".form" />
              </div>
            </div>
          </Container>
        </div>
      </div>
  

    </Layout>
  );
};

export default Contact;
