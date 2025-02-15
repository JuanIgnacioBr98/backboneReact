import { ILogin } from "../entities/ILogin";

export interface ILoginRepository {
  login: (values: ILogin) => Promise<boolean>;
  setUserData: (user) => void;
  clearUserData: () => void;
  getUserData: () => Promise<ILogin>;
}
