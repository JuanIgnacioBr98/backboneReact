import React, { useContext, useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { translate } from "../../../hooks/useTranslator";
import { ILoginPresenter } from "../core/Presentation/iLoginPresenter";
import { LoginScreens } from "../core/Screens/iLoginScreens";
import { IUser } from "../core/entities/ILogin";
import { loginPresenterProvider } from "../infrastructure/presentation/presenterProvider";
import { AuthContext } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { ROLES } from "../../../constants";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { makeStyles } from "./styles";
import { Button, Input, InputLabel } from "@mantine/core";

type UserLogin = Pick<IUser, "email" | "password">;

const Login = () => {
  const translator = translate();
  const styles = makeStyles();
  const presenterProvider = loginPresenterProvider();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [presenter, setPresenter] = useState<ILoginPresenter>(
    {} as ILoginPresenter
  );
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loaded, setLoaded] = useState<boolean>(false);
  const loginTabTitle = "Iniciar sesión | Accicom - Préstamos personales";

  const viewHandlers: LoginScreens = {
    loginSuccess(res): void {
      setIsLoading(false);
      authContext.dispatch({
        type: "LOGIN",
        payload: {
          user: res.user,
          token: res.token,
          role: ROLES.USER,
        },
      });
      navigate("/");
    },
    loginError(err): void {
      setIsLoading(false);
      if (err?.data.msg === "Contraseña incorrecta") {
        form.setErrors({
          password: "login.tid_invalid_password",
        });
      }  else {        
        form.setErrors({
          email: "login.tid_invalid_email_validation",
        });
      }
    },
  };

  useEffect(() => {
    document.title = loginTabTitle;
    setPresenter(presenterProvider.getPresenter(viewHandlers));
    setLoaded(true);
  }, []);

  const form = useForm({
    mode: "controlled",
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) =>
        value.length === 0
          ? "login.tid_input_required_validation"
          : /^\S+@\S+$/.test(value)
            ? null
            : "login.tid_invalid_email_validation",
      password: (value) =>
        value.length === 0 ? "login.tid_input_required_validation" : null,
    },
  });

  const handleSubmit = (values: UserLogin) => {
    form.validate();
    if (loaded) {
      setIsLoading(true);
      presenter.login(values);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="h-screen w-screen flex flex-col items-center justify-center">
        <div className="h-[80%] w-[80%] flex flex-col flex items-center justify-center p-4">
              <form
                onSubmit={form.onSubmit((values) => handleSubmit(values))}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <label htmlFor="email">
                    {translator("login.email_label")}
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="@"
                    key={form.key("email")}
                    {...form.getInputProps("email")}
                  />
                  <p style={styles.errorText}>
                    {form?.errors?.email
                      ? translator(`${form.errors.email}`)
                      : ""}
                  </p>
                </div>
                <div className="space-y-2">
                  <InputLabel htmlFor="password">
                    {translator("login.password_label")}
                  </InputLabel>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="/"
                      key={form.key("password")}
                      {...form.getInputProps("password")}
                    />
                    <p style={{ ...styles.errorText, marginTop: 6 }}>
                      {form?.errors?.password
                        ? translator(`${form.errors.password}`)
                        : ""}
                    </p>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={togglePasswordVisibility}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-500" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-500" />
                      )}
                    </Button>
                  </div>
                </div>
                <div className="flex justify-center pt-4 pb-8">
                  <Button
                    type="submit"
                    className="w-[70%] bg-[#005595] hover:bg-[#004477] text-white rounded-3xl"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      </>
                    ) : (
                      translator("login.submit_button_title")
                    )}
                  </Button>
                </div>
              </form>
          <div className="flex justify-center pt-20">
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
