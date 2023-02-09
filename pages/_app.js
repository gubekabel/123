import { AuthContextProvider } from "../context/AuthContext";
import "../styles/globals.css";
import { useRouter } from "next/router";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import Head from "next/head";

const noAuthRequired = ["/login", "/signup", "/"];

function MyApp({ Component, pageProps }) {
  let router = useRouter();

  return (
    <AuthContextProvider>
      <Head></Head>
      {noAuthRequired.includes(router.pathname) ? (
        <Component {...pageProps} />
      ) : (
        <ProtectedRoute>
          <Component {...pageProps} />
        </ProtectedRoute>
      )}
    </AuthContextProvider>
  );
}

export default MyApp;
