import { describe, it, expect, vi, beforeEach } from "vitest";
import { ISegmentsGateway } from "../../../../../../src/modules/ManageParameters/preFilterSegments/core/gateways/ISegmentsGateway";
import { GetSegmentsAction, IGetSegmentsAction } from "../../../../../../src/modules/ManageParameters/preFilterSegments/core/actions/GetSegmentsAction";
import { getSegmentActionErrorMock, mockGetSegmentResponse } from "../../../mocks";

describe("GetSegmentsAction", () => {
  let segmentsGateway: ISegmentsGateway;
  let getSegmentsAction: IGetSegmentsAction;

  beforeEach(() => {
    segmentsGateway = {
      getSegments: vi.fn(),
      editSegment: vi.fn()
    };

    getSegmentsAction = GetSegmentsAction(segmentsGateway);
  });

  it("should resolve with segments data when getSegments succeeds", async () => {
    (segmentsGateway.getSegments as vi.Mock).mockResolvedValue(mockGetSegmentResponse);

    await expect(getSegmentsAction.execute()).resolves.toEqual(mockGetSegmentResponse);
  });

  it("should reject with an error when getSegments fails", async () => {
    (segmentsGateway.getSegments as vi.Mock).mockRejectedValue(getSegmentActionErrorMock.error);

    await expect(getSegmentsAction.execute()).rejects.toThrow(
      "Failed to fetch segments"
    );
  });
});
