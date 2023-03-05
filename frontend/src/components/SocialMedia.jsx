import React from "react";
import { BsTwitter } from "react-icons/bs";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";

const SocialMedia = () => (
  <div className="app__social">
    <div>
      <a href="https://twitter.com/IdreesShaam" target="__blank">
        <BsTwitter />
      </a>
    </div>
    <div>
      <a href="https://www.linkedin.com/in/kaleem-ahmed-/" target="__blank">
        <FaLinkedinIn />
      </a>
    </div>
    <div>
      <a href="https://github.com/KaleemAhmed123" target="__blank">
        <FaGithub />
      </a>
    </div>
  </div>
);

export default SocialMedia;
