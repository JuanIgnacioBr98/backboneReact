import { HttpResponse } from '../../../../httpClient/interfaces';
import { IEditAgeParams } from '../entities/IPreFilterAge';

export interface IAgesGateway {
  getAges: () => Promise<HttpResponse>;
  editAge: (params: IEditAgeParams) => Promise<HttpResponse>;
}
