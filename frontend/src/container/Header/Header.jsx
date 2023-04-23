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
    <div class="row">
      <div class="left">
        <ul class="info">
          <li>
            <span class="first-block">Full Name:</span>
            <span class="second-block">Kaleem Ahmed</span>
          </li>
          <li>
            <span class="first-block">Phone:</span>
            <a href="tel:+91 6306026859">
              <span class="second-block">+91 6306026859</span>
            </a>
          </li>
          <li>
            <span class="first-block">Email:</span>
            <a href="mailto:shaamidreez@gmail.com">
              <span class="second-block">shaamidreez@gmai.com</span>
            </a>
          </li>
          <li>
            <span class="first-block">Website:</span>
            <a href="https://kaleem.netlify.app">
              <span class="second-block">kaleem.netlify.com</span>
            </a>
          </li>
          <li>
            <span class="first-block">Location:</span>
            <span class="second-block">UP India 208019</span>
          </li>
        </ul>
      </div>
      <div class="right">
        <h2>Hello There!</h2>
        <p>
          I'm Kaleem, I possess a wide range of technical skills and have
          demonstrated proficiency in web technologies, I've also gained
          considerable experience building complex projects using these
          technologies, which has helped me develop my problem-solving skills
          and hone my ability to work in a team.
        </p>
        <p>
          I'm an good at Data Structures and Algorithms with a passion for
          Problem-solving, solved <b>650+</b> coding problems on various
          platforms, I stay up to date with the latest industry trends to tackle
          complex problems and provide creative solutions that impress my peers
          and mentors alike. &nbsp;
        </p>
        <p>
          Overall, I'm confident in my technical abilities and eager to leverage
          my skills to contribute to meaningful projects in the future. Whether
          it's building scalable web applications, designing efficient
          algorithms, or collaborating with teams, I am excited to take on new
          challenges and grow as a developer.
        </p>
        <ul class="icons">
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
