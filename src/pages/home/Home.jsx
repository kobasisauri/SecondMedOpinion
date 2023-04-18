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

        <div style={{ maxWidth: "1920px", padding: "0 7%" }}>
          <h2>Company is about...</h2>
          <p>
            კომპანიის სექონდ მედ ოფინიონის მიზანია, დავეხმაროთ საქართველოს
            პაციენტებს მოისმინონ და მიიღონ უცხლოელი ექიმების სამედიცინო დასკვნა
            და შეხედულება ქვეყნიდან გაუსვლელად უმოკლეს ვადაში, რაც დაეხმარება
            ექსპერტებს დაადასტურონ ან დასვან დიაგნოზი, რაც ძალიან მნიშვნელივანია
            განსაკუთრებით რთულ შემთხვევებში. ამ კუთხით დავეხმაროთ პაციენტებს
            ჩვენი განვითარებადი ქვეყნიდან, მიიღონ კვალიფიციური მეორე აზრი მათი
            ჯანმრთელობის შესახებ. ჩვენმა გუნდმა გადაწყვიტა ფოკუსირება თავიდანვე
            რენტგენოლოგიის სფეროზე, კომპიუტერულ ტომოგრაფიაზე და
            მაგნიტორეზონანსულ ტომოგრაფიაზე და შემდგომში გაგვეფართოებინა სფერო.
            ჩვენ გვჯერა, რომ დღესდღეობით სწორი დიაგნოზის საფუძველია
            რენტგენოლოგიური დასკვნების პროფესიული ინტერპრეტაცია და ექსპერტიზისა
            და გამოცდილების ხარისხი.
          </p>
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
          <h4>Our Mission</h4>
          <p>
            კომპანიის სექონდ მედ ოფინიონის მიზანია, დავეხმაროთ საქართველოს
            პაციენტებს მოისმინონ და მიიღონ უცხლოელი ექიმების სამედიცინო დასკვნა
            და შეხედულება ქვეყნიდან გაუსვლელად უმოკლეს ვადაში, რაც დაეხმარება
            ექსპერტებს დაადასტურონ ან დასვან დიაგნოზი, რაც ძალიან მნიშვნელივანია
            განსაკუთრებით რთულ შემთხვევებში. ამ კუთხით დავეხმაროთ პაციენტებს
            ჩვენი განვითარებადი ქვეყნიდან, მიიღონ კვალიფიციური მეორე აზრი მათი
            ჯანმრთელობის შესახებ. ჩვენმა გუნდმა გადაწყვიტა ფოკუსირება თავიდანვე
            რენტგენოლოგიის სფეროზე, კომპიუტერულ ტომოგრაფიაზე და
            მაგნიტორეზონანსულ ტომოგრაფიაზე და შემდგომში გაგვეფართოებინა სფერო.
            ჩვენ გვჯერა, რომ დღესდღეობით სწორი დიაგნოზის საფუძველია
            რენტგენოლოგიური დასკვნების პროფესიული ინტერპრეტაცია და ექსპერტიზისა
            და გამოცდილების ხარისხი.
          </p>
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
