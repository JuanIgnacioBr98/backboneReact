import IPreFilterSegment from "../entities/IPreFilterSegment";

export interface ISegmentsScreens {
  onGetSegmentsSuccess: (value: IPreFilterSegment[]) => void;
  onGetSegmentsError: (error: string) => void;

  onEditSegmentSuccess: (value: IPreFilterSegment) => void;
  onEditSegmentError: (error: string) => void;
}
