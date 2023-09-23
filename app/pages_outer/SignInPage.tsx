import SizedBox from "@/components/SizedBox";
import Title from "@/components/custom/Title";
import MyButton from "@/components/templates/MyButton";
import MyInput from "@/components/templates/MyInput";
import useSignInPage, { SignInType } from "@/hooks/useSignIn";
import { interFont, jsoFont } from "@/styles/fonts";

const SignInPage: React.FC = () => {
  const {
    type,
    emailRef,
    passwordRef,
    errorEmailInput,
    setErrorEmailInput,
    errorPasswordInput,
    setErrorPasswordInput,
    toggleType,
    login,
    signup,
    forgotPassword,
  } = useSignInPage();

  return (
    <div>
      <div
        className={`flex flex-col items-ceter justify-center space-y-8 px-10`}
      >
        <SizedBox height={20} />
        <div className="m-auto w-60">
          <Title />
        </div>
        <form
          className="flex flex-col justify-center space-y-10"
          onSubmit={type === SignInType.signIn ? login : signup}
        >
          <MyInput
            placeholder="Email"
            error={errorEmailInput}
            innerRef={emailRef}
            onChange={() => setErrorEmailInput(false)}
          />
          <MyInput
            placeholder="Password"
            type="password"
            error={errorPasswordInput}
            innerRef={passwordRef}
            onChange={() => setErrorPasswordInput(false)}
          />
          <MyButton
            type="submit"
            label={type === SignInType.signIn ? "LOGIN" : "SIGN UP"}
          />
        </form>
        <p
          className={`${interFont} text-link fit-content m-auto`}
          onClick={forgotPassword}
        >
          FORGOT PASSWORD&#63;
        </p>
        <div className="flex flex-row items-center justify-center">
          <p className={`${interFont} text-text_gray fit-content m-0 text-sm`}>
            {type == SignInType.signIn
              ? "DON'T HAVE AN ACOUNT?"
              : "ALREADY HAVE AN ACCOUNT?"}
          </p>
          <SizedBox width={10} />
          <p
            onClick={toggleType}
            className={`${interFont} text-link fit-content m-0 text-sm`}
          >
            {type == SignInType.signIn ? "CREATE ONE" : "LOGIN"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
