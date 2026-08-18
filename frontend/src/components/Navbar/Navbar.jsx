import React, { useState } from "react";
import { images } from "../../constants";
import { HiMenuAlt4, HiX } from "react-icons/hi";
import { motion } from "framer-motion";
import name from "../../assets/name.jpg";
import "./Navbar.scss";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <nav className="app__navbar">
      <div className="app__navbar-logo">
        <p>K.A</p>
      </div>
      <ul className="app__navbar-links">
        {["home", "skills", "work", "about", "contact"].map((item) => (
          <li className="app__flex p-text" key={`link-${item}`}>
            <div />
            <a href={`#${item}`}>{item}</a>
          </li>
        ))}
      </ul>
      <a className="app__navbar-cta" href="/credentials">
        Test Access
      </a>
      {/* for mobile we need a ham-menuj */}
      <div className="app__navbar-menu">
        <HiMenuAlt4 onClick={() => setToggle(!toggle)} />
        {toggle && (
          <motion.div
            whileInView={{ x: [50, 0] }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <HiX onClick={() => setToggle(false)} />
            <ul>
              {["home", "skills", "work", "about", "contact"].map((item) => (
                <li key={item}>
                  <a href={`#${item}`} onClick={() => setToggle(!toggle)}>
                    {item}
                  </a>
                </li>
              ))}
              <li>
                <a
                  className="app__navbar-menu-cta"
                  href="/credentials"
                  onClick={() => setToggle(!toggle)}
                >
                  Test Access
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
