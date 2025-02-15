import { HttpResponse, IHttpClient } from "../../../../httpClient/interfaces";
import { apis } from "../../../../../constants/api";
import { IAgreementGateway } from "../../core/gateways/IAgreementsGateway";
import IPreFilterAgreement from "../../core/entities/IPreFilterAgreement";
import { TypeOfAgreement } from "../../core/entities/TypeOfAgreement";

export const AgreementsGateway = (
  httpClient: IHttpClient
): IAgreementGateway => {
  return {
    async getAgreements() {
      try {        
        const response = await httpClient.get(apis.parameters.agreements);
        if (!response.status) {
          return Promise.reject(response.error);
        }
        return Promise.resolve(mapResponseToGetAgreements(response));
      } catch (error) {
        return Promise.reject(responseError(error));
      }
    },
    async editAgreement(params) {
      try {
        const { body, id } = params;
        const response = await httpClient.patch(
          `${apis.parameters.agreements}/${id}`,
          body
        );
        return Promise.resolve(responseAgreement(response));
      } catch (error) {  
        return Promise.reject(responseError(error));
      }
    },
    async saveAgreement(params) {
      try {
        const { body } = params;
        const response = await httpClient.post(
          apis.parameters.agreements,
          body
        );

        if (!response.status) {
          return Promise.reject(response.error);
        }

        return Promise.resolve(responseAgreement(response));
      } catch (error) {
        return Promise.reject(responseError(error));
      }
    },
    async deleteAgreement(id) {
      try {
        const response = await httpClient.delete(
          `${apis.parameters.agreements}/${id}`
        );
        if (!response.status) {
          return Promise.reject(response.error);
        }
        return Promise.resolve(responseAgreement(response));
      } catch (error) {
        return Promise.reject(responseError(error));
      }
    },
    async getTypeOfAgreements() {
      try {
        const response = await httpClient.get(apis.parameters.typeOfAgreements);       
        if (!response.status) {
          return Promise.reject(response.error);
        }
        return Promise.resolve(mapResponseToGetTypeOfAgreements(response));
      } catch (error) {
        return Promise.reject(responseError(error));
      }
    },
  };
};

const responseAgreement = (response: HttpResponse): IPreFilterAgreement => {
  const { data } = response;
  return {
    id: data.id,
    number: data.number,
    name: data.name,
    typeId: data.types_of_agreement_id,
  };
};

const mapResponseToGetAgreements = (
  response: HttpResponse
): IPreFilterAgreement[] => {
  return response.data.map((registerRes) => ({
    id: registerRes.id,
    number: registerRes.number,
    name: registerRes.name,
    typeOfAgreement: registerRes.typeId,
  }));
};

const mapResponseToGetTypeOfAgreements = (
  response: HttpResponse
): TypeOfAgreement[] | undefined => {  
  return response.data.map((registerRes) => ({
    id: registerRes.id,
    typeOfEmployer: registerRes.type_of_employer,
    decision: registerRes.decision,
  }));
};

const responseError = (error: HttpResponse): string => {

  if (!error.error) {
    return "undefined";
  }

  return error.error?.message;
};