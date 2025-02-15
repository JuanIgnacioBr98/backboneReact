import { LoginScreens } from "../../core/Screens/iLoginScreens";
import { ILoginAction } from "../../core/actions/LoginAction";
import { IPresenterProvider } from "../../../../utils/iPresenterProvider";
import { LoginPresenter } from "./LoginPresenter";
import { useDependency } from "../../../../hooks/useDependency";
import { ILoginPresenter } from "../../core/Presentation/iLoginPresenter";

export const loginPresenterProvider = (): IPresenterProvider<
  LoginScreens,
  ILoginPresenter
> => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const loginAction = useDependency("loginAction") as ILoginAction;

  return {
    getPresenter(viewHandlers) {
      const presenter = LoginPresenter(loginAction, viewHandlers);
      return presenter;
    },
  };
};
