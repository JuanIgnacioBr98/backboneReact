import React from "react";
import CustomInput from "../../../../../../components/CustomInput";
import { translate } from "../../../../../../hooks/useTranslator";
import { UseFormReturnType } from "@mantine/form";

interface FormValues {
  privateMinAge: "",
  privateMaxAge: "",
  publicMinAge:"",
  publicMaxAge: "",
  retiredMinAge:"",
  retiredMaxAge:"",
  pensionsMinAge: "",
  pensionsMaxAge: "",
  agePermanence: "",
}

interface EditAgeFormProps {
  selectedGender: string;
  form: UseFormReturnType<FormValues>;
  type: string;
  gender: string;
}

const EditAgeForm: React.FC<EditAgeFormProps> = ({ form , selectedGender, type}) => {
  
  const capitalized = type.charAt(0).toUpperCase() + type.slice(1);
  const typeAge = `${capitalized}Age`;
  const translator = translate();

  return (
    <div className="grid grid-rows-3 grid-flow-col gap-4">
      <CustomInput
        disabled
        variant="default"
        label={translator("manage_parameters_age.edit_modal.input_gender")}
        defaultValue={selectedGender}
        />
      <CustomInput
        variant="default"
        label={translator("manage_parameters_age.edit_modal.input_retired")}
        {...form.getInputProps(`retired${typeAge}`)}
        key={form.key(`retired${typeAge}`)}/>
      <CustomInput
        variant="default"
        label={translator("manage_parameters_age.edit_modal.input_pensions")}
        {...form.getInputProps(`pensions${typeAge}`)}
        key={form.key(`pensions${typeAge}`)}
      />
      <CustomInput
        variant="default"
        label={translator("manage_parameters_age.edit_modal.input_public")}
        {...form.getInputProps(`public${typeAge}`)}
        key={form.key(`public${typeAge}`)}
      />
      <CustomInput
        variant="default"
        label={translator("manage_parameters_age.edit_modal.input_private")}
        {...form.getInputProps(`private${typeAge}`)}
        key={form.key(`private${typeAge}`)}
      />
    </div>
  );
};

export default EditAgeForm;
