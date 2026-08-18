import { BsGithub, BsLinkedin, BsTwitter, BsFacebook, BsInstagram } from "react-icons/bs";
import { SiLeetcode, SiStackoverflow, SiGeeksforgeeks } from "react-icons/si";

// Sanity's platform list has no LeetCode or GeeksForGeeks option, so those links
// come back as "other". Read the host first, fall back to platform.
const BY_HOST = {
  "leetcode.com": [SiLeetcode, "LeetCode"],
  "geeksforgeeks.org": [SiGeeksforgeeks, "GeeksForGeeks"],
  "github.com": [BsGithub, "GitHub"],
  "linkedin.com": [BsLinkedin, "LinkedIn"],
  "twitter.com": [BsTwitter, "Twitter"],
  "x.com": [BsTwitter, "Twitter"],
  "stackoverflow.com": [SiStackoverflow, "Stack Overflow"],
  "facebook.com": [BsFacebook, "Facebook"],
  "instagram.com": [BsInstagram, "Instagram"],
};

const BY_PLATFORM = {
  linkedin: [BsLinkedin, "LinkedIn"],
  github: [BsGithub, "GitHub"],
  twitter: [BsTwitter, "Twitter"],
  stackoverflow: [SiStackoverflow, "Stack Overflow"],
  leetcode: [SiLeetcode, "LeetCode"],
  geeksforgeeks: [SiGeeksforgeeks, "GeeksForGeeks"],
  facebook: [BsFacebook, "Facebook"],
  instagram: [BsInstagram, "Instagram"],
};

const byHost = (url) => {
  try {
    const host = new URL(url).hostname.replace(/^www\./, "");
    return BY_HOST[host] || BY_HOST[host.split(".").slice(-2).join(".")];
  } catch {
    return undefined;
  }
};

// Returns { Icon, label }. Label is used as the link's accessible name.
export const socialIconFor = ({ platform = "", url = "" } = {}) => {
  const [Icon, label] = byHost(url) ||
    BY_PLATFORM[platform.toLowerCase()] || [BsGithub, platform || "Link"];
  return { Icon, label };
};
