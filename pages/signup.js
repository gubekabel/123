import AuthForm from "../components/auth/AuthForm";
import CustomHead from "./../ui/CustomHead";
import styles from "../styles/style.module.css";

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <CustomHead
        title="Maxt Signup"
        description="Maxt Signup Page for Maxt users."
        keywords="maxt, signup"
      ></CustomHead>
      <AuthForm isLogin={false}></AuthForm>
    </div>
  );
}
