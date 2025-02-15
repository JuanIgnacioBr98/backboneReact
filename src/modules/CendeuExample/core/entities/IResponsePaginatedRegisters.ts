import { Register } from "./Register";

export interface IResponsePaginatedRegister {
  totalItems: number;
  registers: Register[];
  totalPages: number;
  currentPage: number;
}
