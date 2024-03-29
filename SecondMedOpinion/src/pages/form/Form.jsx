import React, { Fragment, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as Yup from "yup";

import { Form, Row, Col, Button, Toast, ToastContainer } from "react-bootstrap";
import UIFormControl from "../../components/UI/FormControl/UIFormControl";
import UISelect from "../../components/UI/UISelect";
import initialValues from "./initial-values";
import initialValidations from "./validations";
import styles from "./Form.module.scss";
import DatepickerItem from "../../components/UI/DatepickerItem/DatepickerItem";
import { formatDate } from "../../static/date";
import { CTResearches, MRIResearches } from "../../static/researches";
import FileUpload from "../../components/UI/FileUpload/FileUpload";
import JSZip from "jszip";

import Loading from "../../assets/Loading.gif";
import { Link } from "react-router-dom";

const initailDoctors = [
  { label: "Андрей Сергеевич", value: "1", tomography: 1 },
  { label: "ქეთი", value: "2", tomography: 2 },
];

function generateZipFile(
  zipName,
  files,
  options = { type: "blob", compression: "DEFLATE" }
) {
  return new Promise((resolve, reject) => {
    const zip = new JSZip();
    for (let i = 0; i < files.length; i++) {
      zip.file(files[i].webkitRelativePath, files[i]);
    }
    zip.generateAsync(options).then(function (blob) {
      zipName = zipName || Date.now() + ".zip";
      const zipFile = new File([blob], zipName, {
        type: "application/zip",
      });
      resolve(zipFile);
    });
  });
}

const DataForm = () => {
  const { t } = useTranslation();
  const [validations, setValidations] = useState(initialValidations);
  const [files, setFiles] = useState(null);
  const [isUpload, setIsUpload] = useState(false);
  const [uploading, setUploading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [searchParams] = useSearchParams();
  const [researchTypes, setResearchTypes] = useState([]);

  const researches = [
    {
      label: t("mri"),
      value: 1,
    },
    { label: t("ct"), value: 2 },
  ];

  const contrastTypes = [
    { label: t("WithContrast"), value: t("WithContrast") },
    { label: t("WithoutContrast"), value: t("WithoutContrast") },
  ];

  const handleClick = () => {
    setIsOpen(true);
  };

  const onSubmit = (values) => {
    setUploading(false);
    async function uploadFile() {
      let fileList = files;
      if (!fileList.length) return;
      let webkitRelativePath = fileList[0].webkitRelativePath;
      let zipFileName = webkitRelativePath.split("/")[0] + ".zip";
      let zipFile = await generateZipFile(zipFileName, fileList);
      upload({
        url: "/single",
        file: zipFile,
        fileName: zipFileName,
      });
    }
    function upload({ file, fileName, fieldName = "files" }) {
      let formData = new FormData();

      formData.append("firstName", values.firstName);
      formData.append("lastName", values.lastName);
      formData.append("email", values.email);
      formData.append(
        "tomography",
        +values.tomography === 1
          ? "მაგნიტურ-რეზონანსული ტომოგრაფია"
          : "კომპიუტერული ტომოგრაფია"
      );
      formData.append("doctor", values.doctor);
      formData.append(
        "birthday",
        values.birthday ? formatDate(values.birthday) : ""
      );
      formData.append("gender", values.gender);
      formData.append("period", values.period ? formatDate(values.period) : "");
      formData.append("research", t(values.research));

      formData.append("contrast", values.contrast);

      formData.append("complains", values.complains);

      formData.append("operation", values.operation);

      formData.append("chronicDisease", values.chronicDisease);

      formData.append("oncologicalDisease", values.oncologicalDisease);

      formData.append("chemotherapy", values.chemotherapy);
      formData.append("otherResearches", values.otherResearches);
      formData.append(fieldName, file, fileName);
      console.log(formData);

      fetch("http://localhost:8080/data/add", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then(({ message }) => {
          if (message === "Uploaded successfully") {
            setUploading(true);
          }
        });
    }

    if (!files) {
      console.log("warninrg");
      setIsUpload(true);
    } else {
      uploadFile().then((response) => {
        console.log(response);
      });

      setIsUpload(false);
    }
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setFieldTouched,
    setValues,
  } = useFormik({
    initialValues,
    validationSchema: Yup.object().shape(validations),
    onSubmit,
  });

  useEffect(() => {
    if (values.gender === "female") {
      // setFieldValue("period", "");
      // setValidations((state) => ({
      //   ...state,
      //   period: Yup.string().required("Validations.Required"),
      // }));
    } else {
      setValidations((state) =>
        Object.keys(state)
          .filter((key) => key !== "period")
          .reduce((obj, key) => {
            obj[key] = state[key];
            return obj;
          }, {})
      );
    }
  }, [setFieldValue, values.gender]);

  useEffect(() => {
    if (values.tomography) {
      setFieldValue("doctor", "");
      setFieldValue("research", "");
      setFieldValue("contrast", "");
      setFieldValue("otherResearches", []);

      if (values.tomography === 1) {
        setResearchTypes(MRIResearches);
      } else {
        setResearchTypes(CTResearches);
      }

      setDoctors(
        initailDoctors.filter((item) => +item.tomography === +values.tomography)
      );
    }
  }, [setFieldValue, values.tomography]);

  useEffect(() => {
    if (+searchParams.get("tomography")) {
      setFieldValue("tomography", +searchParams.get("tomography"));

      if (doctors.length) setFieldValue("doctor", searchParams.get("id"));
    }
  }, [setFieldValue, searchParams, doctors.length]);

  return (
    <div className={styles.wrapper}>
      <Form onSubmit={handleSubmit} className={styles.form}>
        <Row>
          <Col xs="6">
            <UIFormControl
              label={t("Name")}
              className="mb-4"
              placeholder={t("EnterFirstname")}
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
              label={t("LastName")}
              className="mb-4"
              placeholder={t("EnterLastname")}
              name="lastName"
              value={values.lastName}
              handleChange={handleChange}
              handleBlur={handleBlur}
              isInvalid={touched.lastName && errors.lastName}
              errorMSG={errors.lastName}
            />
          </Col>
          <Col xs="6">
            <UIFormControl
              label={t("Email")}
              className="mb-4"
              placeholder={t("EnterEmailAddress")}
              name="email"
              value={values.email}
              handleChange={handleChange}
              handleBlur={handleBlur}
              isInvalid={touched.email && errors.email}
              errorMSG={errors.email}
            />
          </Col>
          <Col xs="6">
            <DatepickerItem
              label={t("Birthday")}
              className="mb-4"
              placeholder={"01/01/2001"}
              name="birthday"
              isInvalid={touched.birthday && errors.birthday}
              errorMSG={errors.birthday}
              valChange={(date) => setFieldValue("birthday", date)}
              setTouched={setFieldTouched}
            />
          </Col>
          <Col xs="6">
            <UISelect
              label={t("Research")}
              className="mb-4"
              fetchedData={researches}
              placeholder={t("Researches")}
              name="tomography"
              initialValue={values.tomography}
              handleChange={(item) => {
                setFieldValue("tomography", item ? item.value : null);
              }}
              isInvalid={!!(touched.tomography && errors.tomography)}
              errorMSG={errors.tomography}
            />
          </Col>
          <Col xs="6">
            <UISelect
              label={t("ChooseDoctor")}
              className="mb-4"
              fetchedData={doctors}
              placeholder={t("Doctors")}
              name="doctor"
              initialValue={values.doctor}
              handleChange={(item) =>
                setFieldValue("doctor", item ? item.value : null)
              }
              isInvalid={!!(touched.doctor && errors.doctor)}
              errorMSG={errors.doctor}
              dataNotFoundText={t("ChooseResearchPlaceholder")}
            />
          </Col>
          <Col xs="12" className="mb-4">
            <div className="mb-2 ms-1">{t("ChooseGender")}</div>
            <Form.Check
              inline
              label={t("Female")}
              name="gender"
              type="radio"
              id="inline-radio-1"
              value="female"
              checked={values.gender === "female"}
              onChange={(e) => setFieldValue("gender", e.target.value)}
            />

            <Form.Check
              inline
              label={t("Male")}
              name="gender"
              type="radio"
              id="inline-radio-2"
              value="male"
              checked={values.gender === "male"}
              onChange={(e) => setFieldValue("gender", e.target.value)}
            />

            {touched.gender && errors.gender && (
              <div className={styles.errorMSG}>{t(errors.gender)}</div>
            )}
          </Col>

          <Col sm="6">
            <UISelect
              label={t("ChooseResearch")}
              className="mb-4"
              fetchedData={researchTypes}
              placeholder={t("Researches")}
              name="research"
              initialValue={values.research}
              handleChange={(item) => {
                setFieldValue("research", item ? item.value : null);
              }}
              isInvalid={!!(touched.research && errors.research)}
              errorMSG={errors.research}
              dataNotFoundText={t("ChooseResearchPlaceholder")}
            />
          </Col>

          <Col sm="6">
            <UISelect
              label={t("TypeOfResearch")}
              fetchedData={contrastTypes}
              placeholder={t("TypeOfResearchPlaceHolder")}
              name="contrast"
              initialValue={values.contrast}
              handleChange={(item) => {
                setFieldValue("contrast", item ? item.value : null);
              }}
              isInvalid={!!(touched.contrast && errors.contrast)}
              errorMSG={errors.contrast}
            />
          </Col>

          {values.otherResearches &&
            values.otherResearches.length > 0 &&
            values.otherResearches.map((otherResearche, index) => (
              <Fragment key={index}>
                <Col xs="6">
                  <UISelect
                    className="mb-4"
                    fetchedData={researchTypes}
                    placeholder={t("Research")}
                    name={`otherResearches.${index}.research`}
                    initialValue={values.otherResearches[index].research}
                    handleChange={(item) => {
                      setFieldValue(
                        `otherResearches.${index}.research`,
                        item ? item.value : null
                      );
                    }}
                    isInvalid={
                      !!(
                        errors &&
                        errors.otherResearches &&
                        errors.otherResearches[index] &&
                        errors.otherResearches[index].research &&
                        touched &&
                        touched.otherResearches &&
                        touched.otherResearches[index] &&
                        touched.otherResearches[index].research
                      )
                    }
                    errorMSG={
                      errors &&
                      errors.otherResearches &&
                      errors.otherResearches[index] &&
                      errors.otherResearches[index].research &&
                      errors.otherResearches[index].research
                    }
                  />
                </Col>

                <Col xs="6" className="position-relative">
                  <UISelect
                    className="mb-4"
                    fetchedData={contrastTypes}
                    placeholder={t("Contrast")}
                    name={`otherResearches.${index}.contrast`}
                    initialValue={values.otherResearches[index].contrast}
                    handleChange={(item) => {
                      setFieldValue(
                        `otherResearches.${index}.contrast`,
                        item ? item.value : null
                      );
                    }}
                    isInvalid={
                      !!(
                        errors &&
                        errors.otherResearches &&
                        errors.otherResearches[index] &&
                        errors.otherResearches[index].contrast &&
                        touched &&
                        touched.otherResearches &&
                        touched.otherResearches[index] &&
                        touched.otherResearches[index].contrast
                      )
                    }
                    errorMSG={
                      errors &&
                      errors.otherResearches &&
                      errors.otherResearches[index] &&
                      errors.otherResearches[index].contrast &&
                      errors.otherResearches[index].contrast
                    }
                  />

                  <span
                    style={{
                      position: "absolute",
                      right: "-25px",
                      top: "5px",
                    }}
                    onClick={() =>
                      setValues((state) => ({
                        ...state,
                        otherResearches: state.otherResearches.filter(
                          (_, i) => i !== index
                        ),
                      }))
                    }
                  >
                    <svg
                      width="32px"
                      height="32px"
                      viewBox="0 0 16 16"
                      className="bi bi-x"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                      />
                    </svg>
                  </span>
                </Col>
              </Fragment>
            ))}
          <Col className="mb-4">
            <Button
              type="button"
              onClick={() =>
                setValues((state) => ({
                  ...state,
                  otherResearches: [
                    ...state.otherResearches,
                    {
                      research: "",
                      contrast: "",
                    },
                  ],
                }))
              }
              size="sm"
            >
              {t("AddResearches")}
            </Button>
          </Col>

          <Row>
            <h4
              className="mb-4"
              style={{ fontFamily: "Mtavruli", fontWeight: "600" }}
            >
              {t("TitlePurposeOfPrevention")}
            </h4>

            <Col xs="6">
              <UIFormControl
                label={t("Complains")}
                className="mb-4"
                // placeholder={t("ComplainsPlaceHolder")}
                name="complains"
                value={values.complains}
                handleChange={handleChange}
                handleBlur={handleBlur}
                isInvalid={touched.complains && errors.complains}
                errorMSG={errors.complains}
              />
            </Col>

            <Col xs="6">
              <UIFormControl
                label={t("Operation")}
                className="mb-4"
                // placeholder={t("Operation")}
                name="operation"
                value={values.operation}
                handleChange={handleChange}
                handleBlur={handleBlur}
                isInvalid={touched.operation && errors.operation}
                errorMSG={errors.operation}
              />
            </Col>

            <Col xs="6">
              <UIFormControl
                label={t("ChronicDisease")}
                className="mb-4"
                // placeholder={t("chronicDisease")}
                name="chronicDisease"
                value={values.chronicDisease}
                handleChange={handleChange}
                handleBlur={handleBlur}
                isInvalid={touched.chronicDisease && errors.chronicDisease}
                errorMSG={errors.chronicDisease}
              />
            </Col>

            <Col xs="6">
              <UIFormControl
                label={t("WhatkindOncologicalDisease")}
                className="mb-4"
                // placeholder={t("WhatkindOncologicalDisease")}
                name="oncologicalDisease"
                value={values.oncologicalDisease}
                handleChange={handleChange}
                handleBlur={handleBlur}
                isInvalid={
                  touched.oncologicalDisease && errors.oncologicalDisease
                }
                errorMSG={errors.oncologicalDisease}
              />
            </Col>

            <Col xs="6">
              <UIFormControl
                label={t("Chemotherapy")}
                className="mb-4"
                // placeholder={t("Chemotherapy")}
                name="chemotherapy"
                value={values.chemotherapy}
                handleChange={handleChange}
                handleBlur={handleBlur}
                isInvalid={touched.chemotherapy && errors.chemotherapy}
                errorMSG={errors.chemotherapy}
              />
            </Col>
          </Row>
        </Row>

        <h2
          style={{
            fontSize: "18px",
            fontWeight: "bold",
            display: "block",
            marginBottom: "1rem",
          }}
        >
          {t("UploadDicomFile")}
        </h2>

        <Row xs={12} style={{ marginBottom: "1rem" }}>
          <FileUpload setFiles={setFiles} />
        </Row>
        {isUpload && (
          <ToastContainer
            position="middle-center"
            className={`p-3`}
            id={styles.asdasd}
          >
            <Toast
              onClose={() => setIsUpload(false)}
              style={{ marginBottom: "3rem" }}
            >
              <Toast.Header>
                <strong className="me-auto">EXPERT MED OPINION</strong>
                {/* <small>11 mins ago</small> */}
              </Toast.Header>
              <Toast.Body style={{ color: "red" }}>
                {t("AlertUpload")}
              </Toast.Body>
            </Toast>
          </ToastContainer>
        )}
        {!uploading && (
          <ToastContainer
            position="middle-center"
            className={`p-3`}
            id={styles.asdasd}
          >
            <Toast
              // onClose={() => setIsUpload(false)}
              style={{ marginBottom: "3rem" }}
            >
              <Toast.Header>
                <strong className="me-auto">EXPERT MED OPINION</strong>
                {/* <small>11 mins ago</small> */}
              </Toast.Header>
              <Toast.Body style={{ color: "red" }}>
                {/* {t("uploading...")} */}
                <img
                  src={Loading}
                  height={"100px"}
                  alt="loading..."
                  style={{ fill: "black" }}
                />
              </Toast.Body>
            </Toast>
          </ToastContainer>
        )}

        <div className="d-flex ">
          <Form.Check
            type={"checkbox"}
            id={"checkbox"}
            // label={"Tearms and conditions"}
          />
          <p
            className="ms-2"
            style={{ color: "blue", cursor: "pointer" }}
            onClick={handleClick}
          >
            <Link to="/tearms-and-conditions">Tearms and conditions </Link>
            <Link to="/privacy-policy">/ Privacy Policy</Link>
          </p>
        </div>

        <Button type="submit" size="sm">
          {t("Submit")}
        </Button>
      </Form>
    </div>
  );
};

export default DataForm;
