import { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams, Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import useStore from "../../stores/store";
import data from "../../static/data";
import styles from "./Resume.module.scss";

const Resume = () => {
  const { setLoading } = useStore((state) => state);
  const { t } = useTranslation();
  const { id } = useParams();
  const [resume, setResume] = useState(null);

  useEffect(() => {
    setLoading(true);
    if (id) {
      setResume(data.filter((item) => item.id === +id)[0]);
    }

    async function load() {
      return new Promise((res) => {
        setTimeout(res, 2000);
      });
    }

    // setTimeout(() => setLoading(false), 2000);

    load().then(() => setLoading(false));
  }, [id, setLoading]);

  return (
    <div className={styles.wrapper}>
      {resume && (
        <Row className="justify-content-center">
          <Col lg={10} className={styles["docto-info"]}>
            <Row className="mb-4">
              <Col>
                <div className={styles.name}>
                  {resume.firstname} {resume.lastname}
                </div>

                <div className={styles.inner}>
                  {resume.profession}, <span>{resume.country}</span>
                </div>
                <div className={styles.links}>
                  <Link to="/form">შეავსეთ ფორმა</Link>
                </div>
              </Col>

              <Col className="d-flex justify-content-end">
                <img
                  src={resume.image}
                  alt="doctor"
                  className={styles["doctor-img"]}
                />
              </Col>
            </Row>

            <div className={styles["inner-title"]}>{t("Experience")}</div>

            <Row className="mb-4">
              {resume.experience.map((item, i) => (
                <Fragment key={i}>
                  <Col md={3} className={styles.year}>
                    {item.year}
                  </Col>

                  <Col md={9} className={styles.desc}>
                    {item.description}
                  </Col>
                </Fragment>
              ))}
            </Row>

            <div className={styles["inner-title"]}>{t("Education")}</div>

            <Row className="mb-4">
              {resume.education.map((item, i) => (
                <Fragment key={i}>
                  <Col md={3} className={styles.year}>
                    {item.year}
                  </Col>

                  <Col md={9} className={styles.desc}>
                    {item.description}
                  </Col>
                </Fragment>
              ))}
            </Row>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default Resume;
