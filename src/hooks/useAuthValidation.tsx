import isValidUsername from "../utils/isValidUsername";
import isEmailValid from "../utils/isEmailValid";
import { useCallback, useState } from "react";

interface Inputs {
  username?: string;
  email?: string;
  password1?: string;
  password2?: string;
}

interface Prop {
  InputName: Inputs;
  password?: string;
}

const useAuthValidation = ({ InputName, password }: Prop) => {
  const [usernameErrorMsg, setUsernameErrorMsg] = useState<string>("");
  const [emailErrorMsg, setEmailErrorMsg] = useState<string>("");
  const [password1ErrorMsg, setPassword1ErrorMsg] = useState<string>("");
  const [password2ErrorMsg, setPassword2ErrorMsg] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(true);

  const validate = useCallback(() => {
    // Reset all errors
    setUsernameErrorMsg("");
    setEmailErrorMsg("");
    setPassword1ErrorMsg("");
    setPassword2ErrorMsg("");

    let valid = true;

    if (InputName.username) {
      if (!isValidUsername(InputName.username)) {
        setUsernameErrorMsg("Username must be 3–15 alphanumeric characters.");
        valid = false;
      }
    }

    if (InputName.email) {
      if (!isEmailValid(InputName.email)) {
        setEmailErrorMsg("Invalid Email");
        valid = false;
      }
    }

    if (InputName.password1) {
      if (InputName.password1.length < 8) {
        setPassword1ErrorMsg("Password must be at least 8 characters.");
        valid = false;
      }
    }

    if (InputName.password2) {
      if (InputName.password2 !== password) {
        setPassword2ErrorMsg("Passwords do not match.");
        valid = false;
      }
    }

    setIsValid(valid);
  }, [InputName, password]);

  return {
    isValid,
    validate,
    usernameErrorMsg,
    emailErrorMsg,
    password1ErrorMsg,
    password2ErrorMsg,
  };
};

export default useAuthValidation;
