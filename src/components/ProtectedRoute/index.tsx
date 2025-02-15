import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Login from "../../modules/Login/screens";

export const ProtectedRoute = ({ children }: { children?: any }) => {
  const state = useContext(AuthContext);
  return !state?.authenticated ? <Login /> : children;
};
