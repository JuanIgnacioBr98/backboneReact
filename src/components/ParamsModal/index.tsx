import {
  Anchor,
  Box,
  Button,
  CloseIcon,
  Container,
  Divider,
  Flex,
  Title,
} from "@mantine/core";
import React from "react";
import "@mantine/core/styles/global.css";

import CustomModal from "../CustomModal";
import { translate } from "../../hooks/useTranslator";
import { makeStyles } from "./styles";
import IconButton from "../IconButton";
import { IconInfoCircle } from "@tabler/icons-react";
import { customColors } from "../../themes/customColors";

type IParamsModal = {
  isVisible: boolean;
  isEdition?: boolean;
  children: React.ReactNode;
  onClose: () => void;
  onEdited?: () => void;
  onAdd?: () => void;
  titleModal: string;
  titleParameter?: string;
};

const ParamsModal = ({
  isVisible,
  isEdition = true,
  onClose,
  onEdited,
  onAdd,
  children,
  titleModal,
  titleParameter,
}: IParamsModal) => {
  const translator = translate();
  const styles = makeStyles();

  return (
    <CustomModal
      isVisible={isVisible}
      showCloseButton={false}
      onCloseButton={onClose}
    >
      <Flex direction="column" style={styles.closeModalContainer}>
        <Flex justify="space-between" align="center" gap={4}>
          <Title order={3}>{titleModal}</Title>
          <IconButton
            variant="transparent"
            icon={<CloseIcon color={customColors.primary.primaryBackground} />}
            onClick={() => onClose()}
          />
        </Flex>

        <Divider mb="lg" mt="xs" />

        {titleParameter && (
          <Title order={3} mb="lg">
            {titleParameter}
          </Title>
        )}

        <Container fluid>{children}</Container>

        <Divider my={"lg"} />

        <Box style={styles.modalButtonsContainer}>
          <Box display="flex">
            <IconInfoCircle
              size={20}
              color={customColors.secondary.grey}
              style={styles.infoIcon}
            />
            <Anchor href="" ml={4}>
              {translator("manage_parameters.edit_modal.about")}
            </Anchor>
          </Box>

          <Box style={styles.modalButtonsContainer}>
            <Button
              size="md"
              variant="outline"
              color={customColors.primary.primaryBackground}
              style={styles.buttonCancel}
              onClick={() => onClose()}
            >
              {translator("manage_parameters.edit_modal.button_cancel")}
            </Button>
            <Button
              size="md"
              variant="filled"
              style={styles.buttonSave}
              onClick={isEdition ? onEdited : onAdd}
            >
              {isEdition
                ? translator("manage_parameters.edit_modal.button_edit")
                : translator("manage_parameters.edit_modal.button_save")}
            </Button>
          </Box>
        </Box>
      </Flex>
    </CustomModal>
  );
};

export default ParamsModal;
