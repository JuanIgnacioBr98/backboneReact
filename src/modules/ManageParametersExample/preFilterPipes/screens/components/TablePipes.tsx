import React from "react";
import { translate } from "../../../../../hooks/useTranslator";
import { Box, Loader, Table } from "@mantine/core";
import { makeStyles } from "./styles";

interface TablePipesProps {
  children: React.ReactNode;
  isLoading: boolean;
}

const TablePipes: React.FC<TablePipesProps> = ({ children, isLoading }) => {
  const translator = translate();
  const styles = makeStyles();

  return (
    <Table.ScrollContainer minWidth={500}>
      <Table striped withTableBorder withColumnBorders className="text-center">
        <Table.Thead>
          <Table.Tr>
            <Table.Th className="text-center">
              {translator(
                "manage_parameters.right_content.table_pipes.header_order"
              )}
            </Table.Th>
            <Table.Th className="text-center">
              {translator(
                "manage_parameters.right_content.table_pipes.header_key"
              )}
            </Table.Th>
            <Table.Th className="text-center">
              {translator(
                "manage_parameters.right_content.table_pipes.header_value"
              )}
            </Table.Th>
            <Table.Th className="text-center">
              {translator(
                "manage_parameters.right_content.table_pipes.header_action"
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

export default TablePipes;
