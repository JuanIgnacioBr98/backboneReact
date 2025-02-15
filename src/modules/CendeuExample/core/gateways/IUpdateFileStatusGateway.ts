export interface IUpdateFileStatusGateway {
  updateStatus: (fileName: string, status: boolean) => Promise<boolean>;
}
