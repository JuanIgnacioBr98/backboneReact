import React from "react";
import { useEffect, useState } from "react";
import { translate } from "../../../../hooks/useTranslator";
import { agreementsPresenterProvider } from "../infrastructure/presentation/presenterProvider";
import IPreFilterAgreement from "../core/entities/IPreFilterAgreement";
import { IAgreementsPresenter } from "../core/presentation/IAgreementsPresenter";
import { IAgreementsScreens } from "../core/screens/IAgreementsScreens";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { Table } from "@mantine/core";
import IconButton from "../../../../components/IconButton";
import ParamsMainContainer from "../../../../components/ParamsMainContainer";
import ParamsModal from "../../../../components/ParamsModal";
import TableAgreements from "./components/TableAgreements";
import AgreementForm from "./components/AgreementForm/AgreementForm";
import { customColors } from "../../../../themes/customColors";
import { useForm } from "@mantine/form";
import DeleteConfirmModal from "../../../../components/DeleteConfirmModal/DeleteConfirmModal";
import { showErrorToast, showSuccessToast } from "../../../../utils/toasts";
import { TypeOfAgreement } from "../core/entities/TypeOfAgreement";

const ManageParameterAgreement = () => {
  const parametersTitleTab = "Parámetros | Accicom - Préstamos personales";
  const translator = translate();
  const presenterProvider = agreementsPresenterProvider();
  const [loaded, setLoaded] = useState(false);
  const [isCloseModalVisible, setIsCloseModalVisible] =
    useState<boolean>(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] =
    useState<boolean>(false);

  const [agreements, setAgreements] = useState<IPreFilterAgreement[]>([]);
  const [typeOfAgreements, setTypeOfAgreements] = useState<TypeOfAgreement[]>(
    []
  );
  const [selectedAgreementId, setSelectedAgreementId] = useState<string>("");
  const [isContentLoading, setIsContentLoading] = useState<boolean>(false);
  const [isEdition, setIsEdition] = useState<boolean>(false);

  const [presenter, setPresenter] = useState<IAgreementsPresenter>(
    {} as IAgreementsPresenter
  );

  const viewHandlers: IAgreementsScreens = {
    onGetAgreementsSuccess(data): void {
      setAgreements(data);
      setIsContentLoading(false);
    },
    onGetAgreementsError(error): void {
      showErrorToast(
        translator("manage_parameters.something_went_wrong_title"),
        error === "undefined"
        ? translator("manage_parameters.something_went_wrong_description")
        : error
      );
      setIsContentLoading(false);
    },
    onEditAgreementSuccess(): void {
      setIsEdition(false);
      setIsCloseModalVisible(false);
      showSuccessToast(
        translator("manage_parameters.success_title"),
        translator("manage_parameters.success_edit_message")
      );
    },
    onEditAgreementError(error): void {
      showErrorToast(
        translator("manage_parameters.something_went_wrong_title"),
        error === "undefined"
          ? translator("manage_parameters.something_went_wrong_description")
          : error
      );
    },
    onSaveAgreementSuccess(): void {
      setIsEdition(false);
      setIsCloseModalVisible(false);
      showSuccessToast(
        translator("manage_parameters.success_title"),
        translator("manage_parameters.success_create_message")
      );
    },
    onSaveAgreementError(error): void {
      showErrorToast(
        translator("manage_parameters.something_went_wrong_title"),
        error === "undefined"
        ? translator("manage_parameters.something_went_wrong_description")
        : error
      );
    },
    onDeleteAgreementSuccess(): void {
      setSelectedAgreementId("");
      setIsDeleteModalVisible(false);
      showSuccessToast(
        translator("manage_parameters.success_title"),
        translator("manage_parameters.success_delete_message")
      );
    },
    onDeleteAgreementError(error): void {
      showErrorToast(
        translator("manage_parameters.something_went_wrong_title"),
        error === "undefined"
        ? translator("manage_parameters.something_went_wrong_description")
        : error
      );
    },
    onGetTypeOfAgreementsSuccess(data): void {
      if (data) {
        setTypeOfAgreements(data);
      }
      setIsContentLoading(false);
    },
    onGetTypeOfAgreementsError(error): void {
      showErrorToast(
        translator("manage_parameters.something_went_wrong_title"),
        error === "undefined"
        ? translator("manage_parameters.something_went_wrong_description")
        : error
      );
      setIsContentLoading(false);
    },
  };

  const handleEditClick = (agreement: IPreFilterAgreement) => {
    setIsEdition(true);
    form.setValues({
      number: agreement.number.toString(),
      name: agreement.name,
      typeOfAgreementId: agreement.typeOfAgreement.toString(),
    });
    setSelectedAgreementId(agreement.id);
    setIsCloseModalVisible(true);
  };

  const handleAddClick = () => {
    form.reset();
    setIsEdition(false);
    setIsCloseModalVisible(true);
  };

  const handleDeleteClick = (agreementId: string) => {
    setSelectedAgreementId(agreementId);
    setIsDeleteModalVisible(true);
  };

  const handleConfirmDelete = () => {
    presenter.deleteAgreement(selectedAgreementId);
  };

  const handleSaveEdit = () => {
    form.validate();
    if (form.isValid()) {
      const number = Number(form.getValues().number);
      const name = form.getValues().name;
      const typeId = Number(form.getValues().typeOfAgreementId);

      const isNumberDuplicate = agreements.some(
        (agreement) =>
          agreement.number === number && agreement.id !== selectedAgreementId
      );

      if (isNumberDuplicate) {
        form.setFieldError(
          "number",
          translator("manage_parameters.error_duplicate_number")
        );
        return;
      }

      presenter.editAgreement({ number, name, typeId }, selectedAgreementId);
    }
  };

  const handleSaveNewAgreement = () => {
    form.validate();
    if (form.isValid()) {
      const number = Number(form.getValues().number);
      const name = form.getValues().name;
      const typeId = Number(form.getValues().typeOfAgreementId);

      const isNumberDuplicate = agreements.some(
        (agreement) =>
          agreement.number === number && agreement.id !== selectedAgreementId
      );

      if (isNumberDuplicate) {
        form.setFieldError(
          "number",
          translator("manage_parameters.error_duplicate_number")
        );
        return;
      }

      presenter.saveAgreement({ number, name, typeId });
    }
  };

  const form = useForm({
    mode: "controlled",
    initialValues: {
      number: "",
      name: "",
      typeOfAgreementId: "",
    },
    validate: {
      number: (value) => validateNumericField(value, translator),
      name: (value) =>
        value.trim() === ""
          ? translator("manage_parameters.error_empty_field")
          : null,
    },
  });

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
    if (value.length > 6) {
      return translator("manage_parameters.error_max_digits_6");
    }
    return null;
  };

  function findTypeOfAgreement(agreement, typeOfAgreements) {
    return typeOfAgreements.id === agreement.typeOfAgreement;
  }

  useEffect(() => {
    document.title = parametersTitleTab;
    setPresenter(presenterProvider.getPresenter(viewHandlers));
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      setIsContentLoading(true);
      presenter.getAgreements();
      presenter.getTypeOfAgreements();
    }
  }, [loaded]);

  useEffect(() => {
    if (loaded) {
      presenter.getAgreements();
    }
  }, [isCloseModalVisible, isDeleteModalVisible]);

  return (
    <>
      <ParamsMainContainer
        title={translator(
          "manage_parameters_agreement.right_content.title_agreements"
        )}
        selectedButton="agreement"
        addParameter={handleAddClick}
        isAddButtonVisible={true}
      >
        <TableAgreements isLoading={isContentLoading}>
          {agreements && agreements.length > 0 ? (
            agreements.map((agreement) => (
              <Table.Tr key={agreement.id}>
                <Table.Td>{agreement.number}</Table.Td>
                <Table.Td>{agreement.name}</Table.Td>
                <Table.Td>
                  {typeOfAgreements.find((type) =>
                    findTypeOfAgreement(agreement, type)
                  )?.typeOfEmployer ?? "N/A"}
                </Table.Td>
                <Table.Td>
                  <IconButton
                    variant="transparent"
                    size="md"
                    icon={
                      <IconEdit
                        color={customColors.primary.primaryBackground}
                      />
                    }
                    onClick={() => handleEditClick(agreement)}
                  />
                  <IconButton
                    variant="transparent"
                    size="md"
                    icon={
                      <IconTrash
                        color={customColors.primary.primaryBackground}
                      />
                    }
                    onClick={() => handleDeleteClick(agreement.id)}
                  />
                </Table.Td>
              </Table.Tr>
            ))
          ) : (
            <Table.Tr>
              <Table.Td colSpan={4} align="center">
                {translator("manage_parameters_agreement.no_records_message")}
              </Table.Td>
            </Table.Tr>
          )}
        </TableAgreements>
      </ParamsMainContainer>

      <ParamsModal
        isVisible={isCloseModalVisible}
        onClose={() => setIsCloseModalVisible(false)}
        onEdited={handleSaveEdit}
        onAdd={handleSaveNewAgreement}
        titleModal={translator(
          "manage_parameters_agreement.edit_modal.title_agreements"
        )}
        isEdition={isEdition}
      >
        <form>
          <AgreementForm
            form={form}
            isEdition={isEdition}
            typeOfAgreements={typeOfAgreements}
          />
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

export default ManageParameterAgreement;
