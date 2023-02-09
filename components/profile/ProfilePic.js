import styles from "../../styles/profilePic/style.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import LoaderPage from "./../../ui/Loader";
import {
  getProfilePicName,
  uploadProfilePic
} from "../../lib/userData/firebase";
import { storage } from "../../firebaseConfig";
import { deleteObject, ref } from "firebase/storage";

export default function ProfilePicPage() {
  let [imgUrl, setImgUrl] = useState("");
  let [file, setFile] = useState();
  let router = useRouter();
  let [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getProfilePicUrl().then(() => {
      setIsLoading(false);
    });

    if (file != undefined) {
      setIsLoading(true);
      try {
        console.log(file);
        getProfilePicName(router.query.userId).then((data) => {
          if (data) {
            let desertRef = ref(storage, `${router.query.userId}/${data}`);
            deleteObject(desertRef).then(() => {
              let response = uploadProfilePic(router.query.userId, file).then(
                () => {
                  getProfilePicUrl().then((data) => {
                    setImgUrl(data);
                    setIsLoading(false);
                  });
                }
              );
            });
          } else {
            let response = uploadProfilePic(router.query.userId, file).then(
              () => {
                getProfilePicUrl().then((data) => {
                  setImgUrl(data);
                  setIsLoading(false);
                });
              }
            );
          }
        });
      } catch (error) {}
    }
  }, [file]);

  async function getProfilePicUrl() {
    try {
      let response = await fetch("/api/user/handleProfilePic", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: router.query.userId
        })
      });
      response = await response.json();
      setImgUrl(response.message);
      return response.message;
    } catch (error) {}
  }

  return (
    <>
      <div className={styles.titleWrapper}>
        <h1>Az Adataid.</h1>
        {isLoading ? (
          <>
            <LoaderPage></LoaderPage>
          </>
        ) : (
          <div
            className={styles.pic}
            style={{
              backgroundImage: `url("${imgUrl}")`
            }}
          >
            <input
              type="file"
              name=""
              id=""
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
            />
          </div>
        )}
      </div>
    </>
  );
}
