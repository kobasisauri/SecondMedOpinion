import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { IOSSwitch } from "./ThemeSwitch";
import FormControlLabel from "@mui/material/FormControlLabel";
import styles from "./Header.module.scss";
import useStore from "../../../stores/store";
import WhiteLogo from "../../../assets/white-logo.png";
// import BlackLogo from "../../../assets/black-logo.png";
// import GeorgiaIcon from "../../../assets/georgia-icon.png";
import Select from "./Select";

const navs = [
  { item: "Home", link: "home" },
  { item: "AboutUs", link: "about-us" },
  { item: "MRI", link: "mri" },
  { item: "CT", link: "computer-tomography" },
  { item: "ContactUs", link: "contact-us" },
  { item: "Application", link: "form" },
];

const Header = ({ className }) => {
  const { theme, setTheme } = useStore((state) => state);
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");

    localStorage.setItem(
      "theme",
      JSON.stringify(theme === "light" ? "dark" : "light")
    );
  };

  return (
    <>
      <div className={`${styles["top-header"]} ${styles[theme]}`}>
        <div className={`${styles.wrapper} d-flex justify-content-end`}>
          <a href="https://www.facebook.com/secondmedopinion/" target="blank">
            <i className="bi bi-facebook" />
          </a>

          <a
            href="https://www.facebook.com/secondmedopinion/"
            target="blank"
            className="ms-3"
          >
            <i className="bi bi-instagram" />
          </a>

          <div className="ms-3">
            +995 333 333 333
            <i className="bi bi-telephone-fill ms-1" />
          </div>

          {/* <img src={GeorgiaIcon} alt="flag" className="ms-3" /> */}

          <Select />
        </div>
      </div>

      <div className={`${styles["header-container"]} ${styles[theme]}`}>
        <div className={styles.wrapper}>
          <div className={`${styles.container} ${styles[className]}`}>
            <div className={styles.logo}>
              <Link to="/">
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img src={WhiteLogo} alt="logo" style={{ height: "64px" }} />
                  <div>
                    <b>EXPERT</b> MED <br /> OPINION
                  </div>
                </div>
              </Link>
            </div>

            <div className={styles.items}>
              {navs.map((nav, i) => (
                <div key={i}>
                  <NavLink
                    to={nav.link}
                    className={({ isActive, isPending }) =>
                      `${isPending ? "pending" : isActive ? styles.active : ""}`
                    }
                  >
                    {t(nav.item)}
                  </NavLink>
                </div>
              ))}
            </div>

            <div className={styles["last-child-wrapper"]}>
              <FormControlLabel
                control={
                  <IOSSwitch
                    sx={{ m: 1 }}
                    defaultChecked
                    onChange={toggleTheme}
                  />
                }
              />

              <div
                onClick={() => setOpen(!open)}
                className={`${styles["burger-wrapper"]} ${
                  open ? styles.open : styles.close
                }`}
              >
                <div />
                <div />
                <div />
              </div>
            </div>
          </div>
        </div>
      </div>

      {open && (
        <div className={`${styles["open-items"]} ${styles[theme]}`}>
          {navs.map((nav, i) => (
            <div key={i}>
              <NavLink
                to={nav.link}
                onClick={() => setOpen(false)}
                className={({ isActive, isPending }) =>
                  `${isPending ? "pending" : isActive ? styles.active : ""}`
                }
              >
                {t(nav.item)}
              </NavLink>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Header;
