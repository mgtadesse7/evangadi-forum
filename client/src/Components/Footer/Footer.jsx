import React from "react";
import classes from "./footer.module.css";
import FooterLogo from "../../assets/images/10003.png";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";

function Footer() {
  return (
    <section className={classes.footer_outer_wrapper}>
      <div className={classes.footer_outer_container}>
        <div className={classes.footer_logo}>
          <img src={FooterLogo} alt="" />
          <div className={classes.icons}>
            <a href="https://www.facebook.com/evangaditech">
              <FaFacebook />
            </a>
            <a href="https://www.facebook.com/evangaditech">
              <FaInstagram />
            </a>
            <a href="https://www.youtube.com/@EvangadiTech">
              <FaYoutube />
            </a>
          </div>
        </div>

        <div className={classes.links}>
          <h5>Useful Link</h5>
          <ul className={classes.footer_links}>
            <li>How it works</li>
            <li>Terms of Service</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div className={classes.links}>
          <h4>Contact Info</h4>
          <ul className={classes.footer_links}>
            <li>Evangadi Networks</li>
            <li>support@evangadi.com</li>
            <li>+1-202-386-2702</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Footer;
