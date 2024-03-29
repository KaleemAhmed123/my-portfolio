import React from "react";
import { motion } from "framer-motion";
import "./Header.scss";
import { BsGithub, BsLinkedin, BsTwitter } from "react-icons/bs";
import { SiLeetcode } from "react-icons/si";
import { AppWrap } from "../../wrapper";

const Header = () => (
  <motion.div
    whileInView={{ x: [-100, 0], opacity: [0, 1] }}
    transition={{ duration: 0.5 }}
    className="container"
  >
    <div className="row">
      <div className="left">
        <ul className="info">
          <li>
            <span className="first-block">Full Name:</span>
            <span className="second-block">Kaleem Ahmed</span>
          </li>
          <li>
            <span className="first-block">Phone:</span>
            <a href="tel:+91 6306026859" target="__blank">
              <span className="second-block">+91 6306026859</span>
            </a>
          </li>
          <li>
            <span className="first-block">Email:</span>
            <a href="mailto:shaamidreez@gmail.com" target="__blank">
              <span className="second-block">shaamidreez@gmai.com</span>
            </a>
          </li>
          <li>
            <span className="first-block">Website:</span>
            <a href="https://kaleem.netlify.app" target="__blank">
              <span className="second-block">kaleem.netlify.com</span>
            </a>
          </li>
          <li>
            <span className="first-block">Location:</span>
            <span className="second-block">UP India 208019</span>
          </li>
        </ul>
      </div>
      <div className="right">
        <h2>Hello There!</h2>
        <p>
          I'm Kaleem, I have sound knowledge of Data Structures and Algorithms.
          With a passion for problem-solving, I've solved <b>1100+</b> coding
          problems in the past 2.5 years on various platforms like{" "}
          <b>Leetcode</b>, <b>GFG</b>, <b>Codeforces</b>. I stay up to date with
          the latest industry trends to tackle complex problems and provide
          creative solutions that impress my peers and mentors alike. &nbsp;
        </p>
        <p>
          And I possess a wide range of technical skills and have demonstrated
          proficiency in web technologies, I've also gained considerable
          experience building projects using latest technologies, which has
          helped me develop my problem-solving skills and hone my ability to
          work in a team.
        </p>
        <p>
          Overall, I'm confident in my technical abilities and eager to leverage
          my skills to contribute to meaningful projects in the future. Whether
          it's building scalable web applications, designing efficient
          algorithms, or collaborating with teams, I am excited to take on new
          challenges and grow as a developer.
        </p>
        <ul className="icons">
          <li>
            <a
              href="https://www.linkedin.com/in/kaleem-ahmed-"
              target="__blank"
            >
              <BsLinkedin />
            </a>
          </li>
          <li>
            <a href="https://github.com/KaleemAhmed123" target="__blank">
              <BsGithub />
            </a>
          </li>
          <li>
            <a href="https://leetcode.com/Kaleem_Ahmed/" target="__blank">
              <SiLeetcode />
            </a>
          </li>
          <li>
            <a href="https://twitter.com/IdreesShaam" target="__blank">
              <BsTwitter />
            </a>
          </li>
        </ul>
      </div>
    </div>
  </motion.div>
);
export default AppWrap(Header, "home");
