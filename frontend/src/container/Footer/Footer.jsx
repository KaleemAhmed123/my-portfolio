import React, { useState } from "react";

import emailIcon from "../../assets/email.png";
import phoneIcon from "../../assets/mobile.png";
import { AppWrap, MotionWrap } from "../../wrapper";
import "./Footer.scss";

const Footer = () => {
  // The key here used to be `name` while the input read `username`, which left
  // the field uncontrolled on first render and posted undefined to Sanity.
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    message: "",
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { username, email, message } = formData;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Writes go through the serverless function, not the browser client: the
  // Sanity write token has to stay server-side.
  const handleSubmit = async () => {
    if (!username.trim() || !message.trim()) {
      setError("Name and message are required.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: username, email, message }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong.");
      }
      setIsFormSubmitted(true);
    } catch (err) {
      // Whatever happens, the button has to stop saying "Sending...".
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="head-text">Wanna Contact With Me </h2>

      <div className="app__footer-cards">
        <div className="app__footer-card ">
          <img src={emailIcon} alt="email" />
          <a href="mailto:shaamidreez@gmail.com" className="p-text">
            shaamidreez@gmail.com
          </a>
        </div>
        <div className="app__footer-card">
          <img src={phoneIcon} alt="phone" />
          <a href="tel:+916306026859" className="p-text">
            +916306026859
          </a>
        </div>
      </div>
      {/* agr submit then message for better ux  */}
      {!isFormSubmitted ? (
        <div className="app__footer-form app__flex">
          <div className="app__flex">
            <input
              className="p-text"
              type="text"
              placeholder="Your Name..."
              name="username"
              value={username}
              onChange={handleChangeInput}
            />
          </div>
          <div className="app__flex">
            <input
              className="p-text"
              type="email"
              placeholder="Your Email..."
              name="email"
              value={email}
              onChange={handleChangeInput}
            />
          </div>
          <div>
            <textarea
              className="p-text"
              placeholder="Your Message..."
              value={message}
              name="message"
              onChange={handleChangeInput}
            />
          </div>
          <button
            type="button"
            className="p-text"
            onClick={handleSubmit}
            disabled={loading}
          >
            {!loading ? "Send Message" : "Sending..."}
          </button>
          {error ? (
            <p className="p-text app__footer-error" role="alert">
              {error}
            </p>
          ) : null}
        </div>
      ) : (
        <div>
          <h3 className="head-text">Thank you for your time!</h3>
        </div>
      )}
    </>
  );
};

export default AppWrap(
  MotionWrap(Footer, "app__footer"),
  "contact",
  "app__primarybg"
);
