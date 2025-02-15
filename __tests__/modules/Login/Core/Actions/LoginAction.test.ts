/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ILoginAction,
  LoginAction,
} from "../../../../../src/modules/Login/core/actions/LoginAction";
import { loginRepository, loginGateway } from "../../mock";
import { describe, beforeEach, expect, vitest, test } from "vitest";

const credentials = {
  email: "test@mail.com",
  password: "1234",
};

describe("LoginAction Test", () => {
  let loginAction: ILoginAction;

  beforeEach(() => {
    vitest.clearAllMocks();
    loginAction = LoginAction(loginRepository, loginGateway);
  });

  test("should execute gateway when action executes", () => {
    loginRepository.login.mockResolvedValue(true);
    loginAction.execute(credentials);
    expect(loginRepository.login).toHaveBeenCalledWith(credentials);
  });

  test("when repository executes with error, the action should catch it", () => {
    const error = new Error("Error");
    loginRepository.login.mockRejectedValue(error);
    loginAction.execute(credentials).catch((err) => expect(err).toBe(error));
  });
});
