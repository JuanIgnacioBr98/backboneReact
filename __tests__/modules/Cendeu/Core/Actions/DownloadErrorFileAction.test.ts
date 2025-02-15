import { describe, beforeEach, expect, test, vi } from "vitest";
import {
    cendeuGatewayMock,
    mockDocument,
    mockErrorFileResponse,
    mockFileInputs,
} from "../../mocks";
import {
    DownloadErrorFileAction,
    IDownloadErrorFileAction,
} from "../../../../../src/modules/Cendeu/core/actions/DownloadErrorFileAction";

describe("DownloadErrorFileAction", () => {
    let downloadErrorFileAction: IDownloadErrorFileAction;

    beforeEach(() => {
        downloadErrorFileAction = DownloadErrorFileAction(cendeuGatewayMock);
        mockDocument();
    });

    test("calls CendeuGateway when DownloadErrorFileAction is executed", async () => {
        cendeuGatewayMock.getErrorFile.mockResolvedValue(mockErrorFileResponse);

        await downloadErrorFileAction.execute(
            mockFileInputs.period,
            mockFileInputs.type
        );

        expect(cendeuGatewayMock.getErrorFile).toHaveBeenCalledWith(
            mockFileInputs.period,
            mockFileInputs.type
        );
    });

    test("throws an error when the gateway call fails", async () => {
        const error = new Error("Failed to fetch error file");
        cendeuGatewayMock.getErrorFile.mockRejectedValue(error);

        await expect(
            downloadErrorFileAction.execute(mockFileInputs.period, mockFileInputs.type)
        ).rejects.toThrow(error);
    });
});
