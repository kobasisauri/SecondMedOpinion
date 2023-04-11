import React, { useState, useEffect } from "react";

import { TextField } from "@mui/material";

import Button from "@mui/material/Button";
import styles from "./ContactUs.module.scss";

const ContactUs = () => {
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
    <div className={styles.container}>
      <h2>CONTACT US</h2>
      <div className={styles.wrapper}>
        <div className={styles["inner-wrapper"]}>
          <div className={styles.items}>
            <h5>E-MAIL</h5>
            <p>contact@ARVICISAXEli.com</p>
          </div>

          <div className={styles.items}>
            <h5>ARVICISAXEli bratt</h5>
            <p>TBILISI</p>
          </div>
        </div>

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
              <Button type="submit" variant="outlined" sx={{ width: "250px" }}>
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
