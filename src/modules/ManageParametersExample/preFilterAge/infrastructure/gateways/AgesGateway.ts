import { HttpResponse, IHttpClient } from "../../../../httpClient/interfaces";
import { apis } from "../../../../../constants/api";
import { IAgesGateway } from "../../core/gateways/IAgesGateway";

export const AgesGateway = (httpClient: IHttpClient): IAgesGateway => {
  return {
    async getAges() {
      try {
        const response = await httpClient.get(apis.parameters.age);

        if (!response.status) {
          return Promise.reject(response.error);
        }
        return Promise.resolve(mapResponseToGetAge(response));
      } catch (error) {
        return Promise.reject(responseError(error));
      }
    },
    async editAge(params) {
      try {
        const { body, id } = params;
        const response = await httpClient.patch(
          `${apis.parameters.age}/${id}`,
          body
        );
        if (!response.status) {
          return Promise.reject(response.error);
        }
        return Promise.resolve(response.data);
      } catch (error) {
        return Promise.reject(responseError(error));
      }
    },
  };
};

const responseError = (error: HttpResponse): string => {
  if (!error.error) {
    return "undefined";
  }

  return error.error?.message;
};

const mapResponseToGetAge = (response: HttpResponse) => {
  return response.data.map((segmentAge) => ({
    id: segmentAge.id,
    segment: segmentAge.segment,
    gender: segmentAge.gender,
    maxAge: segmentAge.maxAge,
    minAge: segmentAge.minAge,
    agePermanence: segmentAge.agePermanence,
  }));
};
