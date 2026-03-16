import React from "react";
import { 
  FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, 
  FaLinkedinIn, FaGithub, FaTwitter, FaInstagram, 
  FaArrowRight, FaGraduationCap 
} from "react-icons/fa";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer-premium">
      <div className="footer-top">
        {/* Column 1: Brand Info */}
        <div className="footer-section brand">
          <div className="f-logo">
            <FaGraduationCap className="f-logo-icon" />
            <h2>College Tracker</h2>
          </div>
          <p className="f-desc">
            Empowering students and staff with a digital gateway for seamless 
            document requests and campus administration tracking.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/"><FaArrowRight className="li-icon" /> Home</a></li>
            <li><a href="/about"><FaArrowRight className="li-icon" /> About Us</a></li>
            <li><a href="/contact"><FaArrowRight className="li-icon" /> Contact Us</a></li>
          </ul>
        </div>

        {/* Column 3: Contact Info */}
        <div className="footer-section contact">
          <h3>Contact Us</h3>
          <div className="contact-item">
            <FaPhoneAlt className="c-icon" />
            <span>+91 8002279424</span>
          </div>
          <div className="contact-item">
            <FaEnvelope className="c-icon" />
            <span className="email-text">vivekjain.patna@gmail.com</span>
          </div>
          <div className="contact-item address">
            <FaMapMarkerAlt className="c-icon" />
            <span>TMSL, Salt Lake Sector 5, Kolkata, WB</span>
          </div>
        </div>

        {/* Column 4: Follow Us (Glass Icons) */}
        <div className="footer-section follow">
          <h3>Follow Us</h3>
          <div className="social-grid">
            <a href="https://www.linkedin.com/in/vivek-kumar-jain-31b189302" target="_blank" rel="noreferrer" className="social-glass-link linkedin">
              <FaLinkedinIn />
            </a>
            <a href="https://github.com/thevivekjain" target="_blank" rel="noreferrer" className="social-glass-link github">
              <FaGithub />
            </a>
            <a href="https://x.com/thevivekjainn" target="_blank" rel="noreferrer" className="social-glass-link twitter">
              <FaTwitter />
            </a>
            <a href="https://www.instagram.com/thevivekjainn/" target="_blank" rel="noreferrer" className="social-glass-link instagram">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="fb-content">
          <p>&copy; {new Date().getFullYear()} <span>Vivek Kumar Jain</span>. All Rights Reserved.</p>
          <div className="footer-policy">
            <a href="/">Privacy Policy</a>
            <span className="sep">|</span>
            <a href="/">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;