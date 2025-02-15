import { ILoginPresenter } from "../../core/Presentation/iLoginPresenter";
import { ILoginAction } from "../../core/actions/LoginAction";
import { LoginScreens } from "../../core/Screens/iLoginScreens";

export const LoginPresenter = (
  loginAction: ILoginAction,
  loginScreens: LoginScreens
): ILoginPresenter => {
  return {
    async login(values) {
      loginAction
        .execute(values)
        .then(loginScreens.loginSuccess)
        .catch(loginScreens.loginError);
    },
  };
};
