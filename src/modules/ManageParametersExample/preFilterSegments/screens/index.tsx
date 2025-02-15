import React, { useEffect, useState } from "react";
import { translate } from "../../../../hooks/useTranslator";
import { Table } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import ParamsMainContainer from "../../../../components/ParamsMainContainer";
import ParamsModal from "../../../../components/ParamsModal";
import { segmentsPresenterProvider } from "../infrastructure/presentation/presenterProvider";
import { ISegmentsScreens } from "../core/screens/ISegmentsScreens";
import { ISegmentsPresenter } from "../core/presentation/ISegmentsPresenter";
import IconButton from "../../../../components/IconButton";
import TableSegments from "./components/TableSegments";
import EditSegmentForm from "./components/EditSegmentForm";
import { customColors } from "../../../../themes/customColors";
import { useForm } from "@mantine/form";
import { formatNumber } from "../../../../utils/formatNumber";
import IPreFilterSegment from "../core/entities/IPreFilterSegment";
import { showErrorToast, showSuccessToast } from "../../../../utils/toasts";

const ManageParameterSegment = () => {
  const parametersTitleTab = "Parámetros | Accicom - Préstamos personales";
  const translator = translate();
  const presenterProvider = segmentsPresenterProvider();
  const [loaded, setLoaded] = useState(false);
  const [isCloseModalVisible, setIsCloseModalVisible] =
    useState<boolean>(false);

  const [segments, setSegments] = useState<IPreFilterSegment[] | undefined>([]);
  const [selectedAgreementId, setSelectedAgreementId] = useState<string>("");

  const [isContentLoading, setIsContentLoading] = useState<boolean>(false);
  const [presenter, setPresenter] = useState<ISegmentsPresenter>(
    {} as ISegmentsPresenter
  );

  const viewHandlers: ISegmentsScreens = {
    onGetSegmentsSuccess(data): void {
      setSegments(data);
      setIsContentLoading(false);
    },
    onGetSegmentsError(error): void {
      setSegments(undefined);
      showErrorToast(
        translator("manage_parameters.something_went_wrong_title"),
        error === "undefined"
          ? translator("manage_parameters.something_went_wrong_description")
          : error
      );
      setIsContentLoading(false);
    },
    onEditSegmentSuccess(): void {
      setIsCloseModalVisible(false);
      showSuccessToast(
        translator("manage_parameters.success_title"),
        translator("manage_parameters.success_edit_message")
      );
    },
    onEditSegmentError(error): void {
      showErrorToast(
        translator("manage_parameters.something_went_wrong_title"),
        error === "undefined"
          ? translator("manage_parameters.something_went_wrong_description")
          : error
      );
    },
  };

  const handleEditClick = (segment: IPreFilterSegment) => {
    if (segment) {
      form.setValues({
        segment: segment.segment,
        overdueDaysTC: segment.overdueDaysTC.toString(),
        overdueDaysPP: segment.overdueDaysPP.toString(),
        globalMaxAmount: segment.globalMaxAmount.toString(),
        maxTransactionAmount: segment.maxTransactionAmount.toString(),
        affectation: segment.affectation.toString(),
        globalIndebtedness: segment.globalIndebtedness.toString(),
      });
      setSelectedAgreementId(segment.id);
      setIsCloseModalVisible(true);
    }
  };

  const handleSaveEdit = async () => {
    form.validate();
    if (form.isValid()) {
      const body = {
        overdueDaysPP: Number(form.getValues().overdueDaysPP),
        overdueDaysTC: Number(form.getValues().overdueDaysTC),
        globalMaxAmount: Number(form.getValues().globalMaxAmount),
        maxTransactionAmount: Number(form.getValues().maxTransactionAmount),
        affectation: Number(form.getValues().affectation),
        globalIndebtedness: Number(form.getValues().globalIndebtedness),
      };
      await presenter.editSegment(body, selectedAgreementId);
    }
  };

  const form = useForm({
    mode: "controlled",
    initialValues: {
      segment: "",
      overdueDaysTC: "",
      overdueDaysPP: "",
      globalMaxAmount: "",
      maxTransactionAmount: "",
      affectation: "",
      globalIndebtedness: "",
    },
    validate: {
      overdueDaysTC: (value) => validateNumericField(value, translator),
      overdueDaysPP: (value) => validateNumericField(value, translator),
      globalMaxAmount: (value) => validateNumericField(value, translator),
      maxTransactionAmount: (value) => validateNumericField(value, translator),
      affectation: (value) => validateNumericField(value, translator),
      globalIndebtedness: (value) => validateNumericField(value, translator),
    },
  });

  const validateNumericField = (
    value: string,
    translator: (key: string) => string
  ): string | null => {
    if (!value.trim()) {
      return translator("manage_parameters_segment.error_empty_field");
    }
    if (!/^[1-9]\d*$/.test(value)) {
      return translator("manage_parameters_segment.error_invalid_numeric");
    }
    if (value.length > 9) {
      return translator("manage_parameters_segment.error_max_digits");
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
      presenter.getSegments();
    }
  }, [loaded]);

  useEffect(() => {
    if (loaded) {
      presenter.getSegments();
    }
  }, [isCloseModalVisible]);

  return (
    <>
      <ParamsMainContainer
        title={translator(
          "manage_parameters_segment.right_content.title_segments"
        )}
        selectedButton="segment"
      >
        <TableSegments isLoading={isContentLoading}>
          {segments && segments.length > 0 ? (
            segments.map((segment) => (
              <Table.Tr key={segment?.id}>
                <Table.Td>{segment?.segment}</Table.Td>
                <Table.Td>{segment?.overdueDaysTC}</Table.Td>
                <Table.Td>{segment?.overdueDaysPP}</Table.Td>
                <Table.Td>{formatNumber(segment?.globalMaxAmount)}</Table.Td>
                <Table.Td>
                  {formatNumber(segment?.maxTransactionAmount)}
                </Table.Td>
                <Table.Td>{segment?.affectation}%</Table.Td>
                <Table.Td>{segment?.globalIndebtedness}%</Table.Td>
                <Table.Td>
                  <IconButton
                    variant="transparent"
                    size="md"
                    icon={
                      <IconEdit
                        color={customColors.primary.primaryBackground}
                      />
                    }
                    onClick={() => {
                      handleEditClick(segment);
                    }}
                  />
                </Table.Td>
              </Table.Tr>
            ))
          ) : (
            <Table.Tr>
              <Table.Td colSpan={8} align="center">
                {translator("manage_parameters_segment.no_records_message")}
              </Table.Td>
            </Table.Tr>
          )}
        </TableSegments>
      </ParamsMainContainer>

      <ParamsModal
        isVisible={isCloseModalVisible}
        onClose={() => setIsCloseModalVisible(false)}
        onEdited={handleSaveEdit}
        titleModal={translator(
          "manage_parameters_segment.edit_modal.title_segments"
        )}
        titleParameter={form.getValues().segment}
      >
        <form>
          <EditSegmentForm form={form} />
        </form>
      </ParamsModal>
    </>
  );
};

export default ManageParameterSegment;
