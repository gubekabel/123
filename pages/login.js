import AuthForm from "../components/auth/AuthForm";
import MyHead from "../ui/MyHead";
import styles from "../styles/style.module.css";

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <MyHead
        title="Login"
        description="Maxt Login Page for Maxt users."
        keywords="maxt, login"
      />
      <AuthForm isLogin={true} />
    </div>
  );
}
