import React from "react";
import { makeStyles } from "./styles";
import { Box, Divider, Flex } from "@mantine/core";
import { translate } from "../../hooks/useTranslator";
import { formatNumber } from "../../utils/formatNumber";

interface Props {
  title: string;
  recordAmount?: number;
  errorAmount?: number;
}
const ReportDetails = ({ title, recordAmount, errorAmount }: Props) => {
  const t = translate();
  const styles = makeStyles();

  return (
    <Box>
      <Flex display="flex" direction="row" gap="lg">
        <Box style={styles.registerColumn}>
          <span style={styles.title}>{title}</span>
          <span style={styles.number}>{formatNumber(recordAmount)}</span>
          <span style={styles.subtitle}>{t("leads.entries_processed")}</span>
        </Box>
        <Divider size="sm" h={"6rem"} orientation="vertical" />
        <Box style={styles.errorColumn}>
          <span style={styles.errorNumber}>{formatNumber(errorAmount)}</span>
          <span style={styles.subtitle}>{t("leads.errors_found")}</span>
        </Box>
      </Flex>
    </Box>
  );
};

export default ReportDetails;
