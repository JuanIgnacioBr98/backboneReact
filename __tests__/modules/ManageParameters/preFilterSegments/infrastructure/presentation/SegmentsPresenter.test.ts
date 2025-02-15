import { describe, it, expect, vi, beforeEach } from "vitest";
import { IGetSegmentsAction } from "../../../../../../src/modules/ManageParameters/preFilterSegments/core/actions/GetSegmentsAction";
import { IEditSegmentAction } from "../../../../../../src/modules/ManageParameters/preFilterSegments/core/actions/EditSegmentAction";
import { ISegmentsScreens } from "../../../../../../src/modules/ManageParameters/preFilterSegments/core/screens/ISegmentsScreens";
import { SegmentsPresenter } from "../../../../../../src/modules/ManageParameters/preFilterSegments/infrastructure/presentation/SegmentsPresenter";
import { mockSegmentsData } from "../../../mocks";

describe("SegmentsPresenter", () => {
  let getSegments: IGetSegmentsAction;
  let editSegment: IEditSegmentAction;
  let segmentsScreen: ISegmentsScreens;
  let presenter: ReturnType<typeof SegmentsPresenter>;

  beforeEach(() => {
    getSegments = { execute: vi.fn() };
    editSegment = { execute: vi.fn() };
    segmentsScreen = {
      onGetSegmentsSuccess: vi.fn(),
      onGetSegmentsError: vi.fn(),
      onEditSegmentSuccess: vi.fn(),
      onEditSegmentError: vi.fn(),
    };

    presenter = SegmentsPresenter(getSegments, editSegment, segmentsScreen);
  });

  describe("getSegments", () => {
    it("should call onGetSegmentsSuccess when getSegments.execute succeeds", async () => {
      (getSegments.execute as vi.Mock).mockResolvedValue(mockSegmentsData);

      await presenter.getSegments();

      expect(segmentsScreen.onGetSegmentsSuccess).toHaveBeenCalledWith(mockSegmentsData);
      expect(segmentsScreen.onGetSegmentsError).not.toHaveBeenCalled();
    });

    it("should call onGetSegmentsError when getSegments.execute fails", async () => {
      (getSegments.execute as vi.Mock).mockRejectedValue(
        new Error("Failed to fetch segments")
      );

      await presenter.getSegments();

      expect(segmentsScreen.onGetSegmentsError).toHaveBeenCalled();
      expect(segmentsScreen.onGetSegmentsSuccess).not.toHaveBeenCalled();
    });
  });

  describe("editSegment", () => {
    it("should call onEditSegmentSuccess when editSegment.execute succeeds", async () => {
      const mockSegmentData = { id: "1", name: "Updated Segment" };
      (editSegment.execute as vi.Mock).mockResolvedValue(mockSegmentData);

      await presenter.editSegment(mockSegmentData, "1");

      expect(segmentsScreen.onEditSegmentSuccess).toHaveBeenCalledWith(mockSegmentData);
      expect(segmentsScreen.onEditSegmentError).not.toHaveBeenCalled();
    });

    it("should call onEditSegmentError when editSegment.execute fails", async () => {
      (editSegment.execute as vi.Mock).mockRejectedValue(
        new Error("Failed to edit segment")
      );

      await presenter.editSegment({}, "1");

      expect(segmentsScreen.onEditSegmentError).toHaveBeenCalled();
      expect(segmentsScreen.onEditSegmentSuccess).not.toHaveBeenCalled();
    });
  });
});
