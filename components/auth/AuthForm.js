import { useState } from "react";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/router";
import styles from "../../styles/authform/style.module.css";
import LoaderPage from "./../../ui/Loader";

export default function AuthForm(props) {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [error, setError] = useState("");
  let router = useRouter();
  let [isLoading, setIsLoading] = useState(false);
  let [haveLoggedIn, setHaveLoggedIn] = useState(false);

  let { user, login, signup, logout } = useAuth();

  async function handleSubmit(e) {
    setIsLoading(true);
    setError("");
    e.preventDefault();
    if (props.isLogin) {
      try {
        await login(email, password);
        setHaveLoggedIn(true);
      } catch (error) {
        console.log(error);
        setError("Hibás felhasználónév vagy jelszó");
        setIsLoading(false);
      }
      if (user) {
        router.push(`/user/${user.id}/profile`);
      }
    } else {
      try {
        await signup(email, password);
        setHaveLoggedIn(true);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    }
  }

  if (haveLoggedIn && user) {
    if (!props.isLogin) {
      fetch("/api/user/userSetup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: user.id
        })
      })
        .then(() => {
          router.push(`/user/${user.id}/profile`);
        })
        .catch((err) => {
          console.error(err);
          setError(err.message);
        });
    } else {
      router.push(`/user/${user.id}/profile`);
    }
  }

  if (isLoading) {
    return (
      <div className={styles.container}>
        <LoaderPage></LoaderPage>
      </div>
    );
  }

  return (
    <>
      <div className={styles.container}>
        <form onSubmit={handleSubmit}>
          {props.isLogin ? <h3>Login</h3> : <h3>Új fiók</h3>}
          <p>{error}</p>
          <div className={styles.datas}>
            <div className={styles.data}>
              <label htmlFor="">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="Írd be az emailod..."
              />
            </div>
            <div className={styles.data}>
              <label htmlFor="">Jelszó</label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="Írd be a jelszavad..."
              />
            </div>
          </div>
          <div className={styles.dataButton}>
            {props.isLogin ? (
              <>
                <button type="submit">Login</button>
                <Link href="/signup">Nincs fiókom</Link>
              </>
            ) : (
              <>
                <button type="submit">Regisztráció</button>
                <Link href="/login">Már van fiókom</Link>
              </>
            )}
          </div>
        </form>
        <div className={styles.img}></div>
      </div>
    </>
  );
}
