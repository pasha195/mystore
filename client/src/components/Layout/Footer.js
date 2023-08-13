import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faInstagram, faFacebook, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import paymentImage from '../../Images/img-payment-footer.png';
const Footer = () => {


  return (
    <div
      className="footer"
      style={{
        background: 'linear-gradient(to top, orange, darkorange)',
        color: '#fff',
        paddingTop: '30px',
        paddingBottom: '10px',
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-4 text-center">
            <h6 style={{ color: '#fff' }}>All Rights Reserved &copy; 2023 Abdullahop</h6>
            <div>
            <img
              style={{height:'20px',backgroundColor:'white'}}
              src={paymentImage}
                alt='payment-img' className="payment-icon"
              />
            </div>
        
          </div>
          <div className="col-lg-4 col-md-12 text-center ">
            <p>
              <Link to="/about" style={{ color: '#fff', margin: '0 5px' }}>
                About
              </Link>{' '}
              |
              <Link to="/contact" style={{ color: '#fff', margin: '0 5px' }}>
                Contact
              </Link>{' '}
              |
              <Link to="/policy" style={{ color: '#fff', margin: '0 5px' }}>
                Privacy Policy
              </Link>
            </p>
          </div>
          <div className="col-lg-4 col-md-12 text-center">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#fff', margin: '0 5px' }}
            >
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#fff', margin: '0 5px' }}
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#fff', margin: '0 5px' }}
            >
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a
              href="https://wa.me/whatsappphonenumber"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#fff', margin: '0 5px' }}
            >
              <FontAwesomeIcon icon={faWhatsapp} />
            </a>
          
           
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12 text-center">
            <p>
              <small>
                Designed and Developed by{' '}
                <a href="http://mabdullahnasir.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#fff' }}>
                  Abdullah Nasir
                </a>
              </small>
            </p>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
