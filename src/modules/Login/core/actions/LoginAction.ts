import { ILogin } from "../entities/ILogin";
import { ILoginGateway } from "../Gateways/ILoginGateway";
import { ILoginRepository } from "../Repositories/iLoginRepository";

export interface ILoginAction {
  execute: (values: ILogin) => Promise<boolean>;
}

export const LoginAction = (
  loginGateway: ILoginGateway,
  loginRepository: ILoginRepository
): ILoginAction => {
  return {
    async execute(values) {
      try {
        const response = await loginGateway.onLogin(values);
        loginRepository.login(response);
        return Promise.resolve(response);
      } catch (err) {
        return Promise.reject(err);
      }
    },
  };
};
