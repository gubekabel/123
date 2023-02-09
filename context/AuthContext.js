import { createContext, useContext } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "./../firebase/config";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  let [user, setUser] = useState(null);
  let [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getUser = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          id: user.uid,
          name: user.displayName,
          email: user.email
        });
      } else {
        setUser(undefined);
      }
    });
    setIsLoading(false);
    return () => getUser();
  }, []);

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {isLoading ? null : children}
    </AuthContext.Provider>
  );
};
