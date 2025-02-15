import { notifications } from "@mantine/notifications";
import { customColors } from "../themes/customColors";
const position = "top-center";
export const showErrorToast = (title = "", message = "") => {
  notifications.show({
    title,
    message,
    color: customColors.secondary.error,
    position,
  });
};

export const showSuccessToast = (title = "", message = "") => {
  notifications.show({
    title,
    message,
    color: customColors.secondary.success,
    position,
  });
};
