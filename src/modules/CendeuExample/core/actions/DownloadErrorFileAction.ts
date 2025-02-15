import { ICendeuGateway } from "../gateways/ICendeuGateway";
import { ErrorsFileNameEnum } from "../../../../constants";

export interface IDownloadErrorFileAction {
    execute: (period: string, type: string) => Promise<void>;
}

export const DownloadErrorFileAction = (
    cendeuGateway: ICendeuGateway
): IDownloadErrorFileAction => {
    return {
        async execute(period, type) {
            try {
                const { base64, fileName } = await cendeuGateway.getErrorFile(
                    period,
                    type
                );

                const fileExtension = fileName.split(".").pop();
                const downloadFileName = `${ErrorsFileNameEnum.CENDEU}.${fileExtension}`;


                const byteCharacters = atob(base64);
                const byteNumbers = new Uint8Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }

                const fileBlob = new Blob([byteNumbers], { type: "application/octet-stream" });
                const link = document.createElement("a");
                link.href = URL.createObjectURL(fileBlob);
                link.download = downloadFileName;

                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(link.href);

                return Promise.resolve();
            } catch (err) {
                return Promise.reject(err);
            }
        },
    };
};
