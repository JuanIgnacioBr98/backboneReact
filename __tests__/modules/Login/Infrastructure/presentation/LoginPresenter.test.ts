import { describe, test, vi, vitest, beforeEach, expect } from "vitest";
import { ILoginPresenter } from "../../../../../src/modules/Login/core/Presentation/iLoginPresenter";
import { LoginPresenter } from "../../../../../src/modules/Login/infrastructure/presentation/LoginPresenter";
import { loginMock } from "../../mock";
import { ILoginAction } from "../../../../../src/modules/Login/core/actions/LoginAction";
import { ILogoutAction } from "../../../../../src/modules/Login/core/actions/LogoutAction";
import { LoginScreens } from "../../../../../src/modules/Login/core/Screens/iLoginScreens";

describe("LoginPresenter", () => {
  let loginPresenter: ILoginPresenter;
  let loginActionMock: ILoginAction;
  let logoutActionMock: ILogoutAction;
  let loginScreensMock: LoginScreens;

  beforeEach(() => {
    vitest.clearAllMocks();
    loginActionMock = { execute: vi.fn() };
    logoutActionMock = { execute: vi.fn() };
    loginScreensMock = {
      loginSuccess: vi.fn(),
      loginError: vi.fn(),
      logoutSuccess: vi.fn(),
    };
    loginPresenter = LoginPresenter(
      loginActionMock,
      loginScreensMock,
      logoutActionMock
    );
  });

  test("LoginAction Error: Try login with wrong credentials and loginError screen is called", async () => {
    const error = new Error("Error");
    const wrongCredentials = loginMock;

    loginActionMock.execute.mockRejectedValue(error);
    await loginPresenter.login(wrongCredentials);

    expect(loginScreensMock.loginError).toHaveBeenCalledWith(error);
  });

  test("LoginAction Success: Try login with correct credentials and loginSuccess screen is called", async () => {
    const correctCredentials = loginMock;

    loginActionMock.execute.mockResolvedValue();
    await loginPresenter.login(correctCredentials);

    expect(loginScreensMock.loginSuccess).toHaveBeenCalled();
  });

  test("Logout Error: Try to logout and gets loginError", async () => {
    const error = new Error("Error");
    logoutActionMock.execute.mockRejectedValueOnce(error);
    await loginPresenter.logout();
    expect(loginScreensMock.loginError).toHaveBeenCalledWith(error);
  });

  test("Logout Success: Try to logout and gets logoutSuccess", async () => {
    logoutActionMock.execute.mockResolvedValue();
    await loginPresenter.logout();

    expect(loginScreensMock.logoutSuccess).toHaveBeenCalled();
  });
});
