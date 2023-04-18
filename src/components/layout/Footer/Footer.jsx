import { Link } from "react-router-dom";
import useStore from "../../../stores/store";
import styles from "./Footer.module.scss";

const Footer = () => {
  const { theme } = useStore((state) => state);

  return (
    <div className={`${styles.container} ${styles[theme]}`}>
      <div className={styles.wrapper}>
        <div className={styles.logo}>
          <Link to="/">
            EXPERT MED <div>OPINION</div>
          </Link>
        </div>

        <div className={styles.email}>expertmedopinion@gmail.com</div>

        <div className={styles.text}>
          <a href="https://www.facebook.com/secondmedopinion/" target="blank">
            <i className="bi bi-facebook" />
          </a>

          <a href="https://www.facebook.com/secondmedopinion/" target="blank">
            <i className="bi bi-instagram" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
