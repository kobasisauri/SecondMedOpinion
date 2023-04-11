import { Link } from "react-router-dom";

// import Fb from "../../../assets/fb.png";
// import Instagram from "../../../assets/insta.png";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.logo}>
          <Link to="/">
            EXPERT MED <div>OPINION</div>
          </Link>
        </div>

        <div className={styles.email}>expertmedopinion@gmail.com</div>

        <div className={styles.text}>
          <a href="https://www.facebook.com/secondmedopinion/" target="blank">
            {/* <img src={Fb} alt="facebook icon" /> */}
            <i className="bi bi-facebook" />
          </a>

          <a href="https://www.facebook.com/secondmedopinion/" target="blank">
            {/* <img src={Instagram} alt="instagram icon" /> */}
            <i className="bi bi-instagram" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
