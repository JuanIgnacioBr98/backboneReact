import { ILoginRepository } from "../Repositories/iLoginRepository";

export interface ILogoutAction {
  execute: () => Promise<boolean>;
}

export const LogoutAction = (
  loginRepository: ILoginRepository
): ILogoutAction => {
  return {
    async execute() {
      try {
        loginRepository.clearUserData();
        return Promise.resolve(true);
      } catch (err) {
        return Promise.reject(err);
      }
    },
  };
};
