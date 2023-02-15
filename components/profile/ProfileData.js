import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import styles from "../../styles/profiledata/style.module.css";
import LoaderPage from "./../../ui/Loader";

export default function ProfileDataPage() {
  let [userClass, setUserClass] = useState("");
  let [nickname, setNickname] = useState("");
  let [school, setSchool] = useState("");
  let router = useRouter();
  let [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUserData()
      .then((data) => {
        if (data) {
          setUserClass(data.userClass);
          setNickname(data.nickname);
          setSchool(data.school);
        }
      })
      .then(() => {
        setIsLoading(false);
      });
  }, []);

  async function loadUserData() {
    let response = await fetch("/api/user/handleUserData", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: router.query.userId
      })
    });

    response = await response.json();

    return response.message;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setIsLoading(true);
      let response = await fetch("/api/user/handleUserData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: router.query.userId,
          userClass: userClass,
          nickname: nickname,
          school: school
        })
      });
      setIsLoading(false);
    } catch (error) {}
  }

  return (
    <div className={styles.container}>
      <div className={styles.profileData}>
        <form className={styles.datas} onSubmit={handleSubmit}>
          {isLoading ? (
            <>
              <LoaderPage></LoaderPage>
            </>
          ) : (
            <div className={styles.dataWrapper}>
              <div className={styles.data}>
                <label htmlFor="">Osztály</label>
                <select
                  type="text"
                  value={userClass}
                  onChange={(e) => {
                    setUserClass(e.target.value);
                  }}
                >
                  <option value="">Válassz osztályt</option>
                  <option value="9.AK">9.Akny</option>
                  <option value="9.BK">9.Bkny</option>
                  <option value="9.CK">9.Ckny</option>
                  <option value="9.D">9.D</option>
                  <option value="9.EK">9.Ekny</option>
                  <option value="9.A">9.A</option>
                  <option value="9.B">9.B</option>
                  <option value="9.C">9.C</option>
                  <option value="10.D">10.D</option>
                  <option value="9.E">9.E</option>
                  <option value="10.A">10.A</option>
                  <option value="10.B">10.B</option>
                  <option value="10.C">10.C</option>
                  <option value="11.D">11.D</option>
                  <option value="10.E">10.E</option>
                  <option value="11.A">11.A</option>
                  <option value="11.B">11.B</option>
                  <option value="11.C">11.C</option>
                  <option value="12.D">12.D</option>
                  <option value="11.E">11.E</option>
                  <option value="11.IB">11.IB</option>
                  <option value="12.A">12.A</option>
                  <option value="12.B">12.B</option>
                  <option value="12.C">12.C</option>
                  <option value="12.E">12.E</option>
                  <option value="12.IB">12.IB</option>
                </select>
              </div>
            </div>
          )}
          <div className={styles.dataButton}>
            <button type="submit">
              <p>OK</p>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
