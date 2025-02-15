import React from "react";
import { Box, Select } from "@mantine/core";
import CustomInput from "../../../../../../components/CustomInput";
import { makeStyles } from "./styles";
import { translate } from "../../../../../../hooks/useTranslator";
import { UseFormReturnType } from "@mantine/form";
import { TypeOfAgreement } from "../../../core/entities/TypeOfAgreement";

interface FormValues {
  number: number;
  name: string;
  typeOfAgreement: string;
}

interface AgreementFormProps {
  form: UseFormReturnType<FormValues>;
  typeOfAgreements: TypeOfAgreement[];
}

const AgreementForm: React.FC<AgreementFormProps> = ({
  form,
  typeOfAgreements,
}) => {
  const styles = makeStyles();
  const translator = translate();

  const selectOptions = (typeOfAgreements || []).map((agreement) => ({
    value: agreement.id.toString(),
    label: agreement.typeOfEmployer,
  }));

  const changeSelection = (value: string | null) => {
    form.setFieldValue("typeOfAgreementId", value);
  };

  return (
    <Box style={styles.formContainer}>
      <CustomInput
        variant="default"
        label={translator("manage_parameters_agreement.agreements.number")}
        placeholder={translator(
          "manage_parameters_agreement.agreements.number"
        )}
        key={form.key("number")}
        {...form.getInputProps("number")}
      />
      <CustomInput
        variant="default"
        label={translator("manage_parameters_agreement.agreements.name")}
        placeholder={translator("manage_parameters_agreement.agreements.name")}
        key={form.key("name")}
        {...form.getInputProps("name")}
      />
      <Select
        size="md"
        label={translator("manage_parameters_agreement.agreements.type")}
        placeholder={translator("manage_parameters_agreement.agreements.type")}
        key={form.key("typeOfAgreementId")}
        {...form.getInputProps("typeOfAgreementId")}
        onChange={changeSelection}
        data={selectOptions}
        comboboxProps={{ withinPortal: false }}
      />
    </Box>
  );
};

export default AgreementForm;
