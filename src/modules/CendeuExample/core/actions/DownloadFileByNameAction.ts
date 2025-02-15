import { ICendeuGateway } from "../gateways/ICendeuGateway";

export interface IDownloadFileByNameAction {
  execute: (fileName: string) => Promise<void>;
}

export const DownloadFileByNameAction = (cendeuGateway: ICendeuGateway): IDownloadFileByNameAction => {
  return {
    async execute(fileNameToDownload) {
      try {
        const { base64, fileName } = await cendeuGateway.getFileData(fileNameToDownload);

        const byteCharacters = atob(base64);
        const byteNumbers = new Uint8Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const fileBlob = new Blob([byteNumbers], { type: "application/octet-stream" });

        const link = document.createElement("a");
        link.href = URL.createObjectURL(fileBlob);
        link.download = fileName;
        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);

        return Promise.resolve();
      } catch (_) {
        return Promise.reject();
      }
    },
  };
};
