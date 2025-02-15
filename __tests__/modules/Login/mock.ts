import { mock } from "vitest-mock-extended";
import { ILoginRepository } from "../../../src/modules/Login/core/repositories/iLoginRepository";
import { ILoginGateway } from "../../../src/modules/Login/core/Gateways/ILoginGateway";
import { ILogin } from "../../../src/modules/Login/core/entities/ILogin";

export const loginRepository = mock<ILoginRepository>();
export const loginGateway = mock<ILoginGateway>();

export const userMock = {
  displayName: "Santiago",
  email: "santiago@gmail.com",
  photoURL: "https://photo.com",
  token: "12314251",
  uid: "1412",
};

export const loginMock: ILogin = {
  email: "santiago@gmail.com",
  password: "123456",
};
