import Card from "../Cards/Card";
import styles from "./Loader.module.css";

const Loader = () => {
  return (
    <Card className={styles.circleBox}>
      <div className={styles.circle}></div>
      <div className={styles.circle}></div>
      <div className={styles.circle}></div>
      <div className={styles.circle}></div>
      <div className={styles.circle}></div>
      <div className={styles.circle}></div>
      <div className={styles.circle}></div>
      <div className={styles.circle}></div>
      <div className={styles.circle}></div>
    </Card>
  );
};

export default Loader;
