import React, { useContext, useState, createContext } from "react";

// Define the types for the context values
export type UserType = { id: number; username: string } | null;
export type AccessTokenType = string | null;
export type CSRFTokenType = string | null;

// Custom hooks to access contexts
export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error(
      "useUserContext must be used within a UserContext.Provider"
    );
  }
  return context;
};

export const useAccessTokenContext = (): AccessTokenContextType => {
  const context = useContext(AccessTokenContext);
  if (!context) {
    throw new Error(
      "useAccessTokenContext must be used within an AccessTokenContext.Provider"
    );
  }
  return context;
};

export const useCSRFTokenContext = (): CSRFTokenContextType => {
  const context = useContext(CSRFToken);
  if (!context) {
    throw new Error(
      "useCSRFTokenContext must be used within a CSRFToken.Provider"
    );
  }
  return context;
};

// Define types for the context states
interface UserContextType {
  user: UserType;
  setUser: React.Dispatch<React.SetStateAction<UserType>>;
}

interface AccessTokenContextType {
  accessToken: AccessTokenType;
  setAccessToken: React.Dispatch<React.SetStateAction<AccessTokenType>>;
}

interface CSRFTokenContextType {
  csrf_token: CSRFTokenType;
  setcsrf_token: React.Dispatch<React.SetStateAction<CSRFTokenType>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);
const AccessTokenContext = createContext<AccessTokenContextType | undefined>(
  undefined
);
const CSRFToken = createContext<CSRFTokenContextType | undefined>(undefined);

const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<UserType>(null);
  const [accessToken, setAccessToken] = useState<AccessTokenType>(null);
  const [csrf_token, setcsrf_token] = useState<CSRFTokenType>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <AccessTokenContext.Provider value={{ accessToken, setAccessToken }}>
        <CSRFToken.Provider value={{ csrf_token, setcsrf_token }}>
          {children}
        </CSRFToken.Provider>
      </AccessTokenContext.Provider>
    </UserContext.Provider>
  );
};

export default AuthProvider;
