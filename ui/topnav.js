import Link from "next/link";
import { useAuth } from "./../context/AuthContext";
import { useRouter } from "next/router";
import styles from "../styles/topnav/style.module.css";

export default function Topnav(props) {
  let router = useRouter();
  let path = router.pathname.split("/")[router.pathname.split("/").length - 1];
  let { logout } = useAuth();
  return (
    <div className={styles.container}>
      <Link href="/" className={styles.imgLink}>
        <div className={styles.img}>
          <p>Main page</p>
        </div>
      </Link>
      <Link href={`/user/${props.userId}/profile`}>Profile</Link>
      <Link href={`/user/${props.userId}/calendar`}>Calendar</Link>
      <div />
      <button
        onClick={() => {
          logout();
        }}
      >
        Logout
      </button>
    </div>
  );
}
