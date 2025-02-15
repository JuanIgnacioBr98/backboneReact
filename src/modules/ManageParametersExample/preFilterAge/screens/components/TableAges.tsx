import React from "react";
import { translate } from "../../../../../hooks/useTranslator";
import { Box, Loader, Table } from "@mantine/core";
import { makeStyles } from "./styles";

interface TableAgesProps {
  children: React.ReactNode;
  isLoading: boolean;
}

const TableAges: React.FC<TableAgesProps> = ({ children, isLoading }) => {
  const translator = translate();
  const styles = makeStyles();

  return (
    <Table.ScrollContainer minWidth={500}>
      <Table striped withTableBorder withColumnBorders className="text-center">
        <Table.Thead>
          <Table.Tr>
            <Table.Th></Table.Th>
            <Table.Th className="text-center">
              {translator(
                "manage_parameters_age.right_content.table_ages.header_new_segment"
              )}
            </Table.Th>
            <Table.Th className="text-center">
              {translator(
                "manage_parameters_age.right_content.table_ages.header_retired"
              )}
            </Table.Th>
            <Table.Th className="text-center">
              {translator(
                "manage_parameters_age.right_content.table_ages.header_pensions"
              )}
            </Table.Th>
            <Table.Th className="text-center">
              {translator(
                "manage_parameters_age.right_content.table_ages.header_public"
              )}
            </Table.Th>
            <Table.Th className="text-center">
              {translator(
                "manage_parameters_age.right_content.table_ages.header_private"
              )}
            </Table.Th>
            <Table.Th className="text-center">
              {translator(
                "manage_parameters_age.right_content.table_ages.header_action"
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

export default TableAges;
