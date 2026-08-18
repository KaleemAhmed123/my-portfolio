import React, { useState, useEffect } from "react";
import { client } from "../client";
import { socialIconFor } from "../constants/socialIcons";

const SocialMedia = () => {
  const [socialLinks, setSocialLinks] = useState([]);

  useEffect(() => {
    // Fetch social links, ordered by 'order' field
    const query = '*[_type == "socialLinks"] | order(order asc)';

    client.fetch(query).then((data) => {
      setSocialLinks(data);
    });
  }, []);

  return (
    <div className="app__social">
      {socialLinks.map((link, index) => {
        const { Icon, label } = socialIconFor(link);
        return (
          <div key={index}>
            <a
              href={link.url}
              target="__blank"
              rel="noopener noreferrer"
              aria-label={label}
              title={label}
            >
              <Icon />
            </a>
          </div>
        );
      })}
    </div>
  );
};

export default SocialMedia;
