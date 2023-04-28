import styles from "./FileUpload.module.scss";

const FileUpload = ({ setFiles }) => {
  return (
    <input
      className={styles.file}
      id="folder"
      type="file"
      webkitdirectory="true"
      multiple
      onChange={(e) => setFiles(e.target.files)}
    />
  );
};

export default FileUpload;
