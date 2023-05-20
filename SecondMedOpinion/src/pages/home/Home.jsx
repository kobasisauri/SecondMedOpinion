import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import MainPic from "../../assets/logo-bg.jpg";
import HomeSecondPic from "../../assets/home.jpg";

import Test1 from "../../assets/test1.jpg";
import Test2 from "../../assets/test2.jpg";
import Test3 from "../../assets/test3.jpg";
import TestClinic1 from "../../assets/testclinic1.jpg";
import TestClinic2 from "../../assets/testclinic2.jpg";

import ContactImage from "../../assets/contact-us.png";
import styles from "./Home.module.scss";

const Home = () => {
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
              src={MainPic}
              alt="main-logo"
            />
          </div>
          <div>
            <img
              className={styles["main-image"]}
              src={TestClinic1}
              alt="main-logo"
            />
          </div>
          <div>
            <img
              className={styles["main-image"]}
              src={TestClinic2}
              alt="main-logo"
            />
          </div>
        </Slider>

        <div style={{ maxWidth: "1920px", padding: "0 7%", marginTop: "1rem" }}>
          <h2>ვინ ვართ ჩვენ</h2>
          <div style={{ marginTop: "1rem" }}>
            <p>
              კომპანია Expert MED Opinion წარმოადგენს შუამავალ კომპანიას თქვენსა
              და მსოფლიოს სხვადასხვა ქვეყნის წამყვან სპეციალისტებს შორის;
            </p>
            <p>
              ჩვენი კომპანიის მიზანია მიიღოთ მაღალპროფესიონალური მომსახურება და
              კონსულტაცია ქვეყნიდან გაუსვლელად;
            </p>
            <p>
              ჩვენი კომპანია ორიენტირებულია ისეთი დიაგნოსტიკური კვლევების
              ინტერპრეტაციაზე, როგორებიცაა მაგნიტო რეზონანსული ტომოგრაფია და
              კომპიუტერული ტომოგრაფია;
            </p>
            <p>
              ჩვენ ვთანამშრომლობთ წამყვან სპეციალისტებთან მთელი მსოფლიოს
              მასშტაბით;
            </p>
            <p>
              ჩვენი მთავარი მიზანია მოგაწოდოთ თქვენთვის სასურველი კვლევის
              შედეგების ინტერპრეტაცია უმოკლეს დროში და მაღალი ხარისხის
              გარანტიით.
            </p>
          </div>
        </div>
      </div>

      <div className={styles.section2}>
        <div className={styles["about-image-container"]}>
          <img
            className={styles["about-image"]}
            src={HomeSecondPic}
            alt="random"
          />
        </div>

        <div className={styles["about-container"]}>
          <h4>რატომ Expert MED Opinion?</h4>
          <div style={{ marginTop: "1rem" }}>
            <p>
              ჩვენ დაგეხმარებით უმოკლეს დროში და სახლიდან გაუსვლელად მიიღოთ
              კონსულტაცია მსოფლიოს სხვადასხვა წამყვანი კლინიკების საუკეთესო
              სპეციალისტებისგან;
            </p>
            <p>
              საიტზე არსებული მარტივი შესავსები ფორმა საშუალებას მოგცემთ დაზოგოთ
              თქვენი დრო;
            </p>
            <p>
              თქვენ არ დაგჭირდებათ ზრუნვა სამედიცინო დოკუმენტაციის თარგმნაზე;
            </p>
            <p>
              კომუნიკაციის გასამარტივებლად ჩვენ შევიმუშავეთ ფორმა, რომლიც
              შესავსებად მხოლოდ რამდენიმე წუთი დაგჭირდებათ;
            </p>
            <p>
              ჩვენ დაგეხმარებით სპეციალისტის მიერ გამოგზავნილი დასკვნის
              თარგმანში.
            </p>
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
