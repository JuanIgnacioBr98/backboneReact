import { describe, it, expect, vi, beforeEach } from "vitest";
import { IGetAgreementsAction } from "../../../../../../src/modules/ManageParameters/preFilterAgreement/core/actions/GetAgreementsAction";
import { IEditAgreementAction } from "../../../../../../src/modules/ManageParameters/preFilterAgreement/core/actions/EditAgreementAction";
import { IAgreementsScreens } from "../../../../../../src/modules/ManageParameters/preFilterAgreement/core/screens/IAgreementsScreens";
import { AgreementsPresenter } from "../../../../../../src/modules/ManageParameters/preFilterAgreement/infrastructure/presentation/AgreementsPresenter";
import { ISaveAgreementAction } from "../../../../../../src/modules/ManageParameters/preFilterAgreement/core/actions/SaveAgreementAction";
import { IDeleteAgreementAction } from "../../../../../../src/modules/ManageParameters/preFilterAgreement/core/actions/DeleteAgreementAction";
import { saveBodyMock } from "../../../mocks";
import { IGetTypeOfAgreementsAction } from "../../../../../../src/modules/ManageParameters/preFilterAgreement/core/actions/GetTypeOfAgreementsAction";

describe("AgreementsPresenter", () => {
  let getAgreements: IGetAgreementsAction;
  let editAgreement: IEditAgreementAction;
  let saveAgreement: ISaveAgreementAction;
  let deleteAgreement: IDeleteAgreementAction;
  let getTypeOfAgreement: IGetTypeOfAgreementsAction;
  let agreementsScreen: IAgreementsScreens;
  let presenter: ReturnType<typeof AgreementsPresenter>;

  beforeEach(() => {
    getAgreements = { execute: vi.fn() };
    editAgreement = { execute: vi.fn() };
    saveAgreement = { execute: vi.fn() };
    deleteAgreement = { execute: vi.fn() };
    getTypeOfAgreement= { execute: vi.fn() }
    agreementsScreen = {
      onGetAgreementsSuccess: vi.fn(),
      onGetAgreementsError: vi.fn(),
      onEditAgreementSuccess: vi.fn(),
      onEditAgreementError: vi.fn(),
      onSaveAgreementSuccess: vi.fn(),
      onSaveAgreementError: vi.fn(),
      onDeleteAgreementSuccess: vi.fn(),
      onDeleteAgreementError: vi.fn(),
      onGetTypeOfAgreementsSuccess: vi.fn(),
      onGetTypeOfAgreementsError: vi.fn(),
    };

    presenter = AgreementsPresenter(getAgreements, editAgreement, saveAgreement, deleteAgreement, getTypeOfAgreement, agreementsScreen);
  });

  describe("getAgreements", () => {
    it("should call onGetAgreementsSuccess when getAgreements.execute succeeds", async () => {
      const mockAgreementsData = [{ id: "1", name: "Agreement 1" }];
      (getAgreements.execute as vi.Mock).mockResolvedValue(mockAgreementsData);

      await presenter.getAgreements();

      expect(agreementsScreen.onGetAgreementsSuccess).toHaveBeenCalledWith(mockAgreementsData);
      expect(agreementsScreen.onGetAgreementsError).not.toHaveBeenCalled();
    });

    it("should call onGetAgreementsError when getAgreements.execute fails", async () => {
      (getAgreements.execute as vi.Mock).mockRejectedValue(
        new Error("Failed to fetch agreements")
      );

      await presenter.getAgreements();

      expect(agreementsScreen.onGetAgreementsError).toHaveBeenCalled();
      expect(agreementsScreen.onGetAgreementsSuccess).not.toHaveBeenCalled();
    });
  });

  describe("editAgreement", () => {
    it("should call onEditAgreementSuccess when editAgreement.execute succeeds", async () => {
      const mockAgreementData = { id: "1", name: "Updated Agreement" };
      (editAgreement.execute as vi.Mock).mockResolvedValue(mockAgreementData);

      await presenter.editAgreement(mockAgreementData, "1");

      expect(agreementsScreen.onEditAgreementSuccess).toHaveBeenCalledWith(mockAgreementData);
      expect(agreementsScreen.onEditAgreementError).not.toHaveBeenCalled();
    });

    it("should call onEditAgreementError when editAgreement.execute fails", async () => {
      (editAgreement.execute as vi.Mock).mockRejectedValue(
        new Error("Failed to edit agreement")
      );

      await presenter.editAgreement({}, "1");

      expect(agreementsScreen.onEditAgreementError).toHaveBeenCalled();
      expect(agreementsScreen.onEditAgreementSuccess).not.toHaveBeenCalled();
    });
  });

  describe("saveAgreement", () => {
    it("should call onSaveAgreementSuccess when saveAgreement.execute succeeds", async () => {
      (saveAgreement.execute as vi.Mock).mockResolvedValue(saveBodyMock);

      await presenter.saveAgreement(saveBodyMock);

      expect(agreementsScreen.onSaveAgreementSuccess).toHaveBeenCalledWith(saveBodyMock);
      expect(agreementsScreen.onSaveAgreementError).not.toHaveBeenCalled();
    });

    it("should call onSaveAgreementError when saveAgreement.execute fails", async () => {
      (saveAgreement.execute as vi.Mock).mockRejectedValue(
        new Error("Failed to save agreement")
      );

      await presenter.saveAgreement({});

      expect(agreementsScreen.onSaveAgreementError).toHaveBeenCalled();
      expect(agreementsScreen.onSaveAgreementSuccess).not.toHaveBeenCalled();
    });
  });

  describe("deleteAgreement", () => {
    it("should call onDeleteAgreementSuccess when deleteAgreement.execute succeeds", async () => {
      const mockAgreementId = "2";
      (deleteAgreement.execute as vi.Mock).mockResolvedValue(mockAgreementId);

      await presenter.deleteAgreement(mockAgreementId);

      expect(agreementsScreen.onDeleteAgreementSuccess).toHaveBeenCalledWith(mockAgreementId);
      expect(agreementsScreen.onDeleteAgreementError).not.toHaveBeenCalled();
    });

    it("should call onDeleteAgreementError when deleteAgreement.execute fails", async () => {
      (deleteAgreement.execute as vi.Mock).mockRejectedValue(
        new Error("Failed to delete agreement")
      );

      await presenter.deleteAgreement("");

      expect(agreementsScreen.onDeleteAgreementError).toHaveBeenCalled();
      expect(agreementsScreen.onDeleteAgreementSuccess).not.toHaveBeenCalled();
    });
  });

  describe("getTypeOfAgreement", () => {
    it("should call onGetTypeOfAgreementsSuccess when getTypeOfAgreement.execute succeeds", async () => {
      const mockAgreementsData = [{ id: "1", name: "Agreement 1" }];
      (getTypeOfAgreement.execute as vi.Mock).mockResolvedValue(mockAgreementsData);

      await presenter.getTypeOfAgreements();

      expect(agreementsScreen.onGetTypeOfAgreementsSuccess).toHaveBeenCalledWith(mockAgreementsData);
      expect(agreementsScreen.onGetTypeOfAgreementsError).not.toHaveBeenCalled();
    });

    it("should call onGetTypeOfAgreementsError when getTypeOfAgreement.execute fails", async () => {
      (getTypeOfAgreement.execute as vi.Mock).mockRejectedValue(
        new Error("Failed to fetch agreements")
      );

      await presenter.getTypeOfAgreements();

      expect(agreementsScreen.onGetTypeOfAgreementsError).toHaveBeenCalled();
      expect(agreementsScreen.onGetTypeOfAgreementsSuccess).not.toHaveBeenCalled();
    });
  });
});
