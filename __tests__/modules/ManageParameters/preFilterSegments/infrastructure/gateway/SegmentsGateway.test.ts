import { describe, it, expect, vi } from "vitest";
import { IHttpClient } from "../../../../../../src/modules/httpClient/interfaces";
import { SegmentsGateway } from '../../../../../../src/modules/ManageParameters/preFilterSegments/infrastructure/gateways/SegmentsGateway';
import { editSegmentParamsMock, expectedTransformedSegmentData, getSegmentActionErrorMock, mockGetSegmentResponse, responseErrorEditSegmentMock, responseSuccesfullEditSegmentMock } from '../../../mocks';
import { apis } from "../../../../../../src/constants/api";

const mockHttpClient: IHttpClient = {
  get: vi.fn(),
  patch: vi.fn(),
  post: vi.fn(),
  delete: vi.fn(),
  put: vi.fn()
};

describe("SegmentsGateway", () => {
  const segmentsGateway = SegmentsGateway(mockHttpClient);

  describe("getSegments", () => {
    it("should resolve with transformed segments data on successful response", async () => {

      mockHttpClient.get.mockResolvedValue(mockGetSegmentResponse);

      const response = await segmentsGateway.getSegments();

      expect(mockHttpClient.get).toHaveBeenCalledWith(apis.parameters.segments);
      expect(response).toEqual(expectedTransformedSegmentData);
    });

    it("should reject with error message on failed response", async () => {
      mockHttpClient.get.mockResolvedValue(getSegmentActionErrorMock);

      await expect(segmentsGateway.getSegments()).rejects.toEqual(
        getSegmentActionErrorMock.error
      );
    });
  });

  describe("editSegment", () => {
    it("should resolve with success response on successful edit", async () => {
      const requestBody = {
        days_late_tc: editSegmentParamsMock.body.overdueDaysTC,
        days_late_pp: editSegmentParamsMock.body.overdueDaysPP,
        global_max_amount: editSegmentParamsMock.body.globalMaxAmount,
        max_transaction_amount: editSegmentParamsMock.body.maxTransactionAmount,
        affectation: editSegmentParamsMock.body.affectation,
        global_indebtedness: editSegmentParamsMock.body.globalIndebtedness,
      };

      mockHttpClient.patch.mockResolvedValue(responseSuccesfullEditSegmentMock);

      const response = await segmentsGateway.editSegment(editSegmentParamsMock);

      expect(mockHttpClient.patch).toHaveBeenCalledWith(
        `${apis.parameters.segments}/${editSegmentParamsMock.id}`,
        requestBody
      );
      expect(response).toEqual(responseSuccesfullEditSegmentMock.data);
    });

    it("should reject with error message on failed edit", async () => {
      mockHttpClient.patch.mockResolvedValue(responseErrorEditSegmentMock);

      await expect(segmentsGateway.editSegment(editSegmentParamsMock)).rejects.toEqual(
        responseErrorEditSegmentMock.error
      );
    });

  });
});
