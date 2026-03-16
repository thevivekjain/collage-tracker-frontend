import React from "react";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar"; // Navbar import kiya
import { 
  FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaGraduationCap, 
  FaUniversity, FaLinkedin, FaGithub, FaPaperPlane, FaClock, FaHeadset 
} from "react-icons/fa";
import "./Contact.css";

import heroImg from "../../assets/x3.jpeg"; 
import profileImg from "../../assets/v.jpeg"; 

function Contact() {
  return (
    <div className="cntk-vivek-page-wrapper">
      <Navbar /> {/* Navbar yahan add kiya */}

      {/* HERO SECTION */}
      <header className="cntk-vivek-hero" style={{ backgroundImage: `linear-gradient(rgba(10, 20, 30, 0.61), rgba(10, 20, 30, 0.89)), url(${heroImg})` }}>
        <motion.div className="cntk-vivek-hero-content" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="cntk-vivek-hero-subtitle">GET IN TOUCH</span>
          <h1>Let's Start a Conversation</h1>
          <p>Expertise in law, driven by technology. Reach out for collaborations or legal consultations.</p>
          <div className="cntk-vivek-hero-divider"></div>
        </motion.div>
      </header>

      {/* FLOATING INFO CARDS */}
      <section className="cntk-vivek-info-cards-section">
        <div className="cntk-vivek-info-cards-grid">
          <div className="cntk-vivek-info-card">
            <FaPhoneAlt className="cntk-vivek-card-icon" />
            <h4>Call Me</h4>
            <p>+91 8002279424</p>
          </div>
          <div className="cntk-vivek-info-card">
            <FaEnvelope className="cntk-vivek-card-icon" />
            <h4>Email Us</h4>
            <p>vivekjain.patna@gmail.com</p>
          </div>
          <div className="cntk-vivek-info-card">
            <FaClock className="cntk-vivek-card-icon" />
            <h4>Working Hours</h4>
            <p>Mon - Sat: 9 AM - 7 PM</p>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT AREA */}
      <section className="cntk-vivek-body-area">
        <div className="cntk-vivek-flex-container">
          
          {/* LEFT: PROFILE */}
          <motion.div className="cntk-vivek-profile-side" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="cntk-vivek-portrait-container">
              <img src={profileImg} alt="Vivek Jain" />
            </div>
            <div className="cntk-vivek-profile-text">
              <h2>Vivek Jain</h2>
              <p className="cntk-vivek-specialization">MERN Stack Developer & Tech Enthusiast</p>
              <div className="cntk-vivek-edu-stack">
                <div className="cntk-vivek-edu-line"><FaGraduationCap /> 3rd Year Student</div>
                <div className="cntk-vivek-edu-line"><FaUniversity /> Techno Main Salt Lake</div>
                <div className="cntk-vivek-edu-line"><FaMapMarkerAlt /> Kolkata, WB</div>
              </div>
              <div className="cntk-vivek-social-tray">
                <a href="https://www.linkedin.com/in/vivek-kumar-jain-31b189302" target="_blank" rel="noreferrer">
                  <FaLinkedin />
                </a>
                <a href="https://github.com/thevivekjain" target="_blank" rel="noreferrer">
                  <FaGithub />
                </a>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: COMPACT FORM */}
          <motion.div className="cntk-vivek-form-side" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="cntk-vivek-form-inner-box">
              <FaHeadset className="cntk-vivek-form-top-icon" />
              <h3 className="vvk-send">Send a Message</h3>
              <p>I'll get back to you within 24 business hours.</p>
              
              <form className="cntk-vivek-form-element">
                <div className="cntk-vivek-form-row">
                  <input type="text" placeholder="Name" required />
                  <input type="email" placeholder="Email" required />
                </div>
                <input type="text" placeholder="Subject" />
                <textarea placeholder="Your message..." rows="4" required></textarea>
                <button type="submit" className="cntk-vivek-form-submit-btn">
                  Send Message <FaPaperPlane />
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Contact;