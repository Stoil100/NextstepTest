import styles from './ErrorPage.module.css'

const ErrorPage = () => {
  return (
    <section id="not-found">
      <div className={styles.circles}>
        <p>
          404
          <br />
          <small>PAGE NOT FOUND</small>
        </p>
        <span className={`${styles.circle} ${styles.big}`}></span>
        <span className={`${styles.circle} ${styles.med}`}></span>
        <span className={`${styles.circle} ${styles.small}`}></span>
      </div>
    </section>
  );
};
export default ErrorPage;
