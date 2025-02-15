import React, { useEffect, useState } from "react";
import { translate } from "../../../../hooks/useTranslator";
import { TypeOfAgreementPresenterProvider } from "../infrastructure/presentation/presenterProvider";
import { ITypeOfAgreement } from "../core/entities/ITypeOfAgreement";
import { ITypeOfAgreementPresenter } from "../core/presentation/ITypeOfAgreementPresenter";
import { ITypeOfAgreementScreens } from "../core/screens/ITypeOfAgreementScreens";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { Table } from "@mantine/core";
import IconButton from "../../../../components/IconButton";
import ParamsMainContainer from "../../../../components/ParamsMainContainer";
import ParamsModal from "../../../../components/ParamsModal";
import TableTypeOfAgreements from "./components/TableTypeOfAgreements";
import TypeOfAgreementForm from "./components/TypeOfAgreement/TypeOfAgreementForm";
import { customColors } from "../../../../themes/customColors";
import { useForm } from "@mantine/form";
import DeleteConfirmModal from "../../../../components/DeleteConfirmModal/DeleteConfirmModal";
import { showErrorToast, showSuccessToast } from "../../../../utils/toasts";

const ManageParameterTypeOfAgreement = () => {
  const parametersTitleTab = "Parámetros | Accicom - Préstamos personales";
  const translator = translate();
  const presenterProvider = TypeOfAgreementPresenterProvider();
  const [loaded, setLoaded] = useState(false);
  const [isCloseModalVisible, setIsCloseModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const [typeOfAgreements, setTypeOfAgreements] = useState<ITypeOfAgreement[]>([]);
  const [selectedTypeOfAgreementId, setSelectedTypeOfAgreementId] = useState<string>("");
  const [isContentLoading, setIsContentLoading] = useState<boolean>(false);
  const [isEdition, setIsEdition] = useState<boolean>(false);

  const [presenter, setPresenter] = useState<ITypeOfAgreementPresenter>(
    {} as ITypeOfAgreementPresenter
  );

  const viewHandlers: ITypeOfAgreementScreens = {
    onGetTypeOfAgreementSuccess(data): void {
      setTypeOfAgreements(data || []);
      setIsContentLoading(false);
    },
    onGetTypeOfAgreementError(error): void {
      showErrorToast(
        translator("manage_parameters.something_went_wrong_title"),
        error || translator("manage_parameters.something_went_wrong_description")
      );
      setIsContentLoading(false);
    },
    onEditTypeOfAgreementSuccess(): void {
      setIsEdition(false);
      setIsCloseModalVisible(false);
      showSuccessToast(
        translator("manage_parameters.success_title"),
        translator("manage_parameters.success_edit_message")
      );
    },
    onEditTypeOfAgreementError(error): void {
      showErrorToast(
        translator("manage_parameters.something_went_wrong_title"),
        error === "undefined"
          ? translator("manage_parameters.something_went_wrong_description")
          : error
      );
    },
    onSaveTypeOfAgreementSuccess(): void {
      setIsEdition(false);
      setIsCloseModalVisible(false);
      showSuccessToast(
        translator("manage_parameters.success_title"),
        translator("manage_parameters.success_create_message")
      );
    },
    onSaveTypeOfAgreementError(error): void {
      showErrorToast(
        translator("manage_parameters.something_went_wrong_title"),
        error || translator("manage_parameters.something_went_wrong_description")
      );
    },
    onDeleteTypeOfAgreementSuccess(): void {
      setSelectedTypeOfAgreementId("");
      setIsDeleteModalVisible(false);
      showSuccessToast(
        translator("manage_parameters.success_title"),
        translator("manage_parameters.success_delete_message")
      );
    },
    onDeleteTypeOfAgreementError(error): void {
      showErrorToast(
        translator("manage_parameters.something_went_wrong_title"),
        error || translator("manage_parameters.something_went_wrong_description")
      );
    },
  };

  const handleEditClick = (typeOfAgreement: ITypeOfAgreement) => {
    setIsEdition(true);

    form.setValues({
      id: typeOfAgreement.id,
      typeOfEmployer: typeOfAgreement.typeOfEmployer,
      decision: typeOfAgreement.decision,
    });

    setSelectedTypeOfAgreementId(typeOfAgreement.id);
    setIsCloseModalVisible(true);
  };


  const handleSaveEdit = () => {
    form.validate();
    if (form.isValid()) {
      const typeOfEmployer = form.getValues().typeOfEmployer;
      const decision = form.getValues().decision;

      presenter.editTypeOfAgreement({ type_of_employer: typeOfEmployer, decision }, selectedTypeOfAgreementId);
    }
  };

  const handleSaveNewTypeOfAgreement = () => {
    form.validate();
    if (form.isValid()) {
      const typeOfEmployer = form.getValues().typeOfEmployer;
      const decision = form.getValues().decision;
      presenter.saveTypeOfAgreement({ type_of_employer: typeOfEmployer, decision });
    }
  };

  const handleAddClick = () => {
    form.reset();
    setIsEdition(false);
    setIsCloseModalVisible(true);
  };

  const handleDeleteClick = (typeOfAgreementId: string) => {
    setSelectedTypeOfAgreementId(typeOfAgreementId);
    setIsDeleteModalVisible(true);
  };

  const handleConfirmDelete = () => {
    presenter.deleteTypeOfAgreement(selectedTypeOfAgreementId);
  };

  const form = useForm({
    initialValues: {
      id: "",
      typeOfEmployer: "",
      decision: "",
    },
    validate: {
      typeOfEmployer: (value) => (value.trim() ? null : "Tipo de empleador es requerido"),
      decision: (value) => (value ? null : "Decisión es requerida"),
    },
  });

  useEffect(() => {
    document.title = parametersTitleTab;
    setPresenter(presenterProvider.getPresenter(viewHandlers));
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      setIsContentLoading(true);
      presenter.getTypeOfAgreements();
    }
  }, [loaded]);

  useEffect(() => {
    if (loaded) {
      presenter.getTypeOfAgreements();
    }
  }, [isCloseModalVisible, isDeleteModalVisible]);

  return (
    <>
      <ParamsMainContainer
        title={translator(
          "manage_parameters_agreement.right_content.title_type_of_agreement"
        )}
        selectedButton="type_of_agreement"
        addParameter={handleAddClick}
        isAddButtonVisible={true}
      >
        <TableTypeOfAgreements isLoading={isContentLoading}>
          {typeOfAgreements.length > 0 ? (
            typeOfAgreements.map((typeOfAgreement) => (
              <Table.Tr key={typeOfAgreement.id}>
                <Table.Td>{typeOfAgreement.typeOfEmployer}</Table.Td>
                <Table.Td>{typeOfAgreement.decision}</Table.Td>
                <Table.Td>
                  <IconButton
                    variant="transparent"
                    size="md"
                    icon={<IconEdit color={customColors.primary.primaryBackground} />}
                    onClick={() => handleEditClick(typeOfAgreement)}
                  />
                  <IconButton
                    variant="transparent"
                    size="md"
                    icon={<IconTrash color={customColors.primary.primaryBackground} />}
                    onClick={() => handleDeleteClick(typeOfAgreement.id)}
                  />
                </Table.Td>
              </Table.Tr>
            ))
          ) : (
            <Table.Tr>
              <Table.Td colSpan={3} align="center">
                {translator("manage_parameters_agreement.no_records_message")}
              </Table.Td>
            </Table.Tr>
          )}
        </TableTypeOfAgreements>
      </ParamsMainContainer>

      <ParamsModal
        isVisible={isCloseModalVisible}
        onClose={() => setIsCloseModalVisible(false)}
        onEdited={handleSaveEdit}
        onAdd={handleSaveNewTypeOfAgreement}
        titleModal={translator(
          "manage_parameters_agreement.edit_modal.title_type_of_agreement"
        )}
        isEdition={isEdition}
      >
        <form>
          <TypeOfAgreementForm form={form} isEdition={isEdition} typeOfAgreements={typeOfAgreements} />
        </form>
      </ParamsModal>

      <DeleteConfirmModal
        isVisible={isDeleteModalVisible}
        onClose={() => setIsDeleteModalVisible(false)}
        onDelete={handleConfirmDelete}
      />
    </>
  );
};

export default ManageParameterTypeOfAgreement;
