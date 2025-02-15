import { DependencyManager } from "../../dependencyManager";
import { IHttpClient } from "../httpClient/interfaces";
import { LoginAction } from "./core/actions/LoginAction";
import { HttpLoginGateway } from "./infrastructure/Gateways/HttpLoginGateway";
import { InMemoryLoginRepository } from "./infrastructure/repositories/inMemoryLoginRepository";

export const loginModuleInitialize = (dependencyManager: DependencyManager) => {
  const loginGateway = HttpLoginGateway(
    GetHttpClientDependency(dependencyManager)
  );
  const loginRepository = InMemoryLoginRepository();
  const loginAction = LoginAction(loginGateway, loginRepository);

  dependencyManager.register("loginAction", loginAction);
  dependencyManager.register("loginRepository", loginRepository);
};

export const GetHttpClientDependency = (
  dependencyManager: DependencyManager
) => {
  // Aca creamos una funcion que permite traer desde el dependency manager, al http client y asi pasarselo al gateway
  return dependencyManager.resolve("httpClient") as IHttpClient;
};
