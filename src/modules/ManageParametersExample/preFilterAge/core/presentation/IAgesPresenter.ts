import IPreFilterAge from '../entities/IPreFilterAge';

export interface IAgesPresenter {
  getAges: () => any;
  editAge: (  body: Partial<IPreFilterAge>, id: string) => any;
}
