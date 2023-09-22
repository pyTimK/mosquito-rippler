import Modal from "react-modal";
import FullLogo from "@/components/svg/FullLogo";
import MyButton from "@/components/MyButton";
import MyInput from "@/components/MyInput";
import { interFont, jsoFont } from "@/styles/fonts";
import SizedBox from "@/components/SizedBox";
import BottomStats from "@/components/svg/BottomStats";
import useDeviceDimensions from "@/hooks/useDeviceDimensions";
import {
  Dispatch,
  FormEventHandler,
  MouseEventHandler,
  SetStateAction,
  useRef,
  useState,
} from "react";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";
import notify from "@/myfunctions/notify";
import isValidEmail from "@/myfunctions/is_valid_email";
import { Colors } from "@/styles/styles";

enum SignInType {
  signIn,
  logIn,
}

const SignInPage: React.FC = () => {
  const [type, setType] = useState(SignInType.signIn);
  const { screenWidth } = useDeviceDimensions();
  return (
    <div className="relative min-h-screen min-w-screen bg-white">
      <div className="absolute m-auto left-0 right-0">
        <Content type={type} setType={setType} />
        <SizedBox height={50} />
        {screenWidth < 380 && <BottomStats />}
      </div>

      {/* <div
        className={`absolute ${
          aspectRatio > 0.98 ? "-bottom-96" : "bottom-0"
        } left-0 right-0`}
      ></div> */}
    </div>
  );
};

interface ContentProps {
  type: SignInType;
  setType: Dispatch<SetStateAction<SignInType>>;
}

const Content: React.FC<ContentProps> = ({ type, setType }) => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [errorEmailInput, setErrorEmailInput] = useState(false);
  const [errorPasswordInput, setErrorPasswordInput] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function toggleType() {
    setType(type === SignInType.signIn ? SignInType.logIn : SignInType.signIn);
  }

  function openModal() {
    setModalIsOpen(true);
  }

  function afterOpenModal() {}

  function closeModal() {
    setModalIsOpen(false);
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

  const _handleSignUp: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!verifyEmail(email)) return;
    if (!verifyPassword(password)) return;

    openModal();
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
  return (
    <div>
      <div
        className={`flex flex-col items-ceter justify-center space-y-8 px-10`}
      >
        <SizedBox height={20} />
        <div className="m-auto w-full">
          {/* <FullLogo /> */}
          <p className={`${jsoFont} text-5xl text-center text-darker_primary`}>
            Smart Interactive <br />
            Health Kiosk
          </p>
        </div>
        <form
          className="flex flex-col justify-center space-y-10"
          onSubmit={type === SignInType.signIn ? login : _handleSignUp}
        >
          <MyInput
            className="border rounded-lg w-full max-w-sm bg-light_primary"
            borderColor={Colors.darker_primary}
            placeholder="Email"
            error={errorEmailInput}
            innerRef={emailRef}
            onChange={() => setErrorEmailInput(false)}
          />
          <MyInput
            className="border rounded-lg w-full max-w-sm bg-light_primary"
            borderColor={Colors.darker_primary}
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
          <p
            className={`${interFont} text-darker_primary fit-content m-0 text-sm`}
          >
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
      <Modal
        isOpen={modalIsOpen}
        className="absolute bg-darker_primary text-white rounded-xl py-5 px-5 inset-0 w-11/12 h-fit top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        // style={customStyles}
        contentLabel="Example Modal"
      >
        <PrivacyPolicy onClick={signup} />
      </Modal>
    </div>
  );
};

