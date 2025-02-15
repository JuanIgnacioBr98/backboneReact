import React, { useEffect, useState } from "react";
import { translate } from "../../../../hooks/useTranslator";
import { agesPresenterProvider } from "../infrastructure/presentation/presenterProvider";
import { Table } from "@mantine/core";
import { makeStyles } from "./styles";
import { IconEdit } from "@tabler/icons-react";
import IconButton from "../../../../components/IconButton";
import IPreFilterAge from "../core/entities/IPreFilterAge";
import { IAgesScreens } from "../core/screens/IAgesScreens";
import { IAgesPresenter } from "../core/presentation/IAgesPresenter";
import ParamsMainContainer from "../../../../components/ParamsMainContainer";
import ParamsModal from "../../../../components/ParamsModal";
import TableAges from "./components/TableAges";
import EditAgeForm from "./components/EditAgeForm.tsx/EditAgeForm";
import { customColors } from "../../../../themes/customColors";
import { GenderEnum } from "../../../../constants";
import { useForm } from "@mantine/form";
import { showErrorToast, showSuccessToast } from "../../../../utils/toasts";

type IRow = {
  ages: IPreFilterAge[];
  gender: string;
  type: string;
};

const ManageParameterAge = () => {
  const parametersTitleTab = "Parámetros | Accicom - Préstamos personales";
  const translator = translate();
  const presenterProvider = agesPresenterProvider();
  const [loaded, setLoaded] = useState(false);
  const [isCloseModalVisible, setIsCloseModalVisible] =
    useState<boolean>(false);

  const [ages, setAges] = useState<IPreFilterAge[]>([]);
  const [selectedAgesIDs, setSelectedAgesIDs] = useState<string[]>([]);
  const [selectedGender, setSelectedGender] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");

  const [presenter, setPresenter] = useState<IAgesPresenter>(
    {} as IAgesPresenter
  );
  const [isContentLoading, setIsContentLoading] = useState<boolean>(false);

  const SEGMENTS = ["retired", "pensions", "public", "private"];

  const viewHandlers: IAgesScreens = {
    onGetAgesSuccess(data): void {
      setAges(data);
      setIsContentLoading(false);
    },
    onGetAgesError(error): void {
      setAges([]);
      setIsContentLoading(false);
      showErrorToast(
        translator("manage_parameters.something_went_wrong_title"),
        error === "undefined"
          ? translator("manage_parameters.something_went_wrong_description")
          : error
      );
    },
    onEditAgeSuccess(): void {
      setIsCloseModalVisible(false);
      showSuccessToast(
        translator("manage_parameters.success_title"),
        translator("manage_parameters.success_edit_message")
      );
    },
    onEditAgeError(error): void {
      showErrorToast(
        translator("manage_parameters.something_went_wrong_title"),
        error === "undefined"
          ? translator("manage_parameters.something_went_wrong_description")
          : error
      );
    },
  };

  const handleEditClick = (selectedAges: IRow) => {
    if (selectedAges) {
      const formValues = SEGMENTS.reduce((acc, category, index) => {
        acc[`${category}MinAge`] = selectedAges.ages[index].minAge.toString();
        acc[`${category}MaxAge`] = selectedAges.ages[index].maxAge.toString();
        acc[`${category}PermanenceAge`] =
          selectedAges.ages[index].agePermanence.toString();
        return acc;
      }, {});

      form.setValues(formValues);
      setSelectedGender(selectedAges.gender);
      setSelectedType(selectedAges.type);
      const ids = selectedAges.ages.map((age) => age.id);
      setSelectedAgesIDs(ids);

      setIsCloseModalVisible(true);
    }
  };

  const handleSaveEdit = async () => {
    form.validate();
    if (form.isValid()) {
      try {
        const editPromises = selectedAgesIDs.map((id, i) => {
          const body = {
            minAge: Number(form.values[`${SEGMENTS[i]}MinAge`]),
            maxAge: Number(form.values[`${SEGMENTS[i]}MaxAge`]),
            agePermanence: Number(form.values[`${SEGMENTS[i]}PermanenceAge`]),
          };
          return presenter.editAge(body, id);
        });

        await Promise.all(editPromises);
        presenter.getAges();
        setIsCloseModalVisible(false);
        showSuccessToast(
          translator("manage_parameters.success_title"),
          translator("manage_parameters.success_edit_message")
        );
      } catch (error) {
        showErrorToast(
          translator("manage_parameters.something_went_wrong_title"),
          translator("manage_parameters.something_went_wrong_description")
        );
      }
    }
  };

  const groupedByGender = ages.reduce((acc, item) => {
    if (!acc[item.gender])
      acc[item.gender] = { min: [], max: [], permanence: [] };
    acc[item.gender].min.push(item);
    acc[item.gender].min.sort();
    acc[item.gender].max.push(item);
    acc[item.gender].max.sort();
    acc[item.gender].permanence.push(item);
    acc[item.gender].permanence.sort();
    return acc;
  }, {} as Record<GenderEnum, { min: IPreFilterAge[]; max: IPreFilterAge[]; permanence: IPreFilterAge[] }>);

  const form = useForm({
    mode: "controlled",
    initialValues: {
      privateMinAge: "",
      privateMaxAge: "",
      publicMinAge: "",
      publicMaxAge: "",
      retiredMinAge: "",
      retiredMaxAge: "",
      pensionsMinAge: "",
      pensionsMaxAge: "",
      privatePermanenceAge: "",
      publicPermanenceAge: "",
      retiredPermanenceAge: "",
      pensionsPermanenceAge: "",
    },
    validate: {
      privateMinAge: (value) => validateAgeField(value),
      privateMaxAge: (value) => validateAgeField(value),
      publicMinAge: (value) => validateAgeField(value),
      publicMaxAge: (value) => validateAgeField(value),
      retiredMinAge: (value) => validateAgeField(value),
      retiredMaxAge: (value) => validateAgeField(value),
      pensionsMinAge: (value) => validateAgeField(value),
      pensionsMaxAge: (value) => validateAgeField(value),
      privatePermanenceAge: (value) => validateAgeField(value),
      publicPermanenceAge: (value) => validateAgeField(value),
      retiredPermanenceAge: (value) => validateAgeField(value),
      pensionsPermanenceAge: (value) => validateAgeField(value),
    },
  });

  const validateAgeField = (value: string) => {
    const isValidFormat = /^\d+$/.test(value.trim());

    if (value.trim() === "") {
      return translator("manage_parameters.error_empty_field");
    }
    if (!isValidFormat) {
      return translator("manage_parameters_age.error_invalid_format");
    }

    const age = parseInt(value.trim(), 10);
    if (isNaN(age) || age < 18) {
      return translator("manage_parameters_age.error_invalid_format");
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
      presenter.getAges();
    }
  }, [loaded]);

  useEffect(() => {
    if (loaded) {
      presenter.getAges();
    }
  }, [isCloseModalVisible]);

  return (
    <>
      <ParamsMainContainer
        title={translator("manage_parameters_age.right_content.title_ages")}
        selectedButton="age"
      >
        <TableAges isLoading={isContentLoading}>
          {ages && ages.length ? (
            <>
              <Table.Tr>
                <Table.Td rowSpan={2} className="align-middle">
                  {translator(
                    "manage_parameters_age.right_content.table_ages.section_min_age_income"
                  )}
                </Table.Td>
                <Table.Td>
                  {translator(
                    "manage_parameters_age.right_content.table_ages.section_female"
                  )}
                </Table.Td>
                {groupedByGender[GenderEnum.FEMALE]?.min.map((age, index) => (
                  <Table.Td key={index}>{age.minAge}</Table.Td>
                ))}
                <Table.Td>
                  <IconButton
                    variant="transparent"
                    size="md"
                    icon={
                      <IconEdit
                        color={customColors.primary.primaryBackground}
                      />
                    }
                    onClick={() =>
                      handleEditClick({
                        gender: GenderEnum.FEMALE,
                        type: "min",
                        ages: groupedByGender[GenderEnum.FEMALE]?.min,
                      })
                    }
                  />
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>
                  {translator(
                    "manage_parameters_age.right_content.table_ages.section_male"
                  )}
                </Table.Td>
                {groupedByGender[GenderEnum.MALE]?.min.map((age, index) => (
                  <Table.Td key={index}>{age.minAge}</Table.Td>
                ))}
                <Table.Td>
                  <IconButton
                    variant="transparent"
                    size="md"
                    icon={
                      <IconEdit
                        color={customColors.primary.primaryBackground}
                      />
                    }
                    onClick={() =>
                      handleEditClick({
                        gender: GenderEnum.MALE,
                        type: "min",
                        ages: groupedByGender[GenderEnum.MALE]?.min,
                      })
                    }
                  />
                </Table.Td>
              </Table.Tr>

              <Table.Tr>
                <Table.Td rowSpan={2} className="align-middle">
                  {translator(
                    "manage_parameters_age.right_content.table_ages.section_max_age_income"
                  )}
                </Table.Td>
                <Table.Td>
                  {translator(
                    "manage_parameters_age.right_content.table_ages.section_female"
                  )}
                </Table.Td>
                {groupedByGender[GenderEnum.FEMALE]?.max.map((age, index) => (
                  <Table.Td key={index}>{age.maxAge}</Table.Td>
                ))}
                <Table.Td>
                  <IconButton
                    variant="transparent"
                    size="md"
                    icon={
                      <IconEdit
                        color={customColors.primary.primaryBackground}
                      />
                    }
                    onClick={() =>
                      handleEditClick({
                        gender: GenderEnum.FEMALE,
                        type: "max",
                        ages: groupedByGender[GenderEnum.FEMALE]?.max,
                      })
                    }
                  />
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>
                  {translator(
                    "manage_parameters_age.right_content.table_ages.section_male"
                  )}
                </Table.Td>
                {groupedByGender[GenderEnum.MALE]?.max.map((age, index) => (
                  <Table.Td key={index}>{age.maxAge}</Table.Td>
                ))}
                <Table.Td>
                  <IconButton
                    variant="transparent"
                    size="md"
                    icon={
                      <IconEdit
                        color={customColors.primary.primaryBackground}
                      />
                    }
                    onClick={() =>
                      handleEditClick({
                        gender: GenderEnum.MALE,
                        type: "max",
                        ages: groupedByGender[GenderEnum.MALE]?.max,
                      })
                    }
                  />
                </Table.Td>
              </Table.Tr>

              <Table.Tr>
                <Table.Td rowSpan={2} className="align-middle">
                  {translator(
                    "manage_parameters_age.right_content.table_ages.section_permanence_age"
                  )}
                </Table.Td>
                <Table.Td>
                  {" "}
                  {translator(
                    "manage_parameters_age.right_content.table_ages.section_female"
                  )}
                </Table.Td>
                {groupedByGender[GenderEnum.FEMALE]?.permanence.map(
                  (age, index) => (
                    <Table.Td key={index}>{age.agePermanence}</Table.Td>
                  )
                )}
                <Table.Td>
                  <IconButton
                    variant="transparent"
                    size="md"
                    icon={
                      <IconEdit
                        color={customColors.primary.primaryBackground}
                      />
                    }
                    onClick={() =>
                      handleEditClick({
                        gender: GenderEnum.FEMALE,
                        type: "permanence",
                        ages: groupedByGender[GenderEnum.FEMALE]?.permanence,
                      })
                    }
                  />
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>
                  {" "}
                  {translator(
                    "manage_parameters_age.right_content.table_ages.section_male"
                  )}
                </Table.Td>
                {groupedByGender[GenderEnum.MALE]?.permanence.map(
                  (age, index) => (
                    <Table.Td key={index}>{age.agePermanence}</Table.Td>
                  )
                )}
                <Table.Td>
                  <IconButton
                    variant="transparent"
                    size="md"
                    icon={
                      <IconEdit
                        color={customColors.primary.primaryBackground}
                      />
                    }
                    onClick={() =>
                      handleEditClick({
                        gender: GenderEnum.MALE,
                        type: "permanence",
                        ages: groupedByGender[GenderEnum.MALE]?.permanence,
                      })
                    }
                  />
                </Table.Td>
              </Table.Tr>
            </>
          ) : (
            <Table.Tr>
              <Table.Td colSpan={7} align="center">
                {translator("manage_parameters_age.no_records_message")}
              </Table.Td>
            </Table.Tr>
          )}
        </TableAges>
      </ParamsMainContainer>
      <ParamsModal
        isVisible={isCloseModalVisible}
        onClose={() => setIsCloseModalVisible(false)}
        onEdited={handleSaveEdit}
        titleModal={translator("manage_parameters_age.edit_modal.title_ages")}
      >
        <form>
          <EditAgeForm
            form={form}
            type={selectedType}
            selectedGender={selectedGender}
          />
        </form>
      </ParamsModal>{" "}
    </>
  );
};

export default ManageParameterAge;
