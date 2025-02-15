import IPreFilterPipe from "../entities/IPreFilterPipe";
import { IPipesGateway } from '../gateways/IPipesGateway';

export interface ISavePipeAction {
  execute: (body: Partial<IPreFilterPipe>) => Promise<IPreFilterPipe>;
}

export const SavePipeAction = (pipesGateway: IPipesGateway): ISavePipeAction => {
  return {
    async execute(body) {
      try {
        const result = await pipesGateway.savePipe({body});
        return Promise.resolve(result);
      } catch (err) {
        return Promise.reject(err);
      }
    },
  };
};
