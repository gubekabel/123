import styles from "../styles/loader/style.module.css";

export default function LoaderPage() {
  return (
    <div className={styles.container}>
      <div className={styles.loader}></div>
    </div>
  );
}
