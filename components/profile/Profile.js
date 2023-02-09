import styles from "../../styles/profilepagecomponent/style.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
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
