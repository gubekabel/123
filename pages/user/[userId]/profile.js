import CustomHead from "./../../../ui/CustomHead";
import Topnav from "./../../../ui/topnav";
import ProfilePageComponent from "./../../../components/profile/Profile";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LoaderPage from "../../../ui/Loader";
import { useAuth } from "../../../context/AuthContext";
import styles from "../../../styles/style.module.css";

export default function ProfilePage() {
  let router = useRouter();
  let [isLoading, setIsLoading] = useState(true);
  let { logout, user } = useAuth();

  useEffect(() => {
    if (user.id != router.query.userId) {
      logout();
    } else {
      setIsLoading(false);
    }
  });

  if (isLoading) {
    return <LoaderPage></LoaderPage>;
  }

  return (
    <div className={styles.container}>
      <CustomHead
        title="Maxt Profile"
        description="Maxt Profile Page for Maxt users."
        keywords="maxt, profile"
      ></CustomHead>
      <Topnav userId={router.query.userId}></Topnav>
      <ProfilePageComponent></ProfilePageComponent>
    </div>
  );
}
