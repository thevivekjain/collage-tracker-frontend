import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  FaArrowRight, FaShieldAlt, FaChartBar, FaBolt, 
  FaUserEdit, FaFileAlt, FaCheckDouble, FaRobot, FaMobileAlt 
} from "react-icons/fa";
import Navbar from "../components/Navbar";
import "./Homepage.css";

// Images from your assets
import heroImg from "../assets/x4.jpeg"; 
import featureImg from "../assets/x.jpeg"; // Example secondary image

function HomePage() {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="hp-premium-wrapper">
      <Navbar />

      {/* HERO SECTION */}
      <section className="hp-hero" style={{ backgroundImage: `linear-gradient(rgba(10, 24, 46, 0.65), rgba(10, 24, 46, 0.77)), url(${heroImg})` }}>
        <motion.div 
          className="hp-hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="hp-badge">NEXT-GEN CAMPUS SOLUTION</span>
          <h1 className="hp-title">Modernizing College <br /> <span>Administration.</span></h1>
          <p className="hp-subtitle">
            A centralized hub for students and staff to manage documents, approvals, 
            and workflows with real-time tracking and AI-driven efficiency.
          </p>
          <div className="hp-hero-btns">
            <button className="hp-btn-main" onClick={() => navigate("/login")}>
              Get Started <FaArrowRight />
            </button>
          
          </div>
        </motion.div>
      </section>

      {/* STATS STRIP */}
      <section className="hp-stats-strip">
        <div className="hp-stats-container">
          <div className="hp-stat-item"><h3>100%</h3><p>Digitalized</p></div>
          <div className="hp-stat-item"><h3>24/7</h3><p>Live Tracking</p></div>
          <div className="hp-stat-item"><h3>Zero</h3><p>Paper Work</p></div>
          <div className="hp-stat-item"><h3>Role</h3><p>Based access</p></div>
        </div>
      </section>

      {/* DETAILED INFO SECTION */}
      <section className="hp-info-section">
        <div className="hp-container">
          <div className="hp-info-grid">
            <motion.div 
              className="hp-info-text"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
            >
              <h2>Comprehensive Tracking <span>System</span></h2>
              <p>College Tracker isn't just a portal; it's a complete ecosystem designed to bridge the communication gap between students and college departments.</p>
              
              <div className="hp-feature-list">
                <motion.div className="hp-list-item" variants={itemVariants}>
                  <div className="hp-icon-box"><FaBolt /></div>
                  <div>
                    <h4>Swift Approvals</h4>
                    <p>Automated routing ensures documents move from Clerk to Principal without delays.</p>
                  </div>
                </motion.div>
                <motion.div className="hp-list-item" variants={itemVariants}>
                  <div className="hp-icon-box"><FaShieldAlt /></div>
                  <div>
                    <h4>Secure Access</h4>
                    <p>Role-based authentication keeps sensitive student data protected and private.</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
            
            <div className="hp-info-image">
              <img src={featureImg} alt="Platform Preview" className="hp-img-main" />
              <div className="hp-img-backdrop"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE FEATURES GRID */}
      <section className="hp-core-features">
        <div className="hp-container">
          <div className="hp-section-header">
            <h2>Everything you need to <span>Manage</span></h2>
            <p>Powerful tools for students and staff to handle daily academic requests.</p>
          </div>

          <div className="hp-features-grid">
            {[
              { icon: <FaUserEdit />, title: "One-Click Request", desc: "Submit Bonafide or CC requests through a simplified dashboard." },
              { icon: <FaChartBar />, title: "Pipeline Tracking", desc: "See exactly which department (HOD/Accounts) is reviewing your file." },
              { icon: <FaRobot />, title: "AI Assistance", desc: "Get answers to college rules and document queries instantly via AI." },
              { icon: <FaFileAlt />, title: "Smart Vault", desc: "Securely store and download your approved certificates anytime." },
              { icon: <FaCheckDouble />, title: "Staff Dashboard", desc: "Separate interfaces for HOD and Principal to review and sign." },
              { icon: <FaMobileAlt />, title: "Mobile Optimized", desc: "Access the tracker seamlessly from your phone or tablet." }
            ].map((feature, index) => (
              <motion.div 
                className="hp-feature-card" 
                key={index}
                whileHover={{ y: -10 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="hp-card-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="hp-cta">
        <div className="hp-cta-box">
          <h2>Ready to simplify your college life?</h2>
          <p>Join hundreds of students using College Tracker for a hassle-free experience.</p>
          <button onClick={() => navigate("/register")}>Create Student Account Now</button>
        </div>
      </section>
    </div>
  );
}

export default HomePage;