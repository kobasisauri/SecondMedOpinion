import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";

import { useTranslation } from "react-i18next";

import Test1 from "../../assets/test1.jpg";
import Test2 from "../../assets/test2.jpg";
import Test3 from "../../assets/test3.jpg";

import HomeSlider1 from "../../assets/images/HomeSlider1.jpg";
import HomeSlider2 from "../../assets/images/HomeSlider2.jpg";
import HomeSlider3 from "../../assets/images/HomeSlider3.jpeg";

import HomeSlider5 from "../../assets/images/HomeSlider5.jpg";

import ContactImage from "../../assets/contact-us.png";
import styles from "./Home.module.scss";

const Home = () => {
  const { t } = useTranslation();
  let color = JSON.parse(localStorage.getItem("theme"));
  const [theme, setTheme] = useState("#181717");

  useEffect(() => {
    if (color === "light") {
      setTheme("#181717");
    } else if (color === "dark") {
      setTheme("#e3e3e3");
    }
  }, [color]);

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 4000,
    autoplaySpeed: 1000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,

          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const settings2 = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (
    <div>
      {/* <div className={styles.container}>
        <img className={styles["main-image"]} src={MainPic} alt="main-logo" />
      </div> */}

      <div className={styles.container}>
        <Slider {...settings2}>
          <div>
            <img
              className={styles["main-image"]}
              src={HomeSlider3}
              alt="main-logo"
            />
          </div>
          <div>
            <img
              className={styles["main-image"]}
              src={HomeSlider1}
              alt="main-logo"
            />
          </div>
          <div>
            <img
              className={styles["main-image"]}
              src={HomeSlider5}
              alt="main-logo"
            />
          </div>
        </Slider>

        <div style={{ maxWidth: "1920px", padding: "0 7%", marginTop: "1rem" }}>
          <h2 style={{ fontFamily: "Mtavruli", fontWeight: "600" }}>
            {t("WhoAreWe")}{" "}
            <span
              style={{
                fontSize: "24px",
                fontFamily: "sans-serif",
                fontWeight: "300",
              }}
            >
              ?
            </span>
          </h2>
          <div className={styles["home-text"]}>
            {/* <ul> */}
            <li>{t("WhoAreWe-1")}</li>

            <li>{t("WhoAreWe-2")}</li>

            <li>{t("WhoAreWe-3")}</li>

            <li>{t("WhoAreWe-4")}</li>

            <li>{t("WhoAreWe-5")}</li>
            {/* </ul> */}

            {/* <p>{t("WhoAreWe-1")}</p>
            <p>{t("WhoAreWe-2")}</p>
            <p>{t("WhoAreWe-3")}</p>
            <p>{t("WhoAreWe-4")}</p>
            <p>{t("WhoAreWe-5")}</p> */}
          </div>
        </div>
      </div>

      <div className={styles.section2}>
        <div className={styles["about-image-container"]}>
          <img
            className={styles["about-image"]}
            src={HomeSlider2}
            alt="random"
          />
        </div>

        <div className={styles["about-container"]}>
          <h4 style={{ fontFamily: "Mtavruli", fontWeight: "600" }}>
            {t("WhyEMO")}
          </h4>
          <div className={styles["home-text"]}>
            <li>{t("WhyEMO-1")}</li>
            <li>{t("WhyEMO-2")}</li>
            <li>{t("WhyEMO-3")}</li>
            <li>{t("WhyEMO-4")}</li>
            <li>{t("WhyEMO-5")}</li>
          </div>
        </div>
      </div>
      <hr />

      <div className={styles.section5}>
        <Slider {...settings}>
          <div>
            <img src={Test1} alt="doctor" />
            <p>guram ragacashvili</p>
          </div>
          <div>
            <img src={Test2} alt="doctor" />
            <p>guram ragacashvili</p>
          </div>
          <div>
            <img src={Test3} alt="doctor" />
            <p>guram ragacashvili</p>
          </div>
          <div>
            <img src={Test1} alt="doctor" />
            <p>guram ragacashvili</p>
          </div>
          <div>
            <img src={Test2} alt="doctor" />
            <p>guram ragacashvili</p>
          </div>
          <div>
            <img src={Test3} alt="doctor" />
            <p>guram ragacashvili</p>
          </div>
        </Slider>
      </div>

      <div className={styles.section3}>
        <h3>How to navigate!</h3>
        <iframe
          title="iframe"
          className={styles.video}
          frameBorder="0"
          scrolling="no"
          marginHeight="0"
          marginWidth="0"
          width="788.54"
          height="443"
          type="text/html"
          src="https://www.youtube.com/embed/JnXcBj7dJQk?autoplay=0&fs=1&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0&start=0&end=0&origin=https://youtubeembedcode.com"
        ></iframe>
      </div>
      <hr />

      <div className={styles.section4}>
        <h3>Contact Us</h3>
        <div className={styles.wrapper}>
          <div className={styles["inner-wrapper"]}>
            <form className={styles.form}>
              <p>Full Name</p>
              <TextField
                id="outlined-basic"
                label="What's your full name?"
                variant="outlined"
                sx={{
                  width: "360px",
                  "& .MuiOutlinedInput-root": {
                    "& > fieldset": { borderColor: theme },
                  },
                }}
              />
              <p>Email address</p>
              <TextField
                id="outlined-basic"
                label="example@gmail.com"
                variant="outlined"
                sx={{
                  width: "360px",
                  "& .MuiOutlinedInput-root": {
                    "& > fieldset": { borderColor: theme },
                  },
                }}
              />
              <p>Message</p>
              <TextField
                id="outlined-multiline-static"
                label="Write your message for team here"
                multiline
                rows={3}
                sx={{
                  width: "360px",
                  "& .MuiOutlinedInput-root": {
                    "& > fieldset": { borderColor: theme },
                  },
                }}
              />

              <div className={styles["button-wrrapper"]}>
                <Button
                  type="submit"
                  variant="outlined"
                  sx={{ width: "250px" }}
                >
                  Submit
                </Button>
              </div>
            </form>
          </div>
          <div className={styles["contact-image"]}>
            <img src={ContactImage} alt="contact-us" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
