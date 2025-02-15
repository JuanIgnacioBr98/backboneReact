import React, { useEffect, useState } from "react";
import { IPipesScreens } from "../core/screens/IPipesScreens";
import { translate } from "../../../../hooks/useTranslator";
import { pipesPresenterProvider } from "../infrastructure/presentation/presenterProvider";
import { Table } from "@mantine/core";
import { IPipesPresenter } from "../core/presentation/IPipesPresenter";
import IPreFilterPipe from "../core/entities/IPreFilterPipe";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import IconButton from "../../../../components/IconButton";
import ParamsMainContainer from "../../../../components/ParamsMainContainer";
import ParamsModal from "../../../../components/ParamsModal";
import TablePipes from "./components/TablePipes";
import EditPipeForm from "./components/EditPipeForm/EditPipeForm";
import { customColors } from "../../../../themes/customColors";
import { useForm } from "@mantine/form";
import { showErrorToast, showSuccessToast } from "../../../../utils/toasts";
import DeleteConfirmModal from "../../../../components/DeleteConfirmModal/DeleteConfirmModal";

const ManageParameters = () => {
  const parametersTitleTab = "Parámetros | Accicom - Préstamos personales";
  const translator = translate();
  const presenterProvider = pipesPresenterProvider();
  const [loaded, setLoaded] = useState(false);
  const [isCloseModalVisible, setIsCloseModalVisible] =
    useState<boolean>(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] =
    useState<boolean>(false);

  const [pipes, setPipes] = useState<IPreFilterPipe[]>([]);
  const [selectedPipeId, setSelectedPipeId] = useState<string>("");
  const [isContentLoading, setIsContentLoading] = useState<boolean>(false);
  const [isEdition, setIsEdition] = useState<boolean>(false);

  const [presenter, setPresenter] = useState<IPipesPresenter>(
    {} as IPipesPresenter
  );

  const viewHandlers: IPipesScreens = {
    onGetPipesSuccess(data): void {
      const sortedData = data.sort((a, b) => a.order - b.order);
      setPipes(sortedData);
      setPipes(data);
      setIsContentLoading(false);
    },
    onGetPipesError(error): void {
      setPipes([]);
      setIsContentLoading(false);
      showErrorToast(
        translator("manage_parameters.something_went_wrong_title"),
        error === "undefined"
          ? translator("manage_parameters.something_went_wrong_description")
          : error
      );
    },
    onEditPipeSuccess(): void {
      setIsEdition(false);
      setIsCloseModalVisible(false);
      showSuccessToast(
        translator("manage_parameters.success_title"),
        translator("manage_parameters.success_edit_message")
      );
    },
    onEditPipeError(error): void {
      showErrorToast(
        translator("manage_parameters.something_went_wrong_title"),
        error === "undefined"
          ? translator("manage_parameters.something_went_wrong_description")
          : error
      );
    },
    onSavePipeSuccess(): void {
      setIsEdition(false);
      setIsCloseModalVisible(false);
      showSuccessToast(
        translator("manage_parameters.success_title"),
        translator("manage_parameters.success_create_message")
      );
    },
    onSavePipeError(error): void {
      showErrorToast(
        translator("manage_parameters.something_went_wrong_title"),
        error === "undefined"
          ? translator("manage_parameters.something_went_wrong_description")
          : error
      );
    },
    onDeletePipeSuccess(): void {
      setSelectedPipeId("");
      setIsDeleteModalVisible(false);
      showSuccessToast(
        translator("manage_parameters.success_title"),
        translator("manage_parameters.success_delete_message")
      );
    },
    onDeletePipeError(error): void {
      showErrorToast(
        translator("manage_parameters.something_went_wrong_title"),
        error === "undefined"
          ? translator("manage_parameters.something_went_wrong_description")
          : error
      );
    },
  };

  const handleEditClick = (pipe: IPreFilterPipe) => {
    setIsEdition(true);
    form.setValues({
      order: pipe.order.toString(),
      key: pipe.key,
      value: pipe.value,
    });
    setSelectedPipeId(pipe.id);
    setIsCloseModalVisible(true);
  };

  const handleAddClick = () => {
    form.reset();
    setIsCloseModalVisible(true);
  };

  const handleDeleteClick = (pipeId: string) => {
    setSelectedPipeId(pipeId);
    setIsDeleteModalVisible(true);
  };

  const handleConfirmDelete = () => {
    presenter.deletePipe(selectedPipeId);
  };

  const handleSaveEdit = () => {
    form.validate();
    if (form.isValid()) {
      const { key, value } = form.values;
      const order = Number(form.getValues().order);

      const isOrderDuplicate = pipes.some(
        (pipe) =>
          pipe.order === order && pipe.id !== selectedPipeId
      );

      if (isOrderDuplicate) {
        form.setFieldError(
          "order",
          translator("manage_parameters.error_duplicate_order")
        );
        return;
      }

      presenter.editPipe({ order, key, value }, selectedPipeId);
    }
  };

  const handleSaveNewPipe = () => {
    form.validate();
    if (form.isValid()) {
      const { key, value } = form.values;
      const order = Number(form.getValues().order);

      const isOrderDuplicate = pipes.some(
        (pipe) =>
          pipe.order === order && pipe.id !== selectedPipeId
      );

      if (isOrderDuplicate) {
        form.setFieldError(
          "order",
          translator("manage_parameters.error_duplicate_order")
        );
        return;
      }

      presenter.savePipe({ order, key, value });
    }
  };

  const form = useForm({
    mode: "controlled",
    initialValues: {
      order: "",
      key: "",
      value: "",
    },
    validate: {
      order: (value) => validateNumericField(value, translator),
      key: (value) => validateField(value, translator),
      value: (value) => validateField(value, translator),
    },
  });

  const validateField = (
    value: string,
    translator: (key: string) => string
  ): string | null => {
    if (value.trim() === "") {
      return translator("manage_parameters.error_empty_field");
    }
    if (value.length > 100) {
      return translator("manage_parameters.error_max_length");
    }
    return null;
  };

  const validateNumericField = (
    value: string,
    translator: (key: string) => string
  ): string | null => {
    if (!value.trim()) {
      return translator("manage_parameters.error_empty_field");
    }
    if (!/^\d+$/.test(value)) {
      return translator("manage_parameters.error_invalid_numeric");
    }
    if (value.length > 9) {
      return translator("manage_parameters.error_max_digits");
    }
    return null;
  };

  useEffect(() => {
    document.title = parametersTitleTab;
    setPresenter(presenterProvider.getPresenter(viewHandlers));
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      setIsContentLoading(true);
      presenter.getPipes();
    }
  }, [loaded]);

  useEffect(() => {
    if (loaded) {
      presenter.getPipes();
    }
  }, [isCloseModalVisible, isDeleteModalVisible]);

  return (
    <>
      {loaded && (
        <>
          <ParamsMainContainer
            title={translator("manage_parameters.right_content.title_pipes")}
            selectedButton="pipe"
            addParameter={handleAddClick}
            isAddButtonVisible={true}
          >
            <TablePipes isLoading={isContentLoading}>
              {pipes && pipes.length > 0 ? (
                pipes.map((pipe) => (
                  <Table.Tr key={pipe.id}>
                    <Table.Td>{pipe.order}</Table.Td>
                    <Table.Td>{pipe.key}</Table.Td>
                    <Table.Td>{pipe.value}</Table.Td>
                    <Table.Td>
                      <IconButton
                        variant="transparent"
                        size="md"
                        icon={
                          <IconEdit
                            color={customColors.primary.primaryBackground}
                          />
                        }
                        onClick={() => handleEditClick(pipe)}
                      />
                      <IconButton
                        variant="transparent"
                        size="md"
                        icon={
                          <IconTrash
                            color={customColors.primary.primaryBackground}
                          />
                        }
                        onClick={() => handleDeleteClick(pipe.id)}
                      />
                    </Table.Td>
                  </Table.Tr>
                ))
              ) : (
                <Table.Tr>
                  <Table.Td colSpan={4} align="center">
                    {translator("manage_parameters.no_records_message")}
                  </Table.Td>
                </Table.Tr>
              )}
            </TablePipes>
          </ParamsMainContainer>

          <ParamsModal
            isVisible={isCloseModalVisible}
            onClose={() => setIsCloseModalVisible(false)}
            onEdited={handleSaveEdit}
            onAdd={handleSaveNewPipe}
            isEdition={isEdition}
            titleModal={translator("manage_parameters.edit_modal.title_pipes")}
          >
            <form>
              <EditPipeForm form={form} />
            </form>
          </ParamsModal>
        </>
      )}
      <DeleteConfirmModal
        isVisible={isDeleteModalVisible}
        onClose={() => setIsDeleteModalVisible(false)}
        onDelete={handleConfirmDelete}
      />
    </>
  );
};

export default ManageParameters;
