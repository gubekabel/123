import { useRouter } from "next/router";
import styles from "../../styles/calendarsavingpage/style.module.css";

export default function CalendarSavingPage() {
  let router = useRouter();

  return (
    <div className={styles.container}>
      <button
        onClick={() => {
          router.reload();
        }}
      >
        Naptár frissítése
      </button>
    </div>
  );
}
