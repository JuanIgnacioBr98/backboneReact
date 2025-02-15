import { describe, it, expect, vi, beforeEach } from "vitest";
import { PipesGateway } from "../../../../../../src/modules/ManageParameters/preFilterPipes/infrastructure/gateways/PipesGateway";
import {
  editPipeParamsMock,
  responseErrorEditMock,
  getActionErrorMock,
  savePipeParamsMock,
  httpClientMock,
  PIPES_RESPONSE,
  GATEWAY_GET_PIPES_SUCCESS_RESPONSE,
  GATEWAY_PIPE_SUCCESS_RESPONSE,
} from "../../../mocks";
import { apis } from "../../../../../../src/constants/api";
import { HttpResponse } from "../../../../../../src/modules/httpClient/interfaces";

const pipesGateway = PipesGateway(httpClientMock);

beforeEach(() => {
  vi.clearAllMocks();
});

describe("PipesGateway", () => {
  describe("getPipes", () => {
    it("should resolve with pipes data on successful response", async () => {
      httpClientMock.get.mockResolvedValueOnce(GATEWAY_GET_PIPES_SUCCESS_RESPONSE as HttpResponse);

      const response = await pipesGateway.getPipes();

      expect(httpClientMock.get).toHaveBeenCalledWith(apis.parameters.pipes);
      expect(response).toEqual(GATEWAY_GET_PIPES_SUCCESS_RESPONSE.data);
    });

    it("should reject with error message on failed response", async () => {
      httpClientMock.get.mockResolvedValue(getActionErrorMock);

      await expect(pipesGateway.getPipes()).rejects.toEqual(
        getActionErrorMock.error
      );
    });

  });

  describe("editPipe", () => {
    it("should resolve with success response on successful edit", async () => {
      httpClientMock.patch.mockResolvedValue(GATEWAY_PIPE_SUCCESS_RESPONSE as HttpResponse);

      const response = await pipesGateway.editPipe(editPipeParamsMock);

      expect(httpClientMock.patch).toHaveBeenCalledWith(
        `${apis.parameters.pipes}/${editPipeParamsMock.id}`,
        editPipeParamsMock.body
      );
      expect(response).toEqual(PIPES_RESPONSE);
    });

    it("should reject with error message on failed edit", async () => {
      httpClientMock.patch.mockResolvedValue(responseErrorEditMock);

      await expect(pipesGateway.editPipe(editPipeParamsMock)).rejects.toEqual(
        responseErrorEditMock.error
      );
    });

  });

  describe("savePipe", () => {
    it("should resolve with success response on successful save", async () => {
      httpClientMock.post.mockResolvedValue(GATEWAY_PIPE_SUCCESS_RESPONSE as HttpResponse);

      const response = await pipesGateway.savePipe(savePipeParamsMock);

      expect(httpClientMock.post).toHaveBeenCalledWith(
        `${apis.parameters.pipes}`,
        savePipeParamsMock.body
      );
      expect(response).toEqual(GATEWAY_PIPE_SUCCESS_RESPONSE.data);
    });

    it("should reject with error message on failed save", async () => {
      httpClientMock.post.mockResolvedValue(responseErrorEditMock);

      await expect(pipesGateway.savePipe(savePipeParamsMock)).rejects.toEqual(
        responseErrorEditMock.error
      );
    });
  });

  describe("deletePipe", () => {
    const deletePipeParamsMock = { id: GATEWAY_PIPE_SUCCESS_RESPONSE.data.id.toString() };

    it("should delete a pipe successfully", async () => {
      httpClientMock.delete.mockResolvedValueOnce(GATEWAY_PIPE_SUCCESS_RESPONSE as HttpResponse);
  
      const result = await pipesGateway.deletePipe(deletePipeParamsMock.id);
      expect(httpClientMock.delete).toHaveBeenCalledWith(`${apis.parameters.pipes}/${deletePipeParamsMock.id}`);
      expect(result).toEqual(GATEWAY_PIPE_SUCCESS_RESPONSE.data);
    });
  
    it("should handle errors when deleting a pipe", async () => {
      httpClientMock.delete.mockResolvedValueOnce(responseErrorEditMock);
  
      await expect(pipesGateway.deletePipe(deletePipeParamsMock.id)).rejects.toEqual(responseErrorEditMock.error);
      expect(httpClientMock.delete).toHaveBeenCalledWith(`${apis.parameters.pipes}/${deletePipeParamsMock.id}`);
    });
  });

});
