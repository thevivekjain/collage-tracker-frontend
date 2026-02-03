import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} College Tracker </p>
      <p>Made by Vivek Jain</p>
    </footer>
  );
}

export default Footer;