interface PrivacyPolicyProps {
  onClick: FormEventHandler<HTMLFormElement>;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onClick }) => {
  return (
    <div className="a">
      <p className="text-center font-bold whitespace-nowrap text-2xl mb-5">
        Privacy Policy
      </p>
      <div className="h-80 overflow-y-scroll text-sm">
        <h3 className="font-bold">1. Information We Collect</h3>
        <p className="">
          We may collect the following types of personal information from you
          when you use our website and Smart Interactive Health Kiosk devices:
        </p>
        <h4 className="font-bold mt-10">1.1. Personal Information:</h4>
        <ul>
          <li className="mb-5">
            · <em>Name</em>: We collect your name to personalize your user
            experience.
          </li>
          <li className="mb-5">
            · <em>Birth Date</em>: We collect your birth date to calculate your
            age and provide age-specific health recommendations.
          </li>
          <li className="mb-5">
            · <em>Sex</em>: We collect your sex to provide gender-specific
            health information and recommendations.
          </li>
        </ul>
        <h4 className="font-bold mt-10">1.2. Health Information:</h4>
        <ul>
          <li className="mb-5">
            · <em>Weight & Height</em>: We collect your weight and height to
            calculate your Body Mass Index (BMI) and provide you with health
            insights based on this data.
          </li>
          <li className="mb-5">
            · <em>Blood Pressure</em>: We collect your temperature data to
            monitor your body's temperature and provide health recommendations
            based on fluctuations.
          </li>
          <li className="mb-5">
            · <em>Temperature</em>: We collect your sex to provide
            gender-specific health information and recommendations.
          </li>
          <li className="mb-5">
            · <em>SpO2 (Oxygen Saturation):</em>: We collect your SpO2 data to
            monitor blood oxygen levels, which can be crucial for assessing
            respiratory health.
          </li>
          <li className="mb-5">
            · <em>Heart Rate</em>: We collect your heart rate data to monitor
            your cardiac health and provide insights based on heart rate
            variability.
          </li>
        </ul>
        <h4 className="font-bold mt-10">2. How We Use Your Information</h4>
        <p>We use your personal information for the following purposes:</p>
        <ul>
          <li className="mb-5">
            · To provide you with personalized health recommendations and
            insights.
          </li>
          <li className="mb-5">
            · To track and monitor your health progress over time.
          </li>
          <li className="mb-5">
            · To improve our Smart Interactive Health Kiosk devices and
            services.
          </li>
          <li className="mb-5">
            · To respond to your inquiries and provide customer support.
          </li>
          <li className="mb-5">
            · To send you updates, newsletters, and promotional materials if you
            have opted in to receive them.
          </li>
        </ul>
        <h4 className="font-bold mt-10">3. Data Security</h4>
        <p>
          We take the security of your personal information seriously and have
          implemented technical and organizational measures to protect your data
          from unauthorized access, disclosure, alteration, and destruction.
        </p>
        <h4 className="font-bold mt-10">4. Data Sharing</h4>
        <p>
          We may share your personal information with trusted third parties in
          the following situations:
        </p>
        <ul>
          <li className="mb-5">
            · With healthcare professionals or authorized personnel for the
            purpose of providing you with personalized health recommendations.
          </li>
          <li className="mb-5">
            · With service providers who assist us in delivering our services,
            but only to the extent necessary for them to perform their
            functions.
          </li>
          <li className="mb-5">
            · With your explicit consent or as required by law.
          </li>
        </ul>
        <h4 className="font-bold mt-10">5. Your Rights and Choices</h4>
        <p>
          You have the following rights regarding your personal information:
        </p>
        <ul>
          <li className="mb-5">
            · Access: You can request access to the personal information we hold
            about you.
          </li>
          <li className="mb-5">
            · Correction: You can request corrections to any inaccurate or
            incomplete personal information we have about you.
          </li>
          <li className="mb-5">
            · Deletion: You can request the deletion of your personal
            information, subject to legal obligations.
          </li>
          <li className="mb-5">
            · Opt-out: You can opt out of receiving promotional communications
            from us.
          </li>
        </ul>
        <h4 className="font-bold mt-10">6. Changes to this Privacy Policy</h4>
        <p>
          We may update this Privacy Policy from time to time to reflect changes
          in our practices or for other operational, legal, or regulatory
          reasons. We will notify you of any material changes by posting the
          updated Privacy Policy on our website.
        </p>
      </div>
      <div className="flex justify-center mt-6">
        <form onSubmit={onClick}>
          <MyButton
            label="I AGREE"
            type="submit"
            borderColor="bg-white"
            textColor="text-darkest_primary"
          />
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
