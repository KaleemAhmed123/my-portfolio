import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./Header.scss";
import { AppWrap } from "../../wrapper";
import { client } from "../../client";
import { socialIconFor } from "../../constants/socialIcons";

const Header = () => {
  const [personalInfo, setPersonalInfo] = useState(null);
  const [intro, setIntro] = useState(null);
  const [socialLinks, setSocialLinks] = useState([]);

  useEffect(() => {
    // Fetch personal info
    const personalInfoQuery = '*[_type == "personalInfo"][0]';
    client.fetch(personalInfoQuery).then((data) => {
      setPersonalInfo(data);
    });

    // Fetch intro
    const introQuery = '*[_type == "intro"][0]';
    client.fetch(introQuery).then((data) => {
      setIntro(data);
    });

    // Fetch social links, ordered by 'order' field
    const socialLinksQuery = '*[_type == "socialLinks"] | order(order asc)';
    client.fetch(socialLinksQuery).then((data) => {
      setSocialLinks(data);
    });
  }, []);

  return (
    <motion.div
      whileInView={{ x: [-100, 0], opacity: [0, 1] }}
      transition={{ duration: 0.5 }}
      className="container"
    >
      <div className="row">
        <div className="left">
          {!personalInfo && (
            <div className="header-skeleton" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <span className="hsk hsk-row" key={i} />
              ))}
            </div>
          )}
          <ul className="info">
            {personalInfo && (
              <>
                {personalInfo.fullName && (
                  <li>
                    <span className="first-block">Full Name:</span>
                    <span className="second-block">{personalInfo.fullName}</span>
                  </li>
                )}
                {personalInfo.phone && (
                  <li>
                    <span className="first-block">Phone:</span>
                    <a href={`tel:${personalInfo.phone}`} target="__blank">
                      <span className="second-block">{personalInfo.phone}</span>
                    </a>
                  </li>
                )}
                {personalInfo.email && (
                  <li>
                    <span className="first-block">Email:</span>
                    <a href={`mailto:${personalInfo.email}`} target="__blank">
                      <span className="second-block">{personalInfo.email}</span>
                    </a>
                  </li>
                )}
                {personalInfo.website && (
                  <li>
                    <span className="first-block">Website:</span>
                    <a href={personalInfo.website} target="__blank">
                      <span className="second-block">
                        {personalInfo.website.replace(/^https?:\/\//, '')}
                      </span>
                    </a>
                  </li>
                )}
                {personalInfo.location && (
                  <li>
                    <span className="first-block">Location:</span>
                    <span className="second-block">{personalInfo.location}</span>
                  </li>
                )}
              </>
            )}
          </ul>
        </div>
        <div className="right">
          {!intro && (
            <div className="header-skeleton" aria-hidden="true">
              <span className="hsk hsk-h2" />
              <span className="hsk hsk-p" />
              <span className="hsk hsk-p" />
              <span className="hsk hsk-p hsk-short" />
            </div>
          )}
          {intro && (
            <>
              {/* The visible headline is a decorative greeting, so the real
                  page h1 lives here for crawlers and screen readers. */}
              <h1 className="sr-only">
                Kaleem Ahmed — {intro.roleLabel || "Backend & Full-Stack Engineer"}
              </h1>
              {/* Greeting and role share one baseline row so the role fills
                  the dead space beside the headline instead of costing a line. */}
              <div className="header-greet">
                {intro.greeting && <h2>{intro.greeting}</h2>}
                {intro.roleLabel && (
                  <p className="header-role">{intro.roleLabel}</p>
                )}
              </div>
              {/* Tagline stays hidden; the intro copy needs the room. */}
              {/* {intro.tagline && (
                <h3 className="header-tagline">{intro.tagline}</h3>
              )} */}
              {intro.section1 && <p>{intro.section1}</p>}
              {intro.section2 && <p>{intro.section2}</p>}
              {intro.section3 && <p>{intro.section3}</p>}
              {/* Stat strip hidden; the figures live in the intro copy for now.
                  Data is still in Sanity, so uncommenting restores it. */}
              {/* {intro.stats?.length > 0 && (
                <ul className="header-stats">
                  {intro.stats.map((s, i) => (
                    <li key={s._key || i}>
                      <strong>{s.value}</strong>
                      <span>{s.label}</span>
                    </li>
                  ))}
                </ul>
              )} */}
            </>
          )}
          <div className="header-actions">
            {socialLinks.length > 0 && (
              <ul className="icons">
                {socialLinks.map((link, index) => {
                  const { Icon, label } = socialIconFor(link);
                  return (
                    <li key={index}>
                      <a
                        href={link.url}
                        target="__blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        title={label}
                      >
                        <Icon />
                      </a>
                    </li>
                  );
                })}
              </ul>
            )}
            {intro && (
              <a className="header-cred-cta" href="/credentials">
                🔑 Test Credential for Project
              </a>
            )}
          </div>
        </div>
      </div>
      <a className="header-scroll-cue" href="#skills">
        <span>Skills, projects and live logins below</span>
        <span className="header-scroll-cue__arrow" aria-hidden="true" />
      </a>
    </motion.div>
  );
};

export default AppWrap(Header, "home");
