import React, { useState, useEffect } from "react";
import { AiFillEye } from "react-icons/ai";
import { motion } from "framer-motion";

import { AppWrap, MotionWrap } from "../../wrapper";
import { urlFor, client } from "../../client";
import WorkModal from "./WorkModal";
import "./Work.scss";
import "./WorkModal.scss";

// Inline SVG placeholder shown when a project has no image in Sanity,
// so every card keeps the same size.
const FALLBACK_IMG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' width='400' height='200'>" +
      "<rect width='400' height='200' fill='#eef1f8'/>" +
      "<g fill='none' stroke='#aeb6cc' stroke-width='5' stroke-linejoin='round' stroke-linecap='round'>" +
      "<rect x='150' y='66' width='100' height='70' rx='8'/>" +
      "<circle cx='176' cy='92' r='9'/>" +
      "<path d='M156 136 l26 -30 20 18 24 -30 18 22'/>" +
      "</g>" +
      "<text x='200' y='172' font-family='monospace' font-size='13' fill='#9aa0ae' text-anchor='middle'>No preview</text>" +
    "</svg>"
  );

const Work = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });
  const [works, setWorks] = useState([]);
  const [filterWork, setFilterWork] = useState([]);
  const [activeWork, setActiveWork] = useState(null);

  const imgSrc = (work) => (work?.imgUrl ? urlFor(work.imgUrl) : FALLBACK_IMG);

  const handleWorkFilter = (item) => {
    setActiveFilter(item);
    setAnimateCard([{ y: 100, opacity: 0 }]);

    setTimeout(() => {
      setAnimateCard([{ y: 0, opacity: 1 }]);

      if (item === "All") {
        setFilterWork(works);
      } else {
        setFilterWork(works.filter((work) => work.tags.includes(item)));
      }
    }, 500);
  };

  useEffect(() => {
    const query = '*[_type == "works"]';

    client.fetch(query).then((data) => {
      setWorks(data);
      setFilterWork(data);
    });
  }, []);

  return (
    <>
      <h2 className="head-text">
        My Project <span>Section</span> <br />
      </h2>
      {/* Tags filter */}
      <div className="app__work-filter">
        {["All", "Full Stack", "Backend", "Frontend", "Other"].map((item, index) => (
          <div
            key={index}
            onClick={() => handleWorkFilter(item)}
            className={`app__work-filter-item app__flex p-text ${activeFilter === item ? "item-active" : ""
              }`}
          >
            {item}
          </div>
        ))}
      </div>
      {/*All Card container*/}
      <motion.div
        animate={animateCard}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
        className="app__work-portfolio"
      >
        {/* looping ind. items */}
        {filterWork.map((work, index) => (
          <div className="app__work-item app__flex" key={index}>
            {/* img */}
            <div className="app__work-img app__flex">
              <img src={imgSrc(work)} alt={work?.name || work?.title} />
              {/* Hover overlay — one eye button opens the preview modal */}
              <motion.div
                whileHover={{ opacity: [0, 1] }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="app__work-hover app__flex"
                onClick={() => setActiveWork(work)}
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
              <p className="p-text">{work?.description}</p>
            </div>
          </div>
        ))}
      </motion.div>

      <WorkModal
        work={activeWork}
        imgSrc={activeWork ? imgSrc(activeWork) : ""}
        onClose={() => setActiveWork(null)}
      />
    </>
  );
};

export default AppWrap(
  MotionWrap(Work, "app__works"),
  "work",
  "app__primarybg"
);
