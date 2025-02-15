import React from "react";
import { Box } from "@mantine/core";
import CustomInput from "../../../../../../components/CustomInput";
import { translate } from "../../../../../../hooks/useTranslator";
import { makeStyles } from "./styles";
import { UseFormReturnType } from "@mantine/form";

interface FormValues {
  order: string;
  key: string;
  value: string;
}
interface EditPipeFormProps {
  form: UseFormReturnType<FormValues>;
}

const EditPipeForm: React.FC<EditPipeFormProps> = ({
  form,
}) => {
  const translator = translate();
  const styles = makeStyles();
  return (
    <Box style={styles.formContainer}>
      <CustomInput
        variant="default"
        label={translator("manage_parameters.pipes.order")}
        placeholder={translator("manage_parameters.pipes.order")}
        key={form.key('order')}
        {...form.getInputProps('order')}
      />
      <CustomInput
        variant="default"
        label={translator("manage_parameters.pipes.key")}
        placeholder={translator("manage_parameters.pipes.key")}
        key={form.key('key')}
        {...form.getInputProps('key')}
      />
      <CustomInput
        variant="default"
        label={translator("manage_parameters.pipes.value")}
        placeholder={translator("manage_parameters.pipes.value")}
        key={form.key('value')}
        {...form.getInputProps('value')}
      />
    </Box>
  );
};

export default EditPipeForm;
