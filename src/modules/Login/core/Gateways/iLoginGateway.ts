import { HttpResponse } from "../../../httpClient/interfaces";
import { ILogin } from "../entities/ILogin";

export interface ILoginGateway {
  onLogin: (values: any) => Promise<boolean>;
}
