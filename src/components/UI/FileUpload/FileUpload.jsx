import styles from "./FileUpload.module.scss";

const FileUpload = () => {
  return <input className={styles.file} type="file" accept=".dicom" />;
};

export default FileUpload;
