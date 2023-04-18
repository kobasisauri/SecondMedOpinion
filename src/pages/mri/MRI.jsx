import React, { useState } from "react";
import Test from "../../assets/testclinic1.jpg";
import styles from "./MRI.module.scss";

import Doctor1 from "../../assets/doctors/dimitriN1.jpg";

const items = [1, 2, 3, 4, 5];

const MRI = () => {
  const [open, setOpen] = useState(false);
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
        {items.map((item, i) => (
          <>
            <div
              key={i}
              className={styles.item}
              onClick={() => {
                setOpen(!open);
              }}
            >
              <div className={styles.image}>
                <img src={Doctor1} alt="doctor" />
              </div>

              <div className={styles.main}>
                <p className={styles.name}>Dimitri Vladimirovich</p>
                <p className={styles.job}>Radiologist</p>
                <p className={styles.job}>Age: 29</p>
              </div>
              <div className={styles.description}>
                <p className={styles.experiance}>Work experience:</p>
                <p>Radiologist: City Clinical Hospital N40 DZM</p>
                <p>Radiologist: Children's Clinical Hospital N9</p>
              </div>
            </div>
            {/* {open && <div>makoce</div>} */}
          </>
        ))}
      </div>
    </div>
  );
};

export default MRI;
