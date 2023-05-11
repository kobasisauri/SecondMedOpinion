import React, { useState, useEffect } from "react";
import Logo from "../../assets/home.jpg";
import WhiteLogo from "../../assets/home.jpg";

import styles from "./AboutUs.module.scss";

const AboutUs = () => {
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
          <h6>ჩვენი მიზანი</h6>
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
        <div>
          <h6>ჩვენი მიზანი</h6>
          <p>
            ამ კუთხით დავეხმაროთ პაციენტებს ჩვენი განვითარებადი ქვეყნიდან,
            მიიღონ კვალიფიციური მეორე აზრი მათი ჯანმრთელობის შესახებ. ჩვენმა
            გუნდმა გადაწყვიტა ფოკუსირება თავიდანვე რენტგენოლოგიის სფეროზე,
            კომპიუტერულ ტომოგრაფიაზე და მაგნიტორეზონანსულ ტომოგრაფიაზე და
            შემდგომში გაგვეფართოებინა სფერო. ჩვენ გვჯერა, რომ დღესდღეობით სწორი
            დიაგნოზის საფუძველია რენტგენოლოგიური დასკვნების პროფესიული
            ინტერპრეტაცია და ექსპერტიზისა და გამოცდილების ხარისხი.
          </p>
        </div>
        {/* <div>
          <h6>DESIGN</h6>
          <p>
            I have already created quite broad range of different designs and
            are constantly working on new ones. New design can be performed
            according to your specifications and taste giving you an unique
            chance to create your own product. The products are highly
            customizable, it’s up to you select materials, number and width of
            every line, color, overall breadth and length of final product.
          </p>
        </div>
        <div>
          <h6>MATERIALS</h6>
          <p>
            Ie use broad range of materials, including as stainless steel,
            Damascus steel, brass, bronze, nickel, aluminum, copper, beautiful
            and precious exotic sorts of hardwood, carbon fiber, acrylic
            polymers, leather, constantly experimenting with new ideas.
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default AboutUs;
