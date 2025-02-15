import { Flex } from "@mantine/core";
import React from "react";
import Icon from "./icon";
import CustomButton from "../CustomButton";
import { styles } from "./styles";

interface Props {
  onButtonClick?: () => void;
  buttonLabel?: string;
  message: string;
}
const SuccessMessage = ({ onButtonClick, buttonLabel, message }: Props) => {
  return (
    <Flex
      display="flex"
      direction="column"
      w="auto"
      align="center"
      style={styles.container}
    >
      <Icon />
      <span style={styles.textMessage}>{message}</span>
      {buttonLabel && (
        <CustomButton
          title={buttonLabel}
          size="sm"
          onClick={onButtonClick}
          variant="primary"
        />
      )}
    </Flex>
  );
};

export default SuccessMessage;
