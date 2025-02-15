import { ISegmentsGateway } from "../gateways/ISegmentsGateway";

export interface IGetSegmentsAction {
  execute: () => Promise<any>;
}

export const GetSegmentsAction = (
  segmentsGateway: ISegmentsGateway
): IGetSegmentsAction => {
  return {
    async execute() {
      try {
        const result = await segmentsGateway.getSegments();        
        return Promise.resolve(result);
      } catch (err) {
        return Promise.reject(err);
      }
    },
  };
};
