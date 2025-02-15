import { describe, it, expect, vi } from "vitest";
import { LeadsGateway } from "../../../../src/modules/Leads/infrastructure/gateways/LeadsGateway";
import { mockFailedGetRegistersResponse, mockGetRegistersParams, mockGetRegistersResponse, mockSuccessGetRegistersResponse } from "../mocks";
import { IHttpClient } from "../../../../src/modules/httpClient/interfaces";
import { apis } from "../../../../src/constants/api";

const mockHttpClient: IHttpClient = {
  get: vi.fn(),
  patch: vi.fn(),
  post: vi.fn(),
  delete: vi.fn(),
  put: vi.fn()
};

describe("LeadsGateway - getRegisters", () => {
  const leadsGateway = LeadsGateway(mockHttpClient);

  it("should resolve with mapped register data on successful response", async () => {

    mockHttpClient.get = vi.fn().mockResolvedValue(mockGetRegistersResponse);

    const result = await leadsGateway.getRegisters(mockGetRegistersParams);

    expect(mockHttpClient.get).toHaveBeenCalledWith(apis.fileLogs.fileLogs, mockGetRegistersParams);
    expect(result).toEqual(mockSuccessGetRegistersResponse);
  });

  it("should reject with error message on failed response", async () => {

    mockHttpClient.get = vi.fn().mockResolvedValue(mockFailedGetRegistersResponse);

    await expect(leadsGateway.getRegisters(mockGetRegistersParams)).rejects.toEqual(mockFailedGetRegistersResponse.error);
  });

  it("should reject with an error object on exception", async () => {
    const mockError = new Error("Network error");

    mockHttpClient.get = vi.fn().mockRejectedValue(mockError);

    await expect(leadsGateway.getRegisters(mockGetRegistersParams)).rejects.toEqual(mockError);
  });
});
