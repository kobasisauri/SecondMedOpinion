import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Test from "../../assets/testclinic1.jpg";
import data from "../../static/short-data";

import QA from "./QA/QA";
import styles from "./MRI.module.scss";

const MRI = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div className={styles["info-text"]}>
          <h2>Navigation</h2>
          <p>
            მაგნიტორეზონანსული ტომოგრაფია (მრტ) არის არაინვაზიური რადიოლოგიური
            დიაგნოსტიკის მეთოდი, რომელიც იძლევა სხეულის ნებისმიერი ორგანოთა
            სისტემის ან ცალკეული ორგანოების სამ განზომილებიანი დეტალურ
            გამოსახულების მიღებას. MRI სრულებით უსაფრთხოა ჯანმრთელობისათვის და
            მისი გამოყენება დაშვებულია ორსულობის დროსაც, რადგან გამოსახულების
            მისაღებად რენდგენის სხივის ნაცვლად გამოიყენება მაგნიტური ველი. მრტ
            გადაღება შესაძლებელია როგორც საკონტრასტო საშუალების გამოყენებით
            ასევე მის გარეშე.
          </p>
          <QA />
        </div>
        <img src={Test} alt="navigation" />
      </div>

      <div className={styles.items}>
        {data.map((item) => (
          <div key={item.id} className={styles.item}>
            <div className={styles.image}>
              <img src={item.image} alt="doctor" />
            </div>

            <div className={`d-flex justify-content-between ${styles.main}`}>
              <div className={styles["personal-data"]}>
                <p className={styles.name}>
                  {item.firstname} {item.lastname}
                </p>
                <p className={styles.job}>{item.profession}</p>
                <p className={styles.country}>{item.country}</p>
              </div>

              <div className={styles.description}>
                <p className={styles.experiance}>Work experience</p>
                <p style={{ wordBreak: "break-word" }}>{item.experiance}</p>
              </div>

              <div className={styles.links}>
                <Link to={`/mri/${item.id}`}>{t("Resume")}</Link>
                <Link to="/form">{t("Application")}</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MRI;
