import { describe, beforeEach, expect, test, vi } from "vitest";
import {
    leadsGatewayMock,
    mockDocument,
    mockErrorFileResponse,
    mockFileInputs,
} from "../../mocks";
import {
    DownloadErrorFileAction,
    IDownloadErrorFileAction,
} from "../../../../../src/modules/Leads/core/actions/DownloadErrorFileAction";

describe("DownloadErrorFileAction", () => {
    let downloadErrorFileAction: IDownloadErrorFileAction;

    beforeEach(() => {
        downloadErrorFileAction = DownloadErrorFileAction(leadsGatewayMock);
        mockDocument();
    });

    test("calls LeadsGateway when DownloadErrorFileAction is executed", async () => {
        leadsGatewayMock.getErrorFile.mockResolvedValue(mockErrorFileResponse);

        await downloadErrorFileAction.execute(
            mockFileInputs.period,
            mockFileInputs.type
        );

        expect(leadsGatewayMock.getErrorFile).toHaveBeenCalledWith(
            mockFileInputs.period,
            mockFileInputs.type
        );
    });

    test("throws an error when the gateway call fails", async () => {
        const error = new Error("Failed to fetch error file");
        leadsGatewayMock.getErrorFile.mockRejectedValue(error);

        await expect(
            downloadErrorFileAction.execute(mockFileInputs.period, mockFileInputs.type)
        ).rejects.toThrow(error);
    });
});
