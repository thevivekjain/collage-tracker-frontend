import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import "../pages/Homepage.css";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="homepage">

      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="overlay">
          <h1 className="hero-title">College Tracker</h1>
          <p className="hero-subtitle">
            A smart platform to submit, track & manage college-related requests.

            Get all College related documents , Approvals — all in one place.
          </p>

          <button className="btn-primary" onClick={() => navigate("/login")}>
            Get Started →
          </button>
        </div>
      </section>

      {/* ABOUT PROJECT SECTION */}
      <section className="about-section">
        <h2>About This Project</h2>
        <p>
          College Tracker is designed to help students and college staff to manage all requests 
          digitally. From raising a documents request to checking its approval timeline, 
          everything is automated to reduce manual workload.
        </p>

        <p>
          This system supports role-based access for Students, Clerk, HOD, Office, Accounts 
          & Principal. Your requested document moves smoothly through the approval pipeline — 
          fully transparent & trackable  .Student can download their requested certificates 
          according to their requirements.
        </p>
      </section>

      {/* FEATURES SECTION */}
      <section className="features-section">
        <h2>Key Features</h2>

        <div className="features-grid">

          <div className="feature-card">
            <h3>📌 Easy Request Submission</h3>
            <p>Submit Bonafide, CC, or any document request in seconds.</p>
          </div>

          <div className="feature-card">
            <h3>⏳ Real-Time Tracking</h3>
            <p>Track your request timeline — Clerk → HOD → Office → Accounts → Principal.</p>
          </div>

          <div className="feature-card">
            <h3>🔔 Instant Notifications</h3>
            <p>Get updates when your request moves to the next department.</p>
          </div>

          <div className="feature-card">
            <h3>⚙️ Role Based Access</h3>
            <p>Each department gets its own dashboard to manage assigned tasks.</p>
          </div>

          <div className="feature-card">
            <h3>📄 Document Management</h3>
            <p>Download approved certificates directly from your dashboard.</p>
          </div>

          <div className="feature-card">
            <h3>🤖 AI Assistant</h3>
            <p>Ask doubts about requested document process, timelines, college rules, etc.</p>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}

export default HomePage;
