/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, ReactNode, useEffect, useReducer } from "react";
import { AuthenticatedUser, AuthState } from "./types";
import { RoleType } from "../../constants";
import { ILoginRepository } from "../../modules/Login/core/Repositories/iLoginRepository";

interface AuthContextData {
  authState: AuthState;
  dispatch: any;
  logOut: () => void;
}

export const initialState: AuthState = {
  authenticated: false,
  userData: {} as AuthenticatedUser,
  token: "",
  role: null,
};

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

type AuthAction = {
  type: "LOGIN" | "LOGOUT";
  payload?: {
    user: any;
    role: RoleType | null;
    token: string | null;
  };
};

const reducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        authenticated: true,
        userData: action?.payload?.user || null,
        token: action?.payload?.token || null,
        role: action?.payload?.role || null,
      };
    case "LOGOUT":
      return {
        authenticated: false,
        userData: null,
        token: "",
        role: null,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({
  children,
  loginRepository,
}: {
  children: ReactNode;
  loginRepository: ILoginRepository;
}) => {
  const initialState: AuthState = {
    authenticated: false,
    userData: null,
    token: "",
    role: null,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const user = await loginRepository.getUserData();
    if (user) {
      dispatch({
        type: "LOGIN",
        payload: {
          user: user.user,
          token: user.token,
          role: user.user.role,
        },
      });
    }
  };

  const logOut = () => {
    loginRepository.clearUserData();
    dispatch({
      type: "LOGOUT",
    });
  };

  return (
    <AuthContext.Provider value={{ ...state, dispatch, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
