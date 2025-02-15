import { describe, beforeEach, expect, test } from "vitest";
import { addMonths, format } from "date-fns";
import { IGetRucFileByPeriodGateway } from "../../../../../src/modules/Ruc/core/gateways/IGetRucFileByPeriodGateway";
import { httpClientMock, getRucFileResponse } from "../../mocks";
import { HttpGetFileRucByPeriodGateway } from "../../../../../src/modules/Ruc/infrastructure/gateways/HttpGetRucFileByPeriodGateway";

describe("http get file ruc by gateway", () => {
  const dateExample = format(addMonths(new Date(), 1), "dd/MM/yyyy");
  let httpGetFileRucByPeriodGateway: IGetRucFileByPeriodGateway;

  beforeEach(() => {
    httpGetFileRucByPeriodGateway =
      HttpGetFileRucByPeriodGateway(httpClientMock);
  });

  test("get file by period from server", async () => {
    httpClientMock.get.mockResolvedValue(getRucFileResponse);
    await httpGetFileRucByPeriodGateway.getRucFile(dateExample);
    expect(httpClientMock.get).toHaveBeenCalled();
  });

  test("when there is no data, should return an empty array", async () => {
    httpClientMock.get.mockResolvedValue({
      ...getRucFileResponse,
      data: { result: [] },
    });
    const response = await httpGetFileRucByPeriodGateway.getRucFile(
      dateExample
    );
    expect(httpClientMock.get).toHaveBeenCalled();
    expect(response.length === 0).toBeTruthy();
  });

  test("catch the error when server returns error", async () => {
    const error = new Error("error");
    httpClientMock.get.mockRejectedValue(error);
    await httpGetFileRucByPeriodGateway
      .getRucFile(dateExample)
      .catch((err) => expect(err).toEqual(error));
  });
});
