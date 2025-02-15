import IPreFilterPipe from "../entities/IPreFilterPipe";
import { IPipesGateway } from "../gateways/IPipesGateway";

export interface IDeletePipeAction {
  execute: (id: string) => Promise<IPreFilterPipe>;
}

export const DeletePipeAction = (pipesGateway: IPipesGateway): IDeletePipeAction => {
  return {
    async execute(id) {
      try {
        const result = await pipesGateway.deletePipe(id);
        return Promise.resolve(result);
      } catch (err) {
        return Promise.reject(err);
      }
    },
  };
};
