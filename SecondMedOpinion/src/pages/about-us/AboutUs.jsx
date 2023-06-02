import React, { useState, useEffect } from "react";
import Logo from "../../assets/home.jpg";
import WhiteLogo from "../../assets/home.jpg";
import { useTranslation } from "react-i18next";

import styles from "./AboutUs.module.scss";

const AboutUs = () => {
  const { t } = useTranslation();
  let color = JSON.parse(localStorage.getItem("theme"));

  const [theme, setTheme] = useState(false);

  useEffect(() => {
    if (color === "light") {
      setTheme(true);
    } else if (color === "dark") {
      setTheme(false);
    }
  }, [color]);

  return (
    <div className={styles.container}>
      <div className={styles.innerwrapper}>
        {!theme ? (
          <img src={WhiteLogo} alt="logo" className={styles.image} />
        ) : (
          <img src={Logo} alt="logo" className={styles.image} />
        )}
      </div>
      <div className={styles.innerwrapper}>
        <h2>EXSPERT MED OPINION</h2>
        <div>
          {/* <h6>ჩვენი მიზანი</h6> */}
          <p>{t("AboutUs-1")}</p>

          <p>{t("AboutUs-2")}</p>

          <p>{t("AboutUs-3")}</p>

          <p>{t("AboutUs-4")}</p>

          <p>{t("AboutUs-5")}</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
