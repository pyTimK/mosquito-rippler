"use client";

import { User, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { auth } from "./firebase";
import LoadingPage from "./pages_outer/LoadingPage";
import SignInPage from "./pages_outer/SignInPage";
import PagesWrapper from "./pages/PagesWrapper";

export default function Home() {
  return (
    <>
      <Wrapper />
      <ToastContainer theme="colored" autoClose={2} closeButton={false} />
    </>
  );
}

const Wrapper = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // user changes
  useEffect(() => {
    onAuthStateChanged(auth, (new_user) => {
      setUser(new_user);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <LoadingPage />;
  }

  if (user === null) {
    return <SignInPage />;
  }

  return <PagesWrapper user={user} />;
};
