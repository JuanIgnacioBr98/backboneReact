import { describe, beforeEach, expect, test } from "vitest";
import { IUpdateFileStatusGateway } from "../../../../src/modules/Cendeu/core/gateways/IUpdateFileStatusGateway";
import { httpClientMock, fileName, updateFileResponse } from "../mocks";
import { HttpUpdateFileStatusGateway } from "../../../../src/modules/Cendeu/infrastructure/gateways/HttpUpdateFileStatusGateway";

describe("Update file status gateway", () => {
  let updateFileStatusGateway: IUpdateFileStatusGateway;

  beforeEach(() => {
    updateFileStatusGateway = HttpUpdateFileStatusGateway(httpClientMock);
  });

  test("should execute http client when gateway is called", () => {
    httpClientMock.patch.mockResolvedValue(updateFileResponse);
    updateFileStatusGateway.updateStatus(fileName, true);
    expect(httpClientMock.patch).toHaveBeenCalled();
  });

  test("should execute the gateway wrongly and return the error", () => {
    const error = new Error("error");
    httpClientMock.patch.mockRejectedValue(error);
    updateFileStatusGateway
      .updateStatus(fileName, true)
      .catch((err) => expect(err).toEqual(error));
    expect(httpClientMock.patch).toHaveBeenCalled();
  });
});
