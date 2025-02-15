import React from "react";
import { translate } from "../../../../../hooks/useTranslator";
import { Box, Loader, Table } from "@mantine/core";
import { makeStyles } from "./styles";

interface TableAgreementsProps {
  children: React.ReactNode;
  isLoading: boolean;
}

const TableAgreements: React.FC<TableAgreementsProps> = ({
  children,
  isLoading,
}) => {
  const translator = translate();
  const styles = makeStyles();

  return (
    <Table.ScrollContainer minWidth={500}>
      <Table striped withTableBorder withColumnBorders className="text-center">
        <Table.Thead>
          <Table.Tr>
            <Table.Th className="text-center">
              {translator(
                "manage_parameters_agreement.right_content.table_agreements.header_number"
              )}
            </Table.Th>
            <Table.Th className="text-center">
              {translator(
                "manage_parameters_agreement.right_content.table_agreements.header_name"
              )}
            </Table.Th>
            <Table.Th className="text-center">
              {translator(
                "manage_parameters_agreement.right_content.table_agreements.header_type"
              )}
            </Table.Th>
            <Table.Th className="text-center">
              {translator(
                "manage_parameters_agreement.right_content.table_agreements.header_action"
              )}
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        {!isLoading && <Table.Tbody>{children}</Table.Tbody>}
      </Table>
      {isLoading && (
        <Box style={styles.loaderContainer}>
          <Loader size={25} />
        </Box>
      )}
    </Table.ScrollContainer>
  );
};

export default TableAgreements;
