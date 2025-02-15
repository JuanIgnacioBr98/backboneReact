import { describe, it, expect, vi, beforeEach } from "vitest";
import { IGetPipesAction } from "../../../../../../src/modules/ManageParameters/preFilterPipes/core/actions/GetPipesAction";
import { IEditPipeAction } from "../../../../../../src/modules/ManageParameters/preFilterPipes/core/actions/EditPipeAction";
import { IPipesScreens } from "../../../../../../src/modules/ManageParameters/preFilterPipes/core/screens/IPipesScreens";
import { PipesPresenter } from "../../../../../../src/modules/ManageParameters/preFilterPipes/infrastructure/presentation/PipesPresenter";
import { ISavePipeAction } from "../../../../../../src/modules/ManageParameters/preFilterPipes/core/actions/SavePipeAction";
import { IDeletePipeAction } from "../../../../../../src/modules/ManageParameters/preFilterPipes/core/actions/DeletePipeAction";

describe("PipesPresenter", () => {
  let getPipes: IGetPipesAction;
  let editPipe: IEditPipeAction;
  let savePipe: ISavePipeAction;
  let deletePipe: IDeletePipeAction;
  let pipesScreen: IPipesScreens;
  let presenter: ReturnType<typeof PipesPresenter>;

  beforeEach(() => {
    getPipes = { execute: vi.fn() };
    editPipe = { execute: vi.fn() };
    savePipe = { execute: vi.fn() };
    deletePipe = { execute: vi.fn() };
    pipesScreen = {
      onGetPipesSuccess: vi.fn(),
      onGetPipesError: vi.fn(),
      onEditPipeSuccess: vi.fn(),
      onEditPipeError: vi.fn(),
      onSavePipeSuccess: vi.fn(),
      onSavePipeError: vi.fn(),
      onDeletePipeSuccess: vi.fn(),
      onDeletePipeError: vi.fn(),
    };

    presenter = PipesPresenter(getPipes, editPipe, savePipe, deletePipe, pipesScreen);
  });

  describe("getPipes", () => {
    it("should call onGetPipesSuccess when getPipes.execute succeeds", async () => {
      const mockPipesData = [{ id: "1", name: "Pipe 1" }];
      (getPipes.execute as vi.Mock).mockResolvedValue(mockPipesData);

      await presenter.getPipes();

      expect(pipesScreen.onGetPipesSuccess).toHaveBeenCalledWith(mockPipesData);
      expect(pipesScreen.onGetPipesError).not.toHaveBeenCalled();
    });

    it("should call onGetPipesError when getPipes.execute fails", async () => {
      (getPipes.execute as vi.Mock).mockRejectedValue(
        new Error("Failed to fetch pipes")
      );

      await presenter.getPipes();

      expect(pipesScreen.onGetPipesError).toHaveBeenCalled();
      expect(pipesScreen.onGetPipesSuccess).not.toHaveBeenCalled();
    });
  });

  describe("editPipe", () => {
    it("should call onEditPipeSuccess when editPipe.execute succeeds", async () => {
      const mockPipeData = { id: "1", name: "Updated Pipe" };
      (editPipe.execute as vi.Mock).mockResolvedValue(mockPipeData);

      await presenter.editPipe(mockPipeData, "1");

      expect(pipesScreen.onEditPipeSuccess).toHaveBeenCalledWith(mockPipeData);
      expect(pipesScreen.onEditPipeError).not.toHaveBeenCalled();
    });

    it("should call onEditPipeError when editPipe.execute fails", async () => {
      (editPipe.execute as vi.Mock).mockRejectedValue(
        new Error("Failed to edit pipe")
      );

      await presenter.editPipe({}, "1");

      expect(pipesScreen.onEditPipeError).toHaveBeenCalled();
      expect(pipesScreen.onEditPipeSuccess).not.toHaveBeenCalled();
    });
  });

  describe("savePipe", () => {
    it("should call onSavePipeSuccess when savePipe.execute succeeds", async () => {
      const mockPipeData = { id: "1", name: "Updated Pipe" };
      (savePipe.execute as vi.Mock).mockResolvedValue(mockPipeData);

      await presenter.savePipe(mockPipeData);

      expect(pipesScreen.onSavePipeSuccess).toHaveBeenCalledWith(mockPipeData);
      expect(pipesScreen.onSavePipeError).not.toHaveBeenCalled();
    });

    it("should call onSavePipeError when savePipe.execute fails", async () => {
      (savePipe.execute as vi.Mock).mockRejectedValue(
        new Error("Failed to save pipe")
      );

      await presenter.savePipe({});

      expect(pipesScreen.onSavePipeError).toHaveBeenCalled();
      expect(pipesScreen.onSavePipeSuccess).not.toHaveBeenCalled();
    });
  });

  describe("deletePipe", () => {
    it("should call onDeletePipeSuccess when deletePipe.execute succeeds", async () => {
      const mockPipeData = { id: "1", name: "Updated Pipe" };
      (deletePipe.execute as vi.Mock).mockResolvedValue(mockPipeData);

      await presenter.deletePipe("1");

      expect(pipesScreen.onDeletePipeSuccess).toHaveBeenCalledWith(mockPipeData);
      expect(pipesScreen.onDeletePipeError).not.toHaveBeenCalled();
    });

    it("should call onDeletePipeError when deletePipe.execute fails", async () => {
      (deletePipe.execute as vi.Mock).mockRejectedValue(
        new Error("Failed to delete pipe")
      );

      await presenter.deletePipe("");

      expect(pipesScreen.onDeletePipeError).toHaveBeenCalled();
      expect(pipesScreen.onDeletePipeSuccess).not.toHaveBeenCalled();
    });
  });
});
