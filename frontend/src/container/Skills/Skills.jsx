import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { AppWrap, MotionWrap } from "../../wrapper";
import { ClampedText } from "../../components";
import { urlFor, client } from "../../client";
import "./Skills.scss";

const Skills = () => {
  const [experiences, setExperiences] = useState([]);
  const [skills, setSkills] = useState([]);
  useEffect(() => {
    const query = '*[_type == "experiences"]';
    const skillsQuery = '*[_type == "skills"] | order(order asc)';

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

                  return (
                    <motion.div
                      whileInView={{ opacity: [0, 1] }}
                      transition={{ duration: 0.5 }}
                      className="app__skills-exp-work"
                      key={key}
                    >
                      <h4 className="bold-text">{work.name}</h4>
                      <ClampedText
                        lines={12}
                        className="p-text app__skills-exp-desc"
                        buttonClassName="app__skills-exp-more"
                      >
                        {work.company}
                      </ClampedText>
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
