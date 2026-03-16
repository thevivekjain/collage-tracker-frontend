import React from "react";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar";
import { 
  FaUsers, FaUserShield, FaUserGraduate, 
  FaProjectDiagram, FaLock, FaChartLine,
  FaBell, FaRobot, FaFileDownload, FaEdit, FaHistory
} from "react-icons/fa";
import "./About.css";

import heroImg from "../../assets/x5.jpeg"; 

function About() {
  return (
    <div className="abt-vivek-page-wrapper">
      <div className="abt-vivek-nav-container">
        <Navbar />
      </div>

      {/* HERO SECTION */}
      <header className="abt-vivek-hero" style={{ backgroundImage: `linear-gradient(rgba(10, 20, 30, 0.75), rgba(10, 20, 30, 0.95)), url(${heroImg})` }}>
        <motion.div className="abt-vivek-hero-content" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
          <span className="abt-vivek-hero-subtitle">OUR MISSION</span>
          <h1 className="vvk-abt">Digitalizing Campus Administration</h1>
          <p className="vvk-abt2">A unified platform bridging the gap between students and administration through automation, transparency, and AI-driven insights.</p>
          <div className="abt-vivek-hero-divider"></div>
        </motion.div>
      </header>

      {/* FLOATING STATS CARDS */}
      <section className="abt-vivek-stats-section">
        <div className="abt-vivek-stats-grid">
          <div className="abt-vivek-stat-card">
            <FaProjectDiagram className="abt-vivek-card-icon" />
            <h4>Automated Workflow</h4>
            <p>Paperless document approval pipeline.</p>
          </div>
          <div className="abt-vivek-stat-card active">
            <FaUsers className="abt-vivek-card-icon" />
            <h4>Role-Based Access</h4>
            <p>Dedicated portals for Staff & Students.</p>
          </div>
          <div className="abt-vivek-stat-card">
            <FaChartLine className="abt-vivek-card-icon" />
            <h4>Real-time Tracking</h4>
            <p>Live status updates on every request.</p>
          </div>
        </div>
      </section>

      {/* ABOUT PROJECT TEXT */}
      <section className="abt-vivek-intro">
        <div className="abt-vivek-container">
          <motion.div className="abt-vivek-text-block" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="abt-vivek-section-title">About This Project</h2>
            <div className="abt-vivek-intro-flex">
              <p>
                College Tracker is designed to help students and college staff to manage all requests 
                digitally. From raising a documents request to checking its approval timeline, 
                everything is automated to reduce manual workload.
              </p>
              <p>
                This system supports role-based access for Students, Clerk, HOD, Office, Accounts 
                & Principal. Your requested document moves smoothly through the approval pipeline — 
                fully transparent & trackable.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* KEY FEATURES - PREMIUM CARDS */}
      <section className="abt-vivek-features-section">
        <div className="abt-vivek-container">
          <h2 className="abt-vivek-section-title">Key Features</h2>
          <div className="abt-vivek-features-grid">
            
            <div className="abt-vivek-feature-card">
              <div className="feat-icon-wrapper"><FaEdit /></div>
              <h3>Easy Submission</h3>
              <p>Submit Bonafide, CC, or any document request in seconds with a few clicks.</p>
            </div>

            <div className="abt-vivek-feature-card">
              <div className="feat-icon-wrapper"><FaHistory /></div>
              <h3>Real-Time Tracking</h3>
              <p>Track timeline — Clerk → HOD → Office → Accounts → Principal.</p>
            </div>

            <div className="abt-vivek-feature-card">
              <div className="feat-icon-wrapper"><FaBell /></div>
              <h3>Instant Notifications</h3>
              <p>Get instant updates when your request moves to the next department.</p>
            </div>

            <div className="abt-vivek-feature-card">
              <div className="feat-icon-wrapper"><FaUserShield /></div>
              <h3>Role Based Access</h3>
              <p>Each department gets its own dashboard to manage assigned tasks efficiently.</p>
            </div>

            <div className="abt-vivek-feature-card">
              <div className="feat-icon-wrapper"><FaFileDownload /></div>
              <h3>Document Management</h3>
              <p>Download approved certificates directly from your student dashboard.</p>
            </div>

            <div className="abt-vivek-feature-card">
              <div className="feat-icon-wrapper"><FaRobot /></div>
              <h3>AI Assistant</h3>
              <p>Ask doubts about document process, timelines, or college rules anytime.</p>
            </div>

          </div>
        </div>
      </section>

      {/* ECOSYSTEM ROLES */}
      <section className="abt-vivek-roles-section">
        <div className="abt-vivek-container">
          <h2 className="abt-vivek-section-title gold">System Ecosystem</h2>
          <div className="abt-vivek-roles-grid">
            <div className="abt-vivek-role-card">
              <FaUsers className="role-main-icon" />
              <h3>The Staff</h3>
              <p>Includes Clerk, HOD, Office, Accounts, & Principal. Each role ensures a specific verification step in the pipeline.</p>
            </div>
            <div className="abt-vivek-role-card highlighted">
              <FaUserGraduate className="role-main-icon" />
              <h3>The Student</h3>
              <p>Create accounts, raise requests, track live progress, and download final documents seamlessly.</p>
            </div>
            <div className="abt-vivek-role-card">
              <FaUserShield className="role-main-icon" />
              <h3>The Admin</h3>
              <p>Total system control—manages credentials, student records, and platform health.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PRIVACY FOOTER */}
      <section className="abt-vivek-privacy">
        <div className="abt-vivek-container">
          <div className="abt-vivek-privacy-box">
            <FaLock />
            <h3>Privacy & Security</h3>
            <p>Your data is encrypted. Only authorized members can view details during the approval workflow.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;