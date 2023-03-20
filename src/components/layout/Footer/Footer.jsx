import { Link } from "react-router-dom";
import { Fade } from "react-reveal";

import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <Fade bottom>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.logo}>
            <Link to="/">
              ARVICISAXEli <br /> GEFICEBI
            </Link>
          </div>

          <div className={styles.email}>contact@arvicisaxeli.com</div>

          <div className={styles.text}>TBILISI</div>
        </div>
      </div>
    </Fade>
  );
};

export default Footer;
