import React, { useState, useEffect } from "react";
import { BsTwitter, BsGithub, BsLinkedin, BsFacebook, BsInstagram } from "react-icons/bs";
import { SiLeetcode, SiStackoverflow } from "react-icons/si";
import { client } from "../client";

const SocialMedia = () => {
  const [socialLinks, setSocialLinks] = useState([]);

  useEffect(() => {
    // Fetch social links, ordered by 'order' field
    const query = '*[_type == "socialLinks"] | order(order asc)';

    client.fetch(query).then((data) => {
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
    <div className="app__social">
      {socialLinks.map((link, index) => (
        <div key={index}>
          <a href={link.url} target="__blank" rel="noopener noreferrer">
            {getIcon(link.platform)}
          </a>
        </div>
      ))}
    </div>
  );
};

export default SocialMedia;
