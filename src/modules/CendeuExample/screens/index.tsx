/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Container,
  Divider,
  Flex,
  Loader,
  Pagination,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import MonthInput from "../../../components/MonthInput";
import FileInput from "../../../components/CustomFileInput";
import { translate } from "../../../hooks/useTranslator";
import { makeStyles } from "./style";
import RoundedButton from "../../../components/RoundedButton";
import CustomButton from "../../../components/CustomButton";
import ReportDetails from "../../../components/ReportDetails";
import SuccessMessage from "../../../components/SuccessMessage";
import CustomTable from "../../../components/CustomTable";
import { ICendeuPresenter } from "../core/presentation/ICendeuPresenter";
import { ICendeuScreen } from "../core/screens/ICendeuScreen";
import { cendeuPresenterProvider } from "../infrastructure/presentation/presenterProvider";
import DownloadIcon from "../../../assets/DownloadIcon";
import { Register } from "../core/entities/Register";
import { showErrorToast, showSuccessToast } from "../../../utils/toasts";
import Warning from "../../../components/Warning";
import { customColors } from "../../../themes/customColors";
import { IResponsePaginatedRegister } from "../core/entities/IResponsePaginatedRegisters";
import { formatNumber } from "../../../utils/formatNumber";
import { FileType } from "../../Leads/core/entities/FileTypeEnum";

const REGISTERS_TABLE_SIZE = 4;
const TABLE = "CENDEU";

