import { Spinner } from "react-bootstrap";
import useStore from "../../../stores/store";
import styles from "./styles.module.scss";

const PageLoading = () => {
  const { loading } = useStore((state) => state);

  if (loading) {
    return (
      <div
        className={styles.wrapper}
        style={{ background: `rgba(255, 255, 255, 0.2)` }}
      >
        <Spinner animation="border" variant="primary" size="lg" />
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  return null;
};

export default PageLoading;
