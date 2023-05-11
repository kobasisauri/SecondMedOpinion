import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Test from "../../assets/testclinic1.jpg";
import data from "../../static/short-data";
import styles from "./MRI.module.scss";

const MRI = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <img src={Test} alt="navigation" />
        <div className={styles["info-text"]}>
          <h2>Navigation</h2>
          <p>
            <span>Navigation</span> tests analyze how users navigate through
            your website or application, given a specific task or goal. The
            results help you hone critical user flows, and improve your
            information architectureNavigation tests analyze how users navigate
            through your website or application, given a specific task or goal.
            The results help you hone critical user flows, and improve your
            information architectureNavigation tests analyze how users navigate
            through your website or application, given a specific task or goal.
            The results help you hone critical user flows, and improve your
            information architecture
          </p>
        </div>
      </div>

      <div className={styles.items}>
        {data.map((item) => (
          <div key={item.id} className={styles.item}>
            <div className={styles.image}>
              <img src={item.image} alt="doctor" />
            </div>

            <div className={`d-flex justify-content-between ${styles.main}`}>
              <div className={styles["personal-data"]}>
                <p className={styles.name}>
                  {item.firstname} {item.lastname}
                </p>
                <p className={styles.job}>{item.profession}</p>
                <p className={styles.country}>{item.country}</p>
              </div>

              <div className={styles.description}>
                <p className={styles.experiance}>Work experience</p>
                <p style={{ wordBreak: "break-word" }}>{item.experiance}</p>
              </div>

              <div className={styles.links}>
                <Link to={`/mri/${item.id}`}>{t("Resume")}</Link>
                <Link to="/form">{t("Aplication")}</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MRI;
