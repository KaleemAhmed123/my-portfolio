import React, { useState, useEffect, useRef, useCallback } from "react";
import { AiFillEye } from "react-icons/ai";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { AppWrap, MotionWrap } from "../../wrapper";
import { urlFor, client } from "../../client";
import { slugForWork } from "../../content/projects";
import "./Work.scss";

// Inline SVG placeholder shown when a project has no image in Sanity,
// so every card keeps the same size.
const FALLBACK_IMG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' width='400' height='200'>" +
      "<rect width='400' height='200' fill='#26211a'/>" +
      "<g fill='none' stroke='#4a4335' stroke-width='5' stroke-linejoin='round' stroke-linecap='round'>" +
      "<rect x='150' y='66' width='100' height='70' />" +
      "<circle cx='176' cy='92' r='9'/>" +
      "<path d='M156 136 l26 -30 20 18 24 -30 18 22'/>" +
      "</g>" +
      "<text x='200' y='172' font-family='monospace' font-size='13' fill='#6b6353' text-anchor='middle'>No preview</text>" +
    "</svg>"
  );

const Work = () => {
  const [works, setWorks] = useState([]);
  const [reach, setReach] = useState({ start: true, end: true });
  const rowRef = useRef(null);
  const navigate = useNavigate();

  // disable an arrow once that end of the row is reached
  const syncReach = useCallback(() => {
    const el = rowRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setReach({ start: el.scrollLeft <= 1, end: el.scrollLeft >= max - 1 });
  }, []);

  useEffect(() => {
    syncReach();
    window.addEventListener("resize", syncReach);
    return () => window.removeEventListener("resize", syncReach);
  }, [works, syncReach]);

  const step = (dir) => {
    const el = rowRef.current;
    if (!el) return;
    const card = el.querySelector(".app__work-item");
    const gap = 24;
    el.scrollBy({ left: dir * ((card?.offsetWidth || el.clientWidth * 0.8) + gap), behavior: "smooth" });
  };

  const imgSrc = (work) => (work?.imgUrl ? urlFor(work.imgUrl) : FALLBACK_IMG);

  useEffect(() => {
    const query = '*[_type == "works"] | order(order asc)';

    client.fetch(query).then((data) => {
      setWorks(data);
    });
  }, []);

  return (
    <>
      <div className="section-head">
        <h2 className="head-text">
          My <span>Projects</span>
        </h2>
        <span className="section-head__rule" />
        {works.length > 0 && (
          <span className="section-chip">{works.length} shipped</span>
        )}
        {works.length > 0 && (
          <div className="app__work-nav">
            <button
              type="button"
              onClick={() => step(-1)}
              disabled={reach.start}
              aria-label="Previous projects"
            >
              <HiChevronLeft />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              disabled={reach.end}
              aria-label="Next projects"
            >
              <HiChevronRight />
            </button>
          </div>
        )}
      </div>
      {/* Four fit the row; anything past that scrolls sideways */}
      <div
        ref={rowRef}
        onScroll={syncReach}
        className={`app__work-portfolio app__section-body ${works.length > 4 ? "has-overflow" : ""}`}
      >
        {works.map((work, index) => (
          <div className="app__work-item app__flex" key={index}>
            {/* img */}
            <div className="app__work-img app__flex">
              <img src={imgSrc(work)} alt={work?.name || work?.title} />
              {/* Hover overlay — one eye button opens the preview modal */}
              <motion.div
                whileHover={{ opacity: [0, 1] }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="app__work-hover app__flex"
                onClick={() => navigate(`/work/${slugForWork(work)}`)}
              >
                <motion.div
                  whileInView={{ scale: [0, 1] }}
                  whileHover={{ scale: [1, 0.9] }}
                  transition={{ duration: 0.25 }}
                  className="app__flex"
                >
                  <AiFillEye />
                </motion.div>
              </motion.div>
            </div>
            {/* that below content */}
            <div className="app__work-content app__flex">
              {work?.tags?.[0] && (
                <div className="app__work-tag app__flex">
                  <p className="p-text">{work.tags[0]}</p>
                </div>
              )}
              <h4 className="bold-text">{work?.title}</h4>
              {work?.role && <span className="app__work-role">{work.role}</span>}
              <p className="p-text">{work?.description}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Work, "app__works"),
  "work",
  "app__primarybg"
);
