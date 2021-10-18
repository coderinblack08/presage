import axios from "axios";
import Router from "next/router";
import { getAuth, signOut } from "firebase/auth";

export const logout = async () => {
  await signOut(getAuth());
  await axios.post("/api/logout", {});
  Router.push("/");
};
