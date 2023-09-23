import { auth } from "@/app/firebase";
import { signOut } from "firebase/auth";
import { MouseEventHandler } from "react";

const signOutClick: MouseEventHandler = (e) => {
  e.preventDefault();
  signOut(auth);
};

export default signOutClick;
