import React from "react";
import { Box, Select } from "@mantine/core";
import CustomInput from "../../../../../../components/CustomInput";
import { makeStyles } from "./styles";
import { translate } from "../../../../../../hooks/useTranslator";
import { UseFormReturnType } from "@mantine/form";
import { ITypeOfAgreement } from "../../../core/entities/ITypeOfAgreement";

interface FormValues {
  typeOfEmployeer: string;
  decision: string;
}

interface TypeOfAgreementFormProps {
  form: UseFormReturnType<FormValues>;
  isEdition: boolean;
  typeOfAgreements: ITypeOfAgreement[];
}

const TypeOfAgreementForm: React.FC<TypeOfAgreementFormProps> = ({
  form,
  typeOfAgreements,
}) => {
  const styles = makeStyles();
  const translator = translate();

  const selectOptions = [
    { value: "Avanza", label: translator("Avanza") },
    { value: "Rechaza", label: translator("Rechaza") },
  ];

  return (
    <Box style={styles.formContainer}>
      <CustomInput
        variant="default"
        key={"type_of_employer"}
        label={translator("manage_parameters_agreement.type_of_agreement.name")}
        placeholder={translator("manage_parameters_agreement.type_of_agreement.name")}
        {...form.getInputProps("typeOfEmployer")} 
      />
      <Select
        size="md"
        key={"decision"}
        label={translator("manage_parameters_agreement.type_of_agreement.type")}
        placeholder={translator("manage_parameters_agreement.type_of_agreement.type")}
        {...form.getInputProps("decision")}
        data={selectOptions}
      />
    </Box>
  );
};

export default TypeOfAgreementForm;
