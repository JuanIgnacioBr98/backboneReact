import { HttpResponse, IHttpClient } from "../../../../httpClient/interfaces";
import { apis } from "../../../../../constants/api";
import { ITypeOfAgreementGateway } from "../../core/gateways/ITypeOfAgreementGateway";
import { ITypeOfAgreement } from "../../core/entities/ITypeOfAgreement";

export const TypeOfAgreementGateway = (
    httpClient: IHttpClient
): ITypeOfAgreementGateway => {
    return {
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
        async editTypeOfAgreement(params, id) {
            try {
                const response = await httpClient.patch(
                    `${apis.parameters.typeOfAgreements}/${id}`,
                    params
                );
                return Promise.resolve(responseTypeOfAgreement(response));
            } catch (error) {
                return Promise.reject(responseError(error));
            }
        },
        async saveTypeOfAgreement(params) {
            try {
                const response = await httpClient.post(
                    apis.parameters.typeOfAgreements,
                    params
                );

                if (!response.status) {
                    return Promise.reject(response.error);
                }

                return Promise.resolve(responseTypeOfAgreement(response));
            } catch (error) {
                return Promise.reject(responseError(error));
            }
        },
        async deleteTypeOfAgreement(id) {
            try {
                const response = await httpClient.delete(
                    `${apis.parameters.typeOfAgreements}/${id}`
                );
                if (!response.status) {
                    return Promise.reject(response.error);
                }
                return Promise.resolve(responseTypeOfAgreement(response));
            } catch (error) {
                return Promise.reject(responseError(error));
            }
        },
    };
};

const responseTypeOfAgreement = (response: HttpResponse): ITypeOfAgreement => {
    const { data } = response;
    return {
        id: data.id,
        typeOfEmployer: data.type_of_employer,
        decision: data.decision,
    };
};

const mapResponseToGetTypeOfAgreements = (
    response: HttpResponse
): ITypeOfAgreement[] | undefined => {
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