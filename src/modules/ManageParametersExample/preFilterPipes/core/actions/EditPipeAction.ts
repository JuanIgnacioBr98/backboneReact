import IPreFilterPipe from '../entities/IPreFilterPipe';
import { IPipesGateway } from '../gateways/IPipesGateway';

export interface IEditPipeAction {
  execute: (body: Partial<IPreFilterPipe>, id: string) => Promise<any>;
}

export const EditPipeAction = (pipesGateway: IPipesGateway): IEditPipeAction => {
  return {
    async execute(body,id) {
      try {
        const result = await pipesGateway.editPipe({body, id });
        return Promise.resolve(result);
      } catch (err) {
        return Promise.reject(err);
      }
    },
  };
};
