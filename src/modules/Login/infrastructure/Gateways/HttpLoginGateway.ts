import { ILoginGateway } from "../../core/Gateways/ILoginGateway";
import { IHttpClient, HttpResponse } from "../../../httpClient/interfaces";
import { apis } from "../../../../constants/api";

export const HttpLoginGateway = (httpClient: IHttpClient): ILoginGateway => {
  const onLoginResponse = (response: HttpResponse) => {
    return response.data;
  };

  return {
    async onLogin(values) {
      try {
        const response = await httpClient.post(apis.auth.login, values);
        if (!response.status) {
          return Promise.reject(response.error);
        }
        return Promise.resolve(onLoginResponse(response));
      } catch (errorResult) {
        return Promise.reject(errorResult);
      }
    },
  };
};
