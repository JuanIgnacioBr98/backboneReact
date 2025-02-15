import { IEditSegmentAction } from "../../core/actions/EditSegmentAction";
import { IGetSegmentsAction } from "../../core/actions/GetSegmentsAction";
import { ISegmentsPresenter } from "../../core/presentation/ISegmentsPresenter";
import { ISegmentsScreens } from "../../core/screens/ISegmentsScreens";

export const SegmentsPresenter = (
  getSegments: IGetSegmentsAction,
  editSegment: IEditSegmentAction,
  segmentsScreen: ISegmentsScreens
): ISegmentsPresenter => {
  return {
    async getSegments() {
      try {
        const res = await getSegments.execute();
        segmentsScreen.onGetSegmentsSuccess(res);
      } catch (error) {
        segmentsScreen.onGetSegmentsError(error);
      }
    },

    async editSegment(body: object, id: string) {
      try {
        const res = await editSegment.execute(body, id);
        segmentsScreen.onEditSegmentSuccess(res);
      } catch (error) {
        segmentsScreen.onEditSegmentError(error);
      }
    },
  };
};
