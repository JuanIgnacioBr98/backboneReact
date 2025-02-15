import React from "react";
import { style } from "./style";
import { Flex } from "@mantine/core";
import InfoIcon from "../../assets/InfoIcon";

interface Props {
  message: string;
}

const Warning = ({ message }: Props) => {
  return (
    <Flex direction="row" gap={"sm"} p={"md"} my={2} className="items-center">
      <InfoIcon />
      <span style={style.text}>{message}</span>
    </Flex>
  );
};

export default Warning;
