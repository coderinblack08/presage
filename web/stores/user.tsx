import React, { createContext, useContext, useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const UserContext = createContext<{ user?: any }>({
  user: null,
});

export const UserProvider: React.FC = (props) => {
  const [user, setUser] = useState<any>(null);
  const [authUser, setAuthUser] = useState<any>(null);

  useEffect(() => {
    return firebase.auth().onAuthStateChanged((user) => {
      if (user) setAuthUser(user);
    });
  }, []);

  useEffect(() => {
    if (!authUser) {
      setUser(null);
      return;
    }
    const userRef = firebase.firestore().doc(`/users/${authUser.uid}`);
    userRef.onSnapshot((doc) => {
      setUser({
        ...doc.data(),
        authUser,
        setAuthUser,
      });
    });
  }, [authUser]);

  return <UserContext.Provider value={{ user }} {...props} />;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("Hook isn't located inside UserProvider");
  }
  return context;
};
