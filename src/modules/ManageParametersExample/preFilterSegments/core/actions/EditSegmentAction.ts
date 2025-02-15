import IPreFilterSegment from "../entities/IPreFilterSegment";
import { ISegmentsGateway } from "../gateways/ISegmentsGateway";

export interface IEditSegmentAction {
  execute: (body: Partial<IPreFilterSegment>, id: string) => Promise<any>;
}

export const EditSegmentAction = (segmentsGateway: ISegmentsGateway): IEditSegmentAction => {
  return {
    async execute(body,id) {
      try {
        const result = await segmentsGateway.editSegment({body, id });
        return Promise.resolve(result);
      } catch (err) {
        return Promise.reject(err);
      }
    },
  };
};
