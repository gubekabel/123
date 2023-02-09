import CustomHead from "./../../../ui/CustomHead";
import Topnav from "./../../../ui/topnav";
import { useRouter } from "next/router";
import CalendarComponent from "../../../components/calendar/CalendarComponent";
import styles from "../../../styles/calendar/style.module.css";
import AnimatedBackgroundPage from "./../../../ui/animatedBackground";
import { getAllUserId } from "../../../lib/userData/firebase";
import { axios } from "axios";
import { cheerio } from "cheerio";
import LoaderPage from "./../../../ui/Loader";
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";

export default function CalendarPage(props) {
  let [isLoading, setIsLoading] = useState(true);
  let { logout, user } = useAuth();

  useEffect(() => {
    if (user.id != router.query.userId) {
      logout();
    } else {
      setIsLoading(false);
    }
  }, []);

  let router = useRouter();

  if (isLoading) {
    return <LoaderPage></LoaderPage>;
  }

  return (
    <div className={styles.container}>
      <CustomHead
        title="Maxt Calendar"
        description="Maxt Calendar Page."
        keywords="maxt, calendar"
      ></CustomHead>
      <Topnav userId={router.query.userId}></Topnav>
      <CalendarComponent props={props}></CalendarComponent>
      <AnimatedBackgroundPage></AnimatedBackgroundPage>
    </div>
  );
}

export async function getStaticPaths() {
  let response = await getAllUserId();
  let paths = response.map((path) => ({
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
      revalidate: 3600
    };
  } catch (error) {
    return {
      props: {
        todayPageData: [],
        tomorrowPageData: [],
        error: error.message
      },
      revalidate: 3600
    };
  }
}
