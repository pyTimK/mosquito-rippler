import { auth } from "@/app/firebase";
import isValidEmail from "@/myfunctions/is_valid_email";
import notify from "@/myfunctions/notify";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { FormEventHandler, MouseEventHandler, useRef, useState } from "react";

function useSignInPage() {
  const [type, setType] = useState(SignInType.signIn);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [errorEmailInput, setErrorEmailInput] = useState(false);
  const [errorPasswordInput, setErrorPasswordInput] = useState(false);

  function toggleType() {
    setType(type === SignInType.signIn ? SignInType.logIn : SignInType.signIn);
  }

  const verifyEmail = (email: string | undefined) => {
    if (!email) {
      notify("Please Enter your Email");
      setErrorEmailInput(true);
      return false;
    }

    if (!isValidEmail(email)) {
      notify("Invalid Email");
      setErrorEmailInput(true);
      return false;
    }

    return true;
  };

  const verifyPassword = (password: string | undefined) => {
    if (!password) {
      notify("Please Enter a Password");
      setErrorPasswordInput(true);
      return false;
    }

    return true;
  };

  const login: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!verifyEmail(email)) return;
    if (!verifyPassword(password)) return;

    signInWithEmailAndPassword(auth, email!, password!)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`${errorCode}:: ${errorMessage}`);

        if (errorCode === "auth/weak-password") {
          notify("Password should be at least 6 characters long");
          setErrorPasswordInput(true);
          return;
        }
        notify("Invalid Email or Password");
        setErrorEmailInput(true);
        setErrorPasswordInput(true);
      });
  };

  const signup: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!verifyEmail(email)) return;
    if (!verifyPassword(password)) return;

    createUserWithEmailAndPassword(auth, email!, password!)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`${errorCode}:: ${errorMessage}`);

        if (errorCode === "auth/weak-password") {
          notify("Password should be at least 6 characters long");
          setErrorPasswordInput(true);
          return;
        }
        notify("Invalid Email or Password");
        setErrorEmailInput(true);
        setErrorPasswordInput(true);
      });
  };

  const forgotPassword: MouseEventHandler<HTMLParagraphElement> = (e) => {
    e.preventDefault();

    const email = emailRef.current?.value;
    if (!verifyEmail(email)) return;

    sendPasswordResetEmail(auth, email!)
      .then(() => {
        // Password reset email sent!
        // ..
        notify("Password Reset Email sent!", { type: "success" });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`${errorCode}:: ${errorMessage}`);
        notify("Password Reset Error");
      });
  };

  return {
    type,
    setType,
    emailRef,
    passwordRef,
    errorEmailInput,
    setErrorEmailInput,
    errorPasswordInput,
    setErrorPasswordInput,
    toggleType,
    verifyEmail,
    verifyPassword,
    login,
    signup,
    forgotPassword,
  };
}

export enum SignInType {
  signIn,
  logIn,
}

export default useSignInPage;
