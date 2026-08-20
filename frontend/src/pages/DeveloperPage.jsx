import React from "react";
import { motion } from "framer-motion";
import { FiArrowRight, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

import logo from "../assets/BirdLogo2.png";
import { useDocumentHead } from "../seo";
import "./DeveloperPage.scss";

// Landing page for people arriving from the footer of one of the products
// (eudoro.art, shaza, …). They clicked "Built by Kaleem Ahmed" from inside a
// running app, so they already know the work is real. The job here is only to
// say who built it and send them to the case studies.
const PRODUCTS = [
  {
    name: "Eudoro",
    what: "A multi-vendor marketplace for personalized products. 12 backend services and 3 Next.js apps, with an order pipeline driven by events rather than requests.",
    href: "/work/eudoro",
  },
  {
    name: "Forever Yours",
    what: "A real-time platform for couples, with WebRTC calling, a synced watch-together room, and an AI companion grounded in retrieval over vector search.",
    href: "/work/shaza",
  },
  {
    name: "Gaza40+ Student Portal",
    what: "Case management for a humanitarian organisation, built around a layered authorization model with region scoping resolved on the server.",
    href: "/work/gaza40-student-portal",
  },
];

const DeveloperPage = () => {
  useDocumentHead({
    title: "About the developer — Kaleem Ahmed",
    description:
      "Kaleem Ahmed is a backend-heavy full-stack engineer in Noida, India. He designed and built this product end to end. Case studies, live products and test logins.",
    path: "/developer",
  });

  return (
    <div className="devpage">
      <header className="devpage__bar">
        <a className="devpage__logo" href="/">
          <img src={logo} alt="" aria-hidden="true" />
          <span>K.A</span>
        </a>
        <a className="devpage__cta" href="/">
          Full portfolio <FiArrowRight />
        </a>
      </header>

      <motion.main
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="devpage__main"
      >
        <p className="devpage__eyebrow">You clicked through from something I built</p>

        <h1 className="devpage__name">Kaleem Ahmed</h1>
        <p className="devpage__role">Backend-Heavy Full-Stack Engineer · Noida, India</p>

        <div className="devpage__body">
          <p>
            I designed and built the product you just came from, end to end. Most of
            my depth is in backend and systems engineering: service boundaries, data
            flows, event-driven workflows, the money and permission paths, and the
            observability around all of it. I build the frontend when a project needs
            one, which so far has been every time.
          </p>
          <p>
            What I enjoy most is what happens after something works. What should
            happen when the same event arrives twice, when two requests update the
            same wallet at the same moment, or when one service is down and the rest
            of the system still has to keep moving. Most of what I know there I
            learned by getting it wrong first.
          </p>
        </div>

        <div className="devpage__products">
          <h2>Things I&apos;ve built</h2>
          {PRODUCTS.map((p) => (
            <a className="devpage__product" href={p.href} key={p.name}>
              <span className="devpage__product-name">{p.name}</span>
              <span className="devpage__product-what">{p.what}</span>
              <span className="devpage__product-go">
                Read the case study <FiArrowRight />
              </span>
            </a>
          ))}
        </div>

        <div className="devpage__note">
          Each write-up covers the problem, the architecture, the decisions I would
          defend, and the ones I got wrong and had to fix. Several products are live
          with working test logins, so you can sign in and look around yourself.
        </div>

        <div className="devpage__actions">
          <a className="devpage__primary" href="/">
            See the full portfolio <FiArrowRight />
          </a>
          <a className="devpage__secondary" href="/credentials">
            Test logins
          </a>
        </div>

        <ul className="devpage__links">
          <li>
            <a href="https://www.linkedin.com/in/kaleem-ahmed-" target="_blank" rel="noopener noreferrer">
              <FiLinkedin /> LinkedIn
            </a>
          </li>
          <li>
            <a href="https://github.com/KaleemAhmed123" target="_blank" rel="noopener noreferrer">
              <FiGithub /> GitHub
            </a>
          </li>
          <li>
            <a href="mailto:shaamidreez@gmail.com">
              <FiMail /> shaamidreez@gmail.com
            </a>
          </li>
        </ul>
      </motion.main>

      <footer className="devpage__footer">
        <p>© {new Date().getFullYear()} Kaleem Ahmed · kaleemahmed.in</p>
      </footer>
    </div>
  );
};

export default DeveloperPage;
