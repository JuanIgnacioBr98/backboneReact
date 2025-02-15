import React from "react";
import CustomInput from "../../../../../components/CustomInput";
import { translate } from "../../../../../hooks/useTranslator";
import { Box } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";

interface FormValues {
  segment: string;
  overdueDaysTC: number;
  overdueDaysPP: number;
}

interface EditSegmentFormProps {
  form: UseFormReturnType<FormValues>;
}

const EditSegmentForm: React.FC<EditSegmentFormProps> = ({ form }) => {
  const translator = translate();

  return (
    <Box className="grid grid-cols-4 gap-8">
      <Box className="col-span-1">
        <CustomInput
          variant="default"
          label={translator(
            "manage_parameters_segment.edit_modal.input_overdue_days_tc"
          )}
          {...form.getInputProps("overdueDaysTC")}
          key={form.key("overdueDaysTC")}
        />
      </Box>
      <Box className="col-span-1">
        <CustomInput
          variant="default"
          label={translator(
            "manage_parameters_segment.edit_modal.input_overdue_days_pp"
          )}
          {...form.getInputProps("overdueDaysPP")}
          key={form.key("overdueDaysPP")}
        />
      </Box>
      <Box className="col-span-1">
        <CustomInput
          variant="default"
          label={translator(
            "manage_parameters_segment.edit_modal.input_affectation"
          )}
          {...form.getInputProps("affectation")}
          key={form.key("affectation")}
          rightSection="%"
        />
      </Box>
      <Box className="col-span-1">
        <CustomInput
          variant="default"
          label={translator(
            "manage_parameters_segment.edit_modal.input_global_indebtedness"
          )}
          {...form.getInputProps("globalIndebtedness")}
          key={form.key("globalIndebtedness")}
          rightSection="%"
        />
      </Box>
      <Box className="col-span-2">
        <CustomInput
          variant="default"
          label={translator(
            "manage_parameters_segment.edit_modal.input_max_transaction_amount"
          )}
          {...form.getInputProps("maxTransactionAmount")}
          key={form.key("maxTransactionAmount")}
        />
      </Box>
      <Box className="col-span-2">
        <CustomInput
          variant="default"
          label={translator(
            "manage_parameters_segment.edit_modal.input_global_max_amount"
          )}
          {...form.getInputProps("globalMaxAmount")}
          key={form.key("globalMaxAmount")}
        />
      </Box>
    </Box>
  );
};

export default EditSegmentForm;
