import MyHead from "../../../ui/MyHead";
import Topnav from "./../../../ui/topnav";
import { useRouter } from "next/router";
import CalendarComponent from "../../../components/calendar/CalendarComponent";
import styles from "../../../styles/style.module.css";
import { getAllUserId } from "../../../lib/userData/firebase";
import axios from "axios";
import cheerio from "cheerio";
import LoaderPage from "./../../../ui/LoadingPage";
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";

export default function CalendarPage(props) {
  let [isLoading, setIsLoading] = useState(false);
  let { logout, user } = useAuth();
  let { todayPageData, tomorrowPageData, error } = props;

  let router = useRouter();

  if (error) {
    <div className={styles.container}>
      <h2>{`An error happened: ${error.message}`}</h2>
    </div>;
  }

  if (isLoading) {
    return <LoaderPage />;
  }

  return (
    <div className={styles.container}>
      <MyHead
        title="Calendar"
        description="Calendar Page."
        keywords="calendar"
      />
      <Topnav userId={router.query.userId} />
      <CalendarComponent
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
