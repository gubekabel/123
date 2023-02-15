import styles from "../../styles/profilecomponent/style.module.css";
import IntroPage from "./Intro";
import ProfileDataPage from "./ProfileData";

export default function ProfilePageComponent() {
  return (
    <div className={styles.container}>
      <IntroPage></IntroPage>
      <ProfileDataPage></ProfileDataPage>
    </div>
  );
}
