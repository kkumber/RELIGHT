import isValidUsername from "../utils/isValidUsername";
import isEmailValid from "../utils/isEmailValid";
import { useCallback, useEffect, useState } from "react";

interface Prop {
  name: string;
  value: string;
  password: string;
}

const useAuthValidation = ({ name, value, password }: Prop) => {
  const [errorMsg, setErrorMsg] = useState<string>();
  const [isValid, setIsValid] = useState<boolean>(true);

  const validate = useCallback(() => {
    switch (name) {
      case "username":
        if (!isValidUsername(value)) {
          setErrorMsg("Username must be 3–15 alphanumeric characters.");
          setIsValid(false);
          break;
        }
      case "email":
        if (!isEmailValid(value)) {
          setErrorMsg("Invalid Email");
          setIsValid(false);

          break;
        }
      case "password":
        if (value.length < 8) {
          setErrorMsg("Password must at least be 8 characters.");
          setIsValid(false);

          break;
        }
      case "password2":
        if (value !== password) {
          setErrorMsg("Password does not match.");
          setIsValid(false);

          break;
        }
      default:
        setErrorMsg("");
        setIsValid(true);
        break;
    }
  }, [name, value, password]);

  return { errorMsg, isValid, validate };
};

export default useAuthValidation;
