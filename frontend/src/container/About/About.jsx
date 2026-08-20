import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AppWrap, MotionWrap } from "../../wrapper";
import "./About.scss";
import { urlFor, client } from "../../client";

const About = () => {
  const [abouts, setAbouts] = useState([]);

  useEffect(() => {
    const query = '*[_type == "abouts"] | order(order asc)';

    client.fetch(query).then((data) => {
      setAbouts(data);
    });
  }, []);

  return (
    <>
      <div className="section-head">
        <h2 className="head-text">
          Areas of <span>Skills</span>
        </h2>
        <span className="section-head__rule" />
        <span className="section-chip">What I actually do</span>
      </div>

      <div className="app__profiles app__section-body">
        {abouts.map((about, index) => (
          <motion.div
            whileInView={{ opacity: 1 }}
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.4, type: "tween" }}
            className="app__profile-item"
            key={about.title + index}
          >
            <h3 className="bold-text app__profile-title">{about.title}</h3>
            <div className="app__profile-body">
              {about.imgUrl && (
                <img src={urlFor(about.imgUrl)} alt="" aria-hidden="true" />
              )}
              <p className="p-text">{about.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(About, "app__about"),
  "about",
  "app__whitebg"
);
