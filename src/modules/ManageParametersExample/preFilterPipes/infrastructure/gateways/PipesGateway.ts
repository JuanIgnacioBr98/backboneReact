import { HttpResponse, IHttpClient } from "../../../../httpClient/interfaces";
import { IPipesGateway } from "../../core/gateways/IPipesGateway";
import { apis } from "../../../../../constants/api";
import IPreFilterPipe from "../../core/entities/IPreFilterPipe";

export const PipesGateway = (httpClient: IHttpClient): IPipesGateway => {
  return {
    async getPipes() {
      try {
        const response = await httpClient.get(apis.parameters.pipes);
        if (!response.status) {
          return Promise.reject(response.error);
        }
        return Promise.resolve(mapResponseToGetPipes(response));
      } catch (error) {
        return Promise.reject(responseError(error));
      }
    },
    async editPipe(params) {
      try {
        const { body, id } = params;
        const response = await httpClient.patch(
          `${apis.parameters.pipes}/${id}`,
          body
        );
        if (!response.status) {
          return Promise.reject(response.error);
        }
        return Promise.resolve(responsePipe(response));
      } catch (error) {
        return Promise.reject(responseError(error));
      }
    },
    async savePipe(params) {
      try {
        const { body } = params;

        const response = await httpClient.post(
          apis.parameters.pipes,
          body
        );

        if (!response.status) {
          return Promise.reject(response.error);
        }

        return Promise.resolve(responsePipe(response));
      } catch (error) {
        return Promise.reject(responseError(error));
      }
    },
    async deletePipe(id) {
      try {
        const response = await httpClient.delete(
          `${apis.parameters.pipes}/${id}`
        );
        if (!response.status) {
          return Promise.reject(response.error);
        }
        return Promise.resolve(responsePipe(response));
      } catch (error) {
        return Promise.reject(responseError(error));
      }
    },
  };
};

const responsePipe = (response: HttpResponse): IPreFilterPipe => {
  const { data } = response;
  return {
    id: data.id,
    key: data.key,
    value: data.value,
    order: data.order,
  };
};

const mapResponseToGetPipes = (
  response: HttpResponse
): IPreFilterPipe[] => {
  return response.data.map((registerRes) => ({
    id: registerRes.id,
    value: registerRes.value,
    key: registerRes.key,
    order: registerRes.order,
  }));
};

const responseError = (error: HttpResponse): string => {

  if (!error.error) {
    return "undefined";
  }

  return error.error?.message;
};