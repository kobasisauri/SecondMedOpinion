import { Link } from "react-router-dom";
import { Fade } from "react-reveal";
import Fb from "../../../assets/fb.png";
import Instagram from "../../../assets/insta.png";

import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <Fade bottom>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.logo}>
            <Link to="/">
              EXPERT MED <br /> OPINION
            </Link>
          </div>

          <div className={styles.email}>expertmedopinion@gmail.com</div>

          <div className={styles.text}>
            <a href="https://www.facebook.com/secondmedopinion/" target="blank">
              <img src={Fb} alt="facebook icon" />
            </a>
            <a href="https://www.facebook.com/secondmedopinion/" target="blank">
              <img src={Instagram} alt="instagram icon" />
            </a>
          </div>
        </div>
      </div>
    </Fade>
  );
};

export default Footer;
