import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { AppWrap, MotionWrap } from "../../wrapper";
import { urlFor, client } from "../../client";
import "./Skills.scss";

const Skills = () => {
  const [experiences, setExperiences] = useState([]);
  const [skills, setSkills] = useState([]);
  const [openRoles, setOpenRoles] = useState({});

  const toggleRole = (key) =>
    setOpenRoles((prev) => ({ ...prev, [key]: !prev[key] }));

  useEffect(() => {
    const query = '*[_type == "experiences"]';
    const skillsQuery = '*[_type == "skills"]';

    client.fetch(query).then((data) => {
      setExperiences(data);
    });

    client.fetch(skillsQuery).then((data) => {
      setSkills(data);
    });
  }, []);

  return (
    <>
      <div className="section-head">
        <h2 className="head-text">
          Skills &amp; <span>Experience</span>
        </h2>
        <span className="section-head__rule" />
        {experiences.length > 0 && (
          <span className="section-chip">
            {experiences.length} {experiences.length === 1 ? "role" : "roles"}
          </span>
        )}
        {skills.length > 0 && (
          <span className="section-chip">{skills.length} tools</span>
        )}
      </div>

      <div className="app__skills-container app__section-body">
        <motion.div className="app__skills-list">
          {skills.map((skill, i) => (
            <motion.div
              whileInView={{ opacity: [0, 1] }}
              transition={{ duration: 0.5 }}
              className="app__skills-item app__flex"
              key={skill.name || i}
            >
              <div
                className="app__flex"
                style={{ backgroundColor: skill.bgColor }}
              >
                {skill.icon && <img src={urlFor(skill.icon)} alt={skill.name} />}
              </div>
              <p className="p-text">{skill.name}</p>
            </motion.div>
          ))}
        </motion.div>
        {/*  */}
        <div className="app__skills-exp">
          {experiences.map((experience) => (
            <motion.div className="app__skills-exp-item" key={experience.year}>
              <div className="app__skills-exp-year">
                <p className="bold-text">{experience.year}</p>
              </div>
              <motion.div className="app__skills-exp-works">
                {experience.works.map((work) => {
                  const key = `${experience.year}-${work.name}`;
                  const isOpen = Boolean(openRoles[key]);
                  // long roles collapse to a few lines so the section stays
                  // readable in one screen; the visitor opts in to the detail
                  const isLong = (work.company || "").length > 260;

                  return (
                    <motion.div
                      whileInView={{ opacity: [0, 1] }}
                      transition={{ duration: 0.5 }}
                      className="app__skills-exp-work"
                      key={key}
                    >
                      <h4 className="bold-text">{work.name}</h4>
                      <p
                        className={`p-text app__skills-exp-desc ${
                          isLong && !isOpen ? "is-clamped" : ""
                        }`}
                      >
                        {work.company}
                      </p>
                      {isLong && (
                        <button
                          type="button"
                          className="app__skills-exp-more"
                          aria-expanded={isOpen}
                          onClick={() => toggleRole(key)}
                        >
                          {isOpen ? "Show less" : "Read more"}
                        </button>
                      )}
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};
// HOC(HOC)
export default AppWrap(
  MotionWrap(Skills, "app__skills"),
  "skills",
  "app__whitebg"
);
