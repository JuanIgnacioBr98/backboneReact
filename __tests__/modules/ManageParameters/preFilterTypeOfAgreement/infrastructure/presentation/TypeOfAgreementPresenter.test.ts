import { describe, it, expect, vi, afterEach } from "vitest";
import { TypeOfAgreementPresenter } from "../../../../../../src/modules/ManageParameters/preFilterTypeOfAgreement/infrastructure/presentation/TypeOfAgreementPresenter";

describe("TypeOfAgreementPresenter", () => {
    const mockGetTypeOfAgreements = { execute: vi.fn() };
    const mockEditTypeOfAgreement = { execute: vi.fn() };
    const mockSaveTypeOfAgreement = { execute: vi.fn() };
    const mockDeleteTypeOfAgreement = { execute: vi.fn() };

    const mockTypeOfAgreementsScreen = {
        onGetTypeOfAgreementSuccess: vi.fn(),
        onGetTypeOfAgreementError: vi.fn(),
        onEditTypeOfAgreementSuccess: vi.fn(),
        onEditTypeOfAgreementError: vi.fn(),
        onSaveTypeOfAgreementSuccess: vi.fn(),
        onSaveTypeOfAgreementError: vi.fn(),
        onDeleteTypeOfAgreementSuccess: vi.fn(),
        onDeleteTypeOfAgreementError: vi.fn(),
    };

    const presenter = TypeOfAgreementPresenter(
        mockGetTypeOfAgreements,
        mockTypeOfAgreementsScreen,
        mockEditTypeOfAgreement,
        mockSaveTypeOfAgreement,
        mockDeleteTypeOfAgreement
    );

    afterEach(() => {
        vi.clearAllMocks();
    });

    it("calls onGetTypeOfAgreementSuccess on successful getTypeOfAgreements execution", async () => {
        const mockResponse = [{ id: 1, name: "Tipo de convenio 1" }];
        mockGetTypeOfAgreements.execute.mockResolvedValue(mockResponse);

        await presenter.getTypeOfAgreements();

        expect(mockGetTypeOfAgreements.execute).toHaveBeenCalledOnce();
        expect(mockTypeOfAgreementsScreen.onGetTypeOfAgreementSuccess).toHaveBeenCalledWith(mockResponse);
        expect(mockTypeOfAgreementsScreen.onGetTypeOfAgreementError).not.toHaveBeenCalled();
    });

    it("calls onGetTypeOfAgreementError on failed getTypeOfAgreements execution", async () => {
        const mockError = new Error("No se pudo obtener los tipos de convenio");
        mockGetTypeOfAgreements.execute.mockRejectedValue(mockError);

        await presenter.getTypeOfAgreements();

        expect(mockGetTypeOfAgreements.execute).toHaveBeenCalledOnce();
        expect(mockTypeOfAgreementsScreen.onGetTypeOfAgreementError).toHaveBeenCalledWith(mockError);
        expect(mockTypeOfAgreementsScreen.onGetTypeOfAgreementSuccess).not.toHaveBeenCalled();
    });

    it("calls onEditTypeOfAgreementSuccess on successful editTypeOfAgreement execution", async () => {
        const mockResponse = { id: 1, name: "Tipo de convenio actualizado" };
        const mockBody = { name: "Tipo de convenio actualizado" };
        const mockId = "1";
        mockEditTypeOfAgreement.execute.mockResolvedValue(mockResponse);

        await presenter.editTypeOfAgreement(mockBody, mockId);

        expect(mockEditTypeOfAgreement.execute).toHaveBeenCalledWith(mockBody, mockId);
        expect(mockTypeOfAgreementsScreen.onEditTypeOfAgreementSuccess).toHaveBeenCalledWith(mockResponse);
        expect(mockTypeOfAgreementsScreen.onEditTypeOfAgreementError).not.toHaveBeenCalled();
    });

    it("calls onEditTypeOfAgreementError on failed editTypeOfAgreement execution", async () => {
        const mockError = new Error("Falló la actualización del tipo de convenio");
        const mockBody = { name: "Tipo de convenio actualizado" };
        const mockId = "1";
        mockEditTypeOfAgreement.execute.mockRejectedValue(mockError);

        await presenter.editTypeOfAgreement(mockBody, mockId);

        expect(mockEditTypeOfAgreement.execute).toHaveBeenCalledWith(mockBody, mockId);
        expect(mockTypeOfAgreementsScreen.onEditTypeOfAgreementError).toHaveBeenCalledWith(mockError);
        expect(mockTypeOfAgreementsScreen.onEditTypeOfAgreementSuccess).not.toHaveBeenCalled();
    });

    it("calls onSaveTypeOfAgreementSuccess on successful saveTypeOfAgreement execution", async () => {
        const mockResponse = { id: 2, name: "Nuevo tipo de convenio" };
        const mockParams = { name: "Nuevo tipo de convenio" };
        mockSaveTypeOfAgreement.execute.mockResolvedValue(mockResponse);

        await presenter.saveTypeOfAgreement(mockParams);

        expect(mockSaveTypeOfAgreement.execute).toHaveBeenCalledWith(mockParams);
        expect(mockTypeOfAgreementsScreen.onSaveTypeOfAgreementSuccess).toHaveBeenCalledWith(mockResponse);
        expect(mockTypeOfAgreementsScreen.onSaveTypeOfAgreementError).not.toHaveBeenCalled();
    });

    it("calls onSaveTypeOfAgreementError on failed saveTypeOfAgreement execution", async () => {
        const mockError = new Error("No se pudo guardar el tipo de convenio");
        const mockParams = { name: "Nuevo tipo de convenio" };
        mockSaveTypeOfAgreement.execute.mockRejectedValue(mockError);

        await presenter.saveTypeOfAgreement(mockParams);

        expect(mockSaveTypeOfAgreement.execute).toHaveBeenCalledWith(mockParams);
        expect(mockTypeOfAgreementsScreen.onSaveTypeOfAgreementError).toHaveBeenCalledWith(mockError);
        expect(mockTypeOfAgreementsScreen.onSaveTypeOfAgreementSuccess).not.toHaveBeenCalled();
    });

    it("calls onDeleteTypeOfAgreementSuccess on successful deleteTypeOfAgreement execution", async () => {
        const mockResponse = { message: "Eliminado con éxito" };
        const mockId = "1";
        mockDeleteTypeOfAgreement.execute.mockResolvedValue(mockResponse);

        await presenter.deleteTypeOfAgreement(mockId);

        expect(mockDeleteTypeOfAgreement.execute).toHaveBeenCalledWith(mockId);
        expect(mockTypeOfAgreementsScreen.onDeleteTypeOfAgreementSuccess).toHaveBeenCalledWith(mockResponse);
        expect(mockTypeOfAgreementsScreen.onDeleteTypeOfAgreementError).not.toHaveBeenCalled();
    });

    it("calls onDeleteTypeOfAgreementError on failed deleteTypeOfAgreement execution", async () => {
        const mockError = new Error("No se pudo eliminar el tipo de convenio");
        const mockId = "1";
        mockDeleteTypeOfAgreement.execute.mockRejectedValue(mockError);

        await presenter.deleteTypeOfAgreement(mockId);

        expect(mockDeleteTypeOfAgreement.execute).toHaveBeenCalledWith(mockId);
        expect(mockTypeOfAgreementsScreen.onDeleteTypeOfAgreementError).toHaveBeenCalledWith(mockError);
        expect(mockTypeOfAgreementsScreen.onDeleteTypeOfAgreementSuccess).not.toHaveBeenCalled();
    });
});
