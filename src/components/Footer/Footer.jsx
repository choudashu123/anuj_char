import React from "react";
import "./Footer.css";

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-row">
        <div className="footer-contact">
          <h3>
            Let’s Collaborate <br />
            mc@anujchar.com
          </h3>

          <p className="secondary">
            From live shows to digital broadcasts — I’m always ready to collaborate. Let’s create something unforgettable.
          </p>

          <Link to="/contact" className="btn">
            Get in Touch
          </Link>
        </div>

        <div className="footer-nav">
          <Link to="/" className="footer-nav-item">
            <span>Home</span>
            <span>&#8594;</span>
          </Link>

          <Link to="/events" className="footer-nav-item">
            <span>Events</span>
            <span>&#8594;</span>
          </Link>

          <Link to="/contact" className="footer-nav-item">
            <span>Contact</span>
            <span>&#8594;</span>
          </Link>

          <Link to="/faq" className="footer-nav-item">
            <span>FAQ</span>
            <span>&#8594;</span>
          </Link>
        </div>
      </div>
      <div className="footer-row" id="footer-row-bottom">
        <div className="footer-header">
          <h1 className="footer-row-bottom-title">Anuj</h1>
          <h1 className="footer-row-bottom-title">Char</h1>
        </div>

        <div className="footer-copyright-line">
          <p className="primary sm footer-row-bottom-title">&copy; Anuj Char 2025</p>
          <p className="primary sm footer-row-bottom-title">Designed & Developed by Viral Inbound</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
