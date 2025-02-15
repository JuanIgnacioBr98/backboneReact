import { describe, it, expect, vi, beforeEach } from "vitest";
import { IGetAgesAction } from "../../../../../../src/modules/ManageParameters/preFilterAge/core/actions/GetAgesAction";
import { IEditAgeAction } from "../../../../../../src/modules/ManageParameters/preFilterAge/core/actions/EditAgeAction";
import { IAgesScreens } from "../../../../../../src/modules/ManageParameters/preFilterAge/core/screens/IAgesScreens";
import { AgesPresenter } from "../../../../../../src/modules/ManageParameters/preFilterAge/infrastructure/presentation/AgesPresenter";

describe("AgesPresenter", () => {
  let getAges: IGetAgesAction;
  let editAge: IEditAgeAction;
  let agesScreen: IAgesScreens;
  let presenter: ReturnType<typeof AgesPresenter>;

  beforeEach(() => {
    getAges = { execute: vi.fn() };
    editAge = { execute: vi.fn() };
    agesScreen = {
      onGetAgesSuccess: vi.fn(),
      onGetAgesError: vi.fn(),
      onEditAgeSuccess: vi.fn(),
      onEditAgeError: vi.fn(),
    };

    presenter = AgesPresenter(getAges, editAge, agesScreen);
  });

  describe("getAges", () => {
    it("should call onGetAgesSuccess when getAges.execute succeeds", async () => {
      const mockAgesData = [{ id: "1", name: "Age 1" }];
      (getAges.execute as vi.Mock).mockResolvedValue(mockAgesData);

      await presenter.getAges();

      expect(agesScreen.onGetAgesSuccess).toHaveBeenCalledWith(mockAgesData);
      expect(agesScreen.onGetAgesError).not.toHaveBeenCalled();
    });

    it("should call onGetAgesError when getAges.execute fails", async () => {
      (getAges.execute as vi.Mock).mockRejectedValue(
        new Error("Failed to fetch ages")
      );

      await presenter.getAges();

      expect(agesScreen.onGetAgesError).toHaveBeenCalled();
      expect(agesScreen.onGetAgesSuccess).not.toHaveBeenCalled();
    });
  });

  describe("editAge", () => {
    it("should call onEditAgeSuccess when editAge.execute succeeds", async () => {
      const mockAgeData = { id: "1", name: "Updated Age" };
      (editAge.execute as vi.Mock).mockResolvedValue(mockAgeData);

      await presenter.editAge(mockAgeData, "1");

      expect(agesScreen.onEditAgeSuccess).toHaveBeenCalledWith(mockAgeData);
      expect(agesScreen.onEditAgeError).not.toHaveBeenCalled();
    });

    it("should call onEditAgeError when editAge.execute fails", async () => {
      (editAge.execute as vi.Mock).mockRejectedValue(
        new Error("Failed to edit age")
      );

      await presenter.editAge({}, "1");

      expect(agesScreen.onEditAgeError).toHaveBeenCalled();
      expect(agesScreen.onEditAgeSuccess).not.toHaveBeenCalled();
    });
  });
});
