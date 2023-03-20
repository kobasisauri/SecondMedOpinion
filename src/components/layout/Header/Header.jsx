import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import styles from "./Header.module.scss";

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor:
          theme.palette.mode === "dark" ? "#2ECA45" : "rgb(157, 151, 142)",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

const navs = [
  { item: "HOME", link: "home" },
  { item: "MRI", link: "mri" },
  { item: "SHOP", link: "shop" },
  { item: "ABOUT US", link: "about-us" },
  { item: "CONTACT US", link: "contact-us" },
];

const Header = ({ toggleTheme, theme, className }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className={`${styles["header-container"]} ${styles[theme]}`}>
        <div className={styles.wrapper}>
          <div className={`${styles.container} ${styles[className]}`}>
            <div className={styles.logo}>
              <Link to="/">
                ARVICISAXEli <br /> GEFICEBI
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
                    {nav.item}
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
                className={({ isActive, isPending }) =>
                  `${isPending ? "pending" : isActive ? styles.active : ""}`
                }
              >
                {nav.item}
              </NavLink>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Header;
