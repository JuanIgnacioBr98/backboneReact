import { IPipesGateway } from '../gateways/IPipesGateway';

export interface IGetPipesAction {
  execute: () => Promise<any>;
}

export const GetPipesAction = (
  pipesGateway: IPipesGateway
): IGetPipesAction => {
  return {
    async execute() {
      try {
        const result = await pipesGateway.getPipes();
        return Promise.resolve(result);
      } catch (err) {
        return Promise.reject(err);
      }
    },
  };
};
