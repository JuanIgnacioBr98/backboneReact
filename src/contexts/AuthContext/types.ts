import { RoleType } from "../../constants/index";

export type AuthState = {
  authenticated: boolean;
  userData: AuthenticatedUser | null;
  token: string;
  role: RoleType | null;
};

export type AuthenticatedUser = {
  userName: string;
  email: string;
  uid: string;
  id: string;
  token: string;
};