const CendeuScreen = () => {
  const presenterProvider = cendeuPresenterProvider();

  const t = translate();
  const styles = makeStyles();
  const [file, setFile] = useState<File | null>();
  const [periodDate, setPeriodDate] = useState<Date | null>();
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorAmount, setErrorAmount] = useState<number | null>();
  const [entriesAmount, setEntriesAmount] = useState<number | null>();
  const [entriesProcessed, setEntriesProcessed] = useState(false);
  const [processedFileName, setProcessedFileName] = useState<string>("");
  const [presenter, setPresenter] = useState<ICendeuPresenter>(
    {} as ICendeuPresenter
  );
  const [isErrorPeriod, setIsErrorPeriod] = useState<boolean>(false);
  const [registers, setRegisters] = useState<Register[]>([]);
  const [paginatedResponse, setPaginatedResponse] =
    useState<IResponsePaginatedRegister>();
  const [activePage, setPage] = useState(1);

  const cendeuTitleTab = "CENDEU | Accicom - Préstamos personales";

  const viewHandlers: ICendeuScreen = {
    onProcessFileSuccess: function (result): void {
      setEntriesAmount(result.entries);
      setErrorAmount(result.errors);
      setProcessedFileName(result.fileName);
      setLoading(false);
      setEntriesProcessed(true);
    },
    onProcessFileError: function (err: any): void {
      setEntriesAmount(0);
      setErrorAmount(0);
      setLoading(false);
      setIsErrorPeriod(err?.period);
      showErrorToast(
        err?.period
          ? t("cendeu.error_periodErrorTitle")
          : t("cendeu.error_title"),
        err?.period
          ? t("cendeu.error_periodErrorDescription")
          : t("cendeu.error_message")
      );
    },
    onGetRegistersSuccess(registersPaginated) {
      setPaginatedResponse(registersPaginated);
      setLoading(false);
    },
    onGetRegistersError: function (_): void {
      setPaginatedResponse(undefined);
      setLoading(false);
      showErrorToast(t("cendeu.error_title"), t("cendeu.error_message"));
    },
    onDownloadFileSuccess: function (): void {
      showSuccessToast(t("leads.success_title"));
    },
    onDownloadFileError: function (): void {
      showErrorToast(t("leads.error_title"), t("leads.error_message"));
    },
    updateStatusSuccess(): void {
      handleLoadNew();
      showSuccessToast(t("cendeu.update_status_success"));
      setPage(1);
    },
    updateStatusError(): void {
      showErrorToast(t("cendeu.error_title"), t("cendeu.error_message"));
      setPage(1);
    },
  };

  const handleStartProcess = () => {
    setLoading(true);
    presenter.processFile(file, periodDate);
  };

  const handleLoadNew = () => {
    setFile(null);
    setPeriodDate(null);
    setEntriesAmount(null);
    setEntriesProcessed(false);
    setErrorAmount(null);
  };

  const handleDownloadErrorFile = async (period: string) => {
    try {
      await presenter.downloadErrorFile(period, FileType.CENDEU);
    } catch (_) {
      showErrorToast(t("cendeu.error_title"), t("cendeu.download_error"));
    }
  };

  useEffect(() => {
    document.title = cendeuTitleTab;
    setPresenter(presenterProvider.getPresenter(viewHandlers));
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      setLoading(true);
      presenter.getRegisters({ type: TABLE, size: REGISTERS_TABLE_SIZE });
    }
  }, [loaded, entriesProcessed]);

  useEffect(() => {
    if (paginatedResponse) {
      setRegisters(paginatedResponse.registers);
    }
  }, [paginatedResponse]);

  useEffect(() => {
    if (loaded) {
      presenter.getRegisters({
        type: TABLE,
        page: activePage,
        size: REGISTERS_TABLE_SIZE,
      });
    }
  }, [loaded, activePage]);

  useEffect(() => {
    setIsErrorPeriod(false);
  }, [periodDate]);

  return (
    <Container fluid mx={"2rem"}>
      <Flex
        display="flex"
        gap="xl"
        p="xl"
        style={styles.box}
        align="center"
        justify="space-between"
      >
        <Flex gap="xl" align="center">
          <Box style={{ marginTop: isErrorPeriod ? "2%" : 0 }}>
            <MonthInput
              label={t("cendeu.period")}
              value={periodDate}
              onChange={setPeriodDate}
              disabled={entriesProcessed}
              error={isErrorPeriod && t("cendeu.errorInputPeriod")}
            />
          </Box>
          <FileInput
            clearable={!entriesAmount}
            disabled={!periodDate || entriesProcessed}
            label={t("cendeu.attachment")}
            value={file}
            accept=".txt"
            onChange={setFile}
            placeholder={t("cendeu.select_document")}
          />
          {entriesProcessed ? (
            <SuccessMessage message={t("cendeu.success_message")} />
          ) : (
            <RoundedButton
              title={
                loading
                  ? t("cendeu.loading_entries")
                  : t("cendeu.start_process")
              }
              isLoading={loading}
              onClick={handleStartProcess}
              isDisabled={!file || !periodDate}
              style={{
                ...styles.processFileButton,
                marginTop: isErrorPeriod ? "4%" : "5%",
              }}
            />
          )}
        </Flex>

        {entriesProcessed && (
          <>
            <Divider size="sm" orientation="vertical" />
            <Flex gap="xl" align="center">
              <ReportDetails
                title={t("cendeu.report")}
                recordAmount={entriesAmount}
                errorAmount={errorAmount}
              />
              <Flex direction="column" gap="sm">
                <CustomButton
                  title={t("cendeu.cancel_upload")}
                  onClick={() =>
                    presenter.updateFileStatus(processedFileName, false)
                  }
                />
                <CustomButton
                  title={t("cendeu.confirm_process")}
                  variant="primary"
                  onClick={() =>
                    presenter.updateFileStatus(processedFileName, true)
                  }
                />
              </Flex>
            </Flex>
          </>
        )}
      </Flex>
      <Warning message={t("cendeu.enter_period_warning")} />

      <Box p="xl" style={styles.box}>
        <h2 style={styles.title}>{t("cendeu.entries")}</h2>
        <Flex w={"100%"} justify={"center"} mt={"xl"}>
          {loading ? (
            <Loader size={"sm"} />
          ) : registers.length === 0 ? (
            <p>{t("cendeu.no_records_message")}</p>
          ) : (
            <Flex direction="column" align="center" w={"100%"}>
              <CustomTable
                headers={[
                  t("cendeu.title"),
                  t("cendeu.period"),
                  t("cendeu.created_date"),
                  t("cendeu.entries_processed"),
                  t("cendeu.errors_found"),
                  t("cendeu.status"),
                  t("cendeu.errors"),
                ]}
                elements={registers.map((register) => {
                  const isFileAvailable = !!register.errorFileName;
                  return [
                    register.fileName,
                    register.period,
                    register.creationDate.split("T")[0],
                    formatNumber(register.entriesAmount),
                    formatNumber(register.errorsFound),
                    register.status
                      ? t("cendeu.status_confirmed")
                      : t("cendeu.status_canceled"),
                    <DownloadIcon
                      onClick={() => isFileAvailable && handleDownloadErrorFile(register.period)}
                      disabled={!isFileAvailable}
                    />,
                  ];
                })}
              />
              <Pagination
                value={activePage}
                onChange={setPage}
                total={paginatedResponse ? paginatedResponse.totalPages : 0}
                color={customColors.primary.primaryBackground}
                radius="md"
                mt="lg"
                className="items-center"
              />
            </Flex>
          )}
        </Flex>
      </Box>
    </Container>
  );
};

export default CendeuScreen;
