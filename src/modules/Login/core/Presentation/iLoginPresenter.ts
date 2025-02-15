import { ILogin } from "../entities/ILogin";

export interface ILoginPresenter {
  login(values: ILogin): void;
}
