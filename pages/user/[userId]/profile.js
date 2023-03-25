import MyHead from "../../../ui/MyHead";
import Topnav from "./../../../ui/topnav";
import ProfilePageComponent from "./../../../components/profile/Profile";
import { useRouter } from "next/router";
import { useState } from "react";
import LoaderPage from "../../../ui/LoadingPage";
import { useAuth } from "../../../context/AuthContext";
import styles from "../../../styles/style.module.css";
import { getAllUserId } from "../../../lib/userData/firebase";
import axios from "axios";
import cheerio from "cheerio";

export default function ProfilePage(props) {
  let router = useRouter();
  let [isLoading, setIsLoading] = useState(false);
  let { logout, user } = useAuth();
  let { todayPageData, tomorrowPageData, error } = props;

  if (error) {
    return <h1>Valami hiba történt!</h1>;
  }

  if (isLoading) {
    return <LoaderPage />;
  }

  return (
    <div className={styles.container}>
      <MyHead
        title="Profile"
        description="Profile Page"
        keywords="profile"
      />
      <Topnav userId={router.query.userId} />
      <ProfilePageComponent
        todayPageData={todayPageData}
        tomorrowPageData={tomorrowPageData}
      />
    </div>
  );
}

export async function getStaticPaths() {
  let response = await getAllUserId();
  let paths = response.map(path => ({
    params: {
      userId: path.id
    }
  }));
  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps() {
  try {
    const { data } = await axios.get("https://apps.karinthy.hu/helyettesites/");
    const $ = cheerio.load(data);

    return {
      props: {
        todayPageData: $(".live.today tbody").text(),
        tomorrowPageData: $(".live.tomorrow tbody").text()
      },
      revalidate: 1200
    };
  } catch (error) {
    return {
      props: {
        todayPageData: [],
        tomorrowPageData: [],
        error: error.message
      },
      revalidate: 1200
    };
  }
}
