import React from "react";
import "./style.css";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";
import TwitterIcon from "@mui/icons-material/Twitter";

function Footer() {
  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  return (
    <div className="footer">
      <h2 className="logo" onClick={topFunction}>
      Maintained & Developed by<span style={{ color: "var(--blue)" }}> -Navneet Prakash</span>
      </h2>
      
      <div className="social-links">
        <a href="https://www.linkedin.com/in/navneet-prakash-26a188203/" target="_blank" rel="noopener noreferrer">
          <LinkedInIcon className="social-link" />
        </a>
        <a href="https://github.com/innovativenavneet" target="_blank" rel="noopener noreferrer">
          <GitHubIcon className="social-link" />
        </a>
        <a href="mailto:navneet.prakash1233@gmail.com">
          <EmailIcon className="social-link" />
        </a>
        <a href="https://x.com/Navneet78762061" target="_blank" rel="noopener noreferrer">
          <TwitterIcon className="social-link" />
        </a>
      </div>
    </div>
  );
}

export default Footer;
