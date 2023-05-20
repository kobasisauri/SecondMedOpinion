import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Accordion, useAccordionButton } from "react-bootstrap";
import { UilMinus, UilPlus } from "@iconscout/react-unicons";
import classes from "./QA.module.scss";

function CustomToggle({ children, eventKey, callback, open, setOpen }) {
  const decoratedOnClick = useAccordionButton(eventKey, () => {
    callback && callback(eventKey);

    if (open !== eventKey) {
      setOpen(eventKey);
    } else {
      setOpen(0);
    }
  });

  return (
    <div
      className={`d-flex align-items-center py-3 ${classes["item-header"]}`}
      onClick={decoratedOnClick}
    >
      <div>
        {open === eventKey ? (
          <UilMinus size="26" className={classes.icon} />
        ) : (
          <UilPlus size="26" className={classes.icon} />
        )}
      </div>
      {children}
    </div>
  );
}

const QA = () => {
  const [open, setOpen] = useState(0);
  const { t } = useTranslation();

  return (
    <Accordion className="mt-5 pt-4" style={{ width: "95%" }}>
      {/* <h2 className="fw-bold text-center mb-4">FAQ</h2> */}

      <div className="border-bottom">
        <CustomToggle eventKey="1" open={open} setOpen={setOpen}>
          {t("MRI.QA1.Question")}
        </CustomToggle>

        <Accordion.Collapse eventKey="1">
          <div className={classes["item-body"]}>
            {/* <div className="mb-3">{t("FAQ.QA1.Desc1")}</div> */}

            <ul className="mb-0">
              <li>{t("MRI.QA1.Answer1")}</li>
            </ul>
          </div>
        </Accordion.Collapse>
      </div>

      <div className="border-bottom">
        <CustomToggle eventKey="2" open={open} setOpen={setOpen}>
          {t("MRI.QA2.Question")}
        </CustomToggle>

        <Accordion.Collapse eventKey="2">
          <div className={classes["item-body"]}>
            <ul className="mb-0">
              <li>{t("MRI.QA2.Answer1")}</li>
              <li>{t("MRI.QA2.Answer2")}</li>
              <li>{t("MRI.QA2.Answer3")}</li>
            </ul>
          </div>
        </Accordion.Collapse>
      </div>

      <div className="border-bottom">
        <CustomToggle eventKey="3" open={open} setOpen={setOpen}>
          {t("MRI.QA3.Question")}
        </CustomToggle>

        <Accordion.Collapse eventKey="3">
          <div className={classes["item-body"]}>
            <ul className="mb-0">
              <li>{t("MRI.QA3.Answer1")}</li>
              <li>{t("MRI.QA3.Answer2")}</li>
            </ul>
          </div>
        </Accordion.Collapse>
      </div>
    </Accordion>
  );
};

export default QA;
