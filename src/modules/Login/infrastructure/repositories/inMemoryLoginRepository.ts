import { ILoginRepository } from "../../core/Repositories/iLoginRepository";

export const InMemoryLoginRepository = (): ILoginRepository => {
  return {
    login(values) {
      localStorage.setItem("session", JSON.stringify(values));
      return Promise.resolve(values);
    },
    clearUserData: () => {
      localStorage.removeItem("session");
    },
    getUserData: async () => {
      return await JSON.parse(localStorage.getItem("session") || "");
    },
  };
};
