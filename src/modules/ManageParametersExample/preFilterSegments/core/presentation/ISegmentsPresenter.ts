import IPreFilterSegment from "../entities/IPreFilterSegment";

export interface ISegmentsPresenter {
  getSegments: () => any;
  editSegment: (  body: Partial<IPreFilterSegment>, id: string) => any;
}
