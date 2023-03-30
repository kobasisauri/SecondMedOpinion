import React, { useState, useEffect } from "react";

import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import MainPic from "../../assets/logo-bg.jpg";
import HomeSecondPic from "../../assets/home.jpg";
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

  return (
    <div>
      <div className={styles.container}>
        <img className={styles["main-image"]} src={MainPic} alt="main-logo" />
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

      <div className={styles.section3}>
        <h3>How to navigate!</h3>
        <iframe
          className={styles.video}
          frameborder="0"
          scrolling="no"
          marginheight="0"
          marginwidth="0"
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
