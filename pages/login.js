import AuthForm from "../components/auth/AuthForm";
import CustomHead from "./../ui/CustomHead";
import styles from "../styles/login/style.module.css";

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <CustomHead
        title="Maxt Login"
        description="Maxt Login Page for Maxt users."
        keywords="maxt, login"
      ></CustomHead>
      <AuthForm isLogin={true}></AuthForm>
    </div>
  );
}
