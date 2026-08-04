import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./Header.scss";
import { BsGithub, BsLinkedin, BsTwitter, BsFacebook, BsInstagram } from "react-icons/bs";
import { SiLeetcode, SiStackoverflow } from "react-icons/si";
import { AppWrap } from "../../wrapper";
import { client } from "../../client";

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

  // Icon mapping for social platforms
  const getIcon = (platform) => {
    const icons = {
      linkedin: BsLinkedin,
      github: BsGithub,
      twitter: BsTwitter,
      stackoverflow: SiStackoverflow,
      leetcode: SiLeetcode,
      facebook: BsFacebook,
      instagram: BsInstagram,
    };
    const IconComponent = icons[platform.toLowerCase()] || BsGithub;
    return <IconComponent />;
  };

  return (
    <motion.div
      whileInView={{ x: [-100, 0], opacity: [0, 1] }}
      transition={{ duration: 0.5 }}
      className="container"
    >
      <div className="row">
        <div className="left">
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
          {intro && (
            <>
              {intro.greeting && <h2>{intro.greeting}</h2>}
              <h3 className="header-tagline">
                Backend-heavy engineer who owns the whole thing.
              </h3>
              {intro.section1 && <p>{intro.section1}</p>}
              {intro.section2 && <p>{intro.section2}</p>}
              {intro.section3 && <p>{intro.section3}</p>}
            </>
          )}
          <a className="header-cred-cta" href="/credentials">
            🔑 Test Access for Recruiters
          </a>
          {socialLinks.length > 0 && (
            <ul className="icons">
              {socialLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.url} target="__blank" rel="noopener noreferrer">
                    {getIcon(link.platform)}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default AppWrap(Header, "home");
