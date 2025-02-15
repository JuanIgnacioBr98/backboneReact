import { describe, it, expect, vi, beforeEach } from "vitest";
import { HttpResponse, IHttpClient } from "../../../../../../src/modules/httpClient/interfaces";
import { TypeOfAgreementGateway } from "../../../../../../src/modules/ManageParameters/preFilterTypeOfAgreement/infrastructure/gateways/TypeOfAgreementGateway";
import {
    editTypeOfAgreementParamsMock,
    getTypeOfAgreementsActionErrorMock,
    responseErrorEditTypeOfAgreementMock,
    responseErrorDeleteTypeOfAgreementMock,
    responseErrorSaveTypeOfAgreementMock,
    GATEWAY_GET_TYPE_OF_AGREEMENT_SUCCESS_RESPONSE,
    GATEWAY_TYPE_OF_AGREEMENT_SUCCESS_RESPONSE,
    saveTypeOfAgreementParamsMock,
    expectedTransformedTypeOfAgreementData,
    httpClientMock
} from "../../../mocks";
import { apis } from "../../../../../../src/constants/api";

const typeOfAgreementGateway = TypeOfAgreementGateway(httpClientMock);

describe("TypeOfAgreementGateway", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe("getTypeOfAgreements", () => {
        it("should resolve with type of agreements data on successful response", async () => {
            httpClientMock.get.mockResolvedValueOnce(GATEWAY_GET_TYPE_OF_AGREEMENT_SUCCESS_RESPONSE as HttpResponse);

            const response = await typeOfAgreementGateway.getTypeOfAgreements();

            expect(httpClientMock.get).toHaveBeenCalledWith(apis.parameters.typeOfAgreements);
            expect(response).toEqual(expectedTransformedTypeOfAgreementData);
        });

        it("should reject with error message on failed response", async () => {
            httpClientMock.get.mockResolvedValueOnce(getTypeOfAgreementsActionErrorMock);

            await expect(typeOfAgreementGateway.getTypeOfAgreements()).rejects.toEqual(
                getTypeOfAgreementsActionErrorMock.error
            );
        });
    });

    describe("editTypeOfAgreement", () => {
        it("should resolve with success response on successful edit", async () => {
            httpClientMock.patch.mockResolvedValueOnce(GATEWAY_TYPE_OF_AGREEMENT_SUCCESS_RESPONSE as HttpResponse);

            const response = await typeOfAgreementGateway.editTypeOfAgreement(editTypeOfAgreementParamsMock);

            expect(httpClientMock.patch).toHaveBeenCalledWith(
                `${apis.parameters.typeOfAgreements}/${editTypeOfAgreementParamsMock.id}`,
                editTypeOfAgreementParamsMock.body
            );
            expect(response).toEqual(GATEWAY_TYPE_OF_AGREEMENT_SUCCESS_RESPONSE.data);
        });

        it("should reject with error message on failed edit", async () => {
            httpClientMock.patch.mockResolvedValueOnce(responseErrorEditTypeOfAgreementMock);

            await expect(typeOfAgreementGateway.editTypeOfAgreement(editTypeOfAgreementParamsMock)).rejects.toEqual(
                responseErrorEditTypeOfAgreementMock.error
            );
        });
    });

    describe("saveTypeOfAgreement", () => {
        it("should resolve with success response on successful save", async () => {
            httpClientMock.post.mockResolvedValue(GATEWAY_TYPE_OF_AGREEMENT_SUCCESS_RESPONSE as HttpResponse);

            const response = await typeOfAgreementGateway.saveTypeOfAgreement({ body: saveTypeOfAgreementParamsMock.body });

            expect(httpClientMock.post).toHaveBeenCalledWith(
                apis.parameters.typeOfAgreements,
                saveTypeOfAgreementParamsMock.body
            );
            expect(response).toEqual(GATEWAY_TYPE_OF_AGREEMENT_SUCCESS_RESPONSE.data);
        });

        it("should reject with error message on failed save", async () => {
            httpClientMock.post.mockResolvedValueOnce(responseErrorSaveTypeOfAgreementMock);

            await expect(typeOfAgreementGateway.saveTypeOfAgreement({ body: saveTypeOfAgreementParamsMock.body })).rejects.toEqual(
                responseErrorSaveTypeOfAgreementMock.error
            );
        });
    });

    describe("deleteTypeOfAgreement", () => {
        const deleteTypeOfAgreementParamsMock = { id: GATEWAY_TYPE_OF_AGREEMENT_SUCCESS_RESPONSE.data.id.toString() };

        it("should resolve with success response on successful delete", async () => {
            httpClientMock.delete.mockResolvedValueOnce(GATEWAY_TYPE_OF_AGREEMENT_SUCCESS_RESPONSE as HttpResponse);

            const response = await typeOfAgreementGateway.deleteTypeOfAgreement(deleteTypeOfAgreementParamsMock.id);

            expect(httpClientMock.delete).toHaveBeenCalledWith(`${apis.parameters.typeOfAgreements}/${deleteTypeOfAgreementParamsMock.id}`);
            expect(response).toEqual(GATEWAY_TYPE_OF_AGREEMENT_SUCCESS_RESPONSE.data);
        });

        it("should reject with error message on failed delete", async () => {
            httpClientMock.delete.mockResolvedValueOnce(responseErrorDeleteTypeOfAgreementMock);

            await expect(typeOfAgreementGateway.deleteTypeOfAgreement(deleteTypeOfAgreementParamsMock.id)).rejects.toEqual(
                responseErrorDeleteTypeOfAgreementMock.error
            );
        });
    });
});
