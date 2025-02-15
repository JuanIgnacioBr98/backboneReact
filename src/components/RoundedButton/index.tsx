import React from "react";
import { Button, ButtonProps, Loader } from "@mantine/core";
import { makeStyles } from "./style";

interface RoundedButtonProps extends Partial<ButtonProps> {
  isLoading?: boolean;
  title: string;
  onClick?: () => void;
  isDisabled?: boolean;
}

const RoundedButton: React.FC<RoundedButtonProps> = ({
  isLoading,
  isDisabled,
  title,
  ...props
}) => {
  const styles = makeStyles();

  return (
    <Button
      {...props}
      styles={styles}
      radius="xl"
      disabled={isDisabled || isLoading}
      rightSection={
        isLoading ? <Loader color="grey" type="dots" size="sm" /> : null
      }
      children={title}
    />
  );
};

export default RoundedButton;
