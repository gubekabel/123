import styles from "../../styles/profilecomponent/style.module.css";
import IntroPage from "./Intro";
import ProfileDataPage from "./ProfileData";

export default function ProfilePageComponent(props) {
  let { todayPageData, tomorrowPageData } = props;
  return (
    <div className={styles.container}>
      <IntroPage
        todayPageData={todayPageData}
        tomorrowPageData={tomorrowPageData}
      ></IntroPage>
      <ProfileDataPage></ProfileDataPage>
    </div>
  );
}
