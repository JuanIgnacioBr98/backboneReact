import { describe, it, expect, vi, beforeEach } from "vitest";
import { AgesGateway } from '../../../../../../src/modules/ManageParameters/preFilterAge/infrastructure/gateways/AgesGateway';
import { editAgeParamsMock, GATEWAY_GET_AGES_SUCCESS_RESPONSE, getAgeActionErrorMock, httpClientMock, responseErrorEditAgeMock, responseSuccesfullEditAgeMock } from "../../../mocks";
import { apis } from "../../../../../../src/constants/api";
import { HttpResponse } from "../../../../../../src/modules/httpClient/interfaces";

describe("AgesGateway", () => {
  const agesGateway = AgesGateway(httpClientMock);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getAges", () => {
    it("should resolve with age data on successful response", async () => {
      httpClientMock.get.mockResolvedValueOnce(GATEWAY_GET_AGES_SUCCESS_RESPONSE as HttpResponse);
      
      const response = await agesGateway.getAges();

      expect(httpClientMock.get).toHaveBeenCalledWith(apis.parameters.age);
      expect(response).toEqual(GATEWAY_GET_AGES_SUCCESS_RESPONSE.data);
    });

    it("should reject with error message on failed response", async () => {

      httpClientMock.get.mockResolvedValue(getAgeActionErrorMock);

      await expect(agesGateway.getAges()).rejects.toEqual(getAgeActionErrorMock.error);
    });

  });

  describe("editAge", () => {

    it("should resolve with success response on successful edit", async () => {

      httpClientMock.patch = vi.fn().mockResolvedValue(responseSuccesfullEditAgeMock);

      const response = await agesGateway.editAge(editAgeParamsMock);

      expect(httpClientMock.patch).toHaveBeenCalledWith(
        `${apis.parameters.age}/${editAgeParamsMock.id}`,
        editAgeParamsMock.body
      );
      expect(response).toEqual(responseSuccesfullEditAgeMock.data);
    });

    it("should reject with error message on failed edit", async () => {

      httpClientMock.patch = vi.fn().mockResolvedValue(responseErrorEditAgeMock);

      await expect(agesGateway.editAge(editAgeParamsMock)).rejects.toEqual(
        responseErrorEditAgeMock.error
      );
    });

  });
});
