import React from "react";
import { translate } from "../../../../../hooks/useTranslator";
import { Box, Loader, Table } from "@mantine/core";
import { makeStyles } from "./styles";

interface TableSegmentsProps {
  children: React.ReactNode;
  isLoading: boolean;
}

const TableSegments: React.FC<TableSegmentsProps> = ({
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
                "manage_parameters_segment.right_content.table_segments.header_segment"
              )}
            </Table.Th>
            <Table.Th className="text-center">
              {translator(
                "manage_parameters_segment.right_content.table_segments.header_overdue_days_tc"
              )}
            </Table.Th>
            <Table.Th className="text-center">
              {translator(
                "manage_parameters_segment.right_content.table_segments.header_overdue_days_pp"
              )}
            </Table.Th>
            <Table.Th className="text-center">
              {translator(
                "manage_parameters_segment.right_content.table_segments.header_global_max_amount"
              )}
            </Table.Th>
            <Table.Th className="text-center">
              {translator(
                "manage_parameters_segment.right_content.table_segments.header_max_transaction_amount"
              )}
            </Table.Th>
            <Table.Th className="text-center">
              {translator(
                "manage_parameters_segment.right_content.table_segments.header_affectation"
              )}
            </Table.Th>
            <Table.Th className="text-center">
              {translator(
                "manage_parameters_segment.right_content.table_segments.header_global_indebtedness"
              )}
            </Table.Th>
            <Table.Th className="text-center">
              {translator(
                "manage_parameters_segment.right_content.table_segments.header_action"
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

export default TableSegments;
