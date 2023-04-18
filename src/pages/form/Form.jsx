import React, { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form, Row, Col } from "react-bootstrap";
import UIFormControl from "../../components/UI/FormControl/UIFormControl";
import UISelect from "../../components/UI/UISelect";
import initialVals from "./initial-values";
import validations from "./validations";
import styles from "./Form.module.scss";
import DatepickerItem from "../../components/UI/DatepickerItem/DatepickerItem";
import { formatDate } from "../../static/date";

let validationSchema = Yup.object().shape(validations);

const researchTypes = [
  { label: "თავი", value: "თავი" },
  { label: "გული", value: "გული" },
  { label: "ტრაკი", value: "ტრაკი" },
];

const contrastTypes = [
  { label: "კონტრასტ", value: "კონტრასტ" },
  { label: "არა კონტრასტ", value: "არა კონტრასტ" },
];

const DataForm = () => {
  const { t } = useTranslation();
  const [otherResearch, setOtherResearch] = useState([]);
  const [initialValues, setInitialValues] = useState(initialVals);

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setFieldTouched,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: () =>
      console.log({
        ...values,
        period: values.period ? formatDate(values.period) : "",
      }),
  });

  useEffect(() => {
    if (values.gender === "female") {
      setFieldValue("period", "");
      validationSchema = Yup.object().shape({
        ...validations,
        period: Yup.string().required("Validations.Required"),
      });
    } else {
      validationSchema = Yup.object().shape({ ...validations });
    }
  }, [setFieldValue, values.gender]);

  return (
    <div className={styles.wrapper}>
      <Form onSubmit={handleSubmit} className={styles.form}>
        <Row>
          <Col xs="6">
            <UIFormControl
              className="mb-4"
              placeholder={t("Name")}
              name="firstName"
              value={values.firstName}
              handleChange={handleChange}
              handleBlur={handleBlur}
              isInvalid={touched.firstName && errors.firstName}
              errorMSG={errors.firstName}
            />
          </Col>
          <Col xs="6">
            <UIFormControl
              className="mb-4"
              placeholder={t("LastName")}
              name="lastName"
              value={values.lastName}
              handleChange={handleChange}
              handleBlur={handleBlur}
              isInvalid={touched.lastName && errors.lastName}
              errorMSG={errors.lastName}
            />
          </Col>

          <Col xs="12" className="mb-4">
            <Form.Check
              inline
              label={t("Female")}
              name="gender"
              type="radio"
              id="inline-radio-1"
              value="female"
              checked={values.gender === "female"}
              onChange={handleChange}
            />

            <Form.Check
              inline
              label={t("Male")}
              name="gender"
              type="radio"
              id="inline-radio-2"
              value="male"
              checked={values.gender === "male"}
              onChange={handleChange}
            />
            {errors.gender && (
              <div className={styles.errorMSG}>{t(errors.gender)}</div>
            )}
          </Col>

          {values.gender === "female" && (
            <Col xs="12">
              <DatepickerItem
                className="mb-4"
                placeholder={t("period")}
                name="period"
                isInvalid={touched.period && errors.period}
                errorMSG={errors.period}
                valChange={(date) => setFieldValue("period", date)}
                setTouched={setFieldTouched}
              />
            </Col>
          )}

          <Col xs="6">
            <UISelect
              className="mb-4"
              fetchedData={researchTypes}
              placeholder="research"
              name="research"
              initialValue={values.research}
              handleChange={(item) =>
                setFieldValue("research", item ? item.value : null)
              }
              isInvalid={!!(touched.research && errors.research)}
              errorMSG={errors.research}
            />
          </Col>

          <Col xs="6">
            <UISelect
              fetchedData={contrastTypes}
              placeholder="contrast"
              name="contrast"
              initialValue={values.contrastcontrast}
              handleChange={(item) => {
                setFieldValue("contrast", item ? item.value : null);
              }}
              isInvalid={!!(touched.contrast && errors.contrast)}
              errorMSG={errors.contrast}
            />
          </Col>

          {!!otherResearch.length &&
            otherResearch.map((item) => (
              <Fragment key={item.id}>
                <Col xs="6">
                  <UISelect
                    className="mb-4"
                    fetchedData={researchTypes}
                    placeholder="research"
                    name={`research-${item.id}`}
                    initialValue={values[`research-${item.id}`]}
                    handleChange={(item) => {
                      setFieldValue(
                        `research-${item.id}`,
                        item ? item.value : null
                      );
                    }}
                    isInvalid={
                      !!(
                        touched[`research-${item.id}`] &&
                        errors[`research-${item.id}`]
                      )
                    }
                    errorMSG={errors[`research-${item.id}`]}
                  />
                </Col>

                <Col xs="6">
                  <UISelect
                    fetchedData={contrastTypes}
                    placeholder="contrast"
                    name={`contrast-${item.id}`}
                    initialValue={values[`contrast-${item.id}`]}
                    handleChange={(item) => {
                      setFieldValue(
                        `contrast-${item.id}`,
                        item ? item.value : null
                      );
                    }}
                    isInvalid={
                      !!(
                        touched[`contrast-${item.id}`] &&
                        errors[`contrast-${item.id}`][`contrast-${item.id}`]
                      )
                    }
                    errorMSG={errors[`contrast-${item.id}`]}
                  />
                </Col>
              </Fragment>
            ))}

          <Col xs="6">
            <button
              type="button"
              className="mb-4"
              style={{ width: "fit-content" }}
              onClick={() => {
                setOtherResearch((state) => [
                  ...state,
                  {
                    id: state.length + 1,
                    research: null,
                    contrast: null,
                  },
                ]);

                setInitialValues((state) => ({
                  ...state,
                  [`research-${otherResearch.length + 1}`]: null,
                  [`contrast-${otherResearch.length + 1}`]: null,
                }));
              }}
            >
              სხვა კვლევები
            </button>
          </Col>
        </Row>

        <button type="submit">{t("Send")}</button>
      </Form>
    </div>
  );
};

export default DataForm;
