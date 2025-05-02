import { useEffect, useState } from "react";
import Loading from "../common/Loading";
import { useNavigate } from "react-router-dom";
import useAuthFetch from "../../hooks/useAuthFetch";
import { Link } from "react-router-dom";
import { UserAuth } from "../../hooks/useAuthFetch";
import { UserRegisterData } from "../../hooks/useAuthFetch";
import { User } from "../../hooks/useAuthFetch";

interface Prop {
  action: string;
}

interface Auth {
  data: User | undefined;
  isLoading: boolean;
  error: string | null | undefined;
  getToken: (data: UserAuth) => void;
  registerUser: (data: UserRegisterData) => void;
}

const AuthForm = ({ action }: Prop) => {
  

  

  

  

  return (
    <>
      {name ? (
        
      ) : (
        
      )}
    </>
  );
};

export default AuthForm;
