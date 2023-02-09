import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

export default function ProtectedRoute({ children }) {
  let router = useRouter();
  let { user } = useAuth();

  useEffect(() => {
    if (user === undefined) {
      router.push("/login");
    }
  }, [router.push, user]);

  return <>{user ? children : null}</>;
}
