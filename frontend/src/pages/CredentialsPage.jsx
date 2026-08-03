import React from "react";
import { motion } from "framer-motion";
import { FiArrowLeft } from "react-icons/fi";

import Credentials from "../container/Credentials/Credentials";
import logo from "../assets/BirdLogo2.png";
import "./CredentialsPage.scss";

// Standalone page (route: /credentials) — deliberately NOT part of the
// single-page portfolio scroll. Recruiters open this as its own shareable URL.
const CredentialsPage = () => (
  <div className="credpage">
    <header className="credpage__bar">
      <a className="credpage__logo" href="/">
        <img src={logo} alt="logo" />
        <span>K.A</span>
      </a>
      <a className="credpage__back" href="/">
        <FiArrowLeft /> Back to portfolio
      </a>
    </header>

    <motion.main
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="credpage__main"
    >
      <Credentials />
    </motion.main>

    <footer className="credpage__footer">
      <p className="p-text">
        © {new Date().getFullYear()} Kaleem Ahmed — demo credentials for evaluation only.
      </p>
    </footer>
  </div>
);

export default CredentialsPage;
