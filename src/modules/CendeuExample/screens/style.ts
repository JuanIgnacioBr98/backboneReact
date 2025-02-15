import { customColors } from "../../../themes/customColors";
export const makeStyles = () => ({
  box: {
    border: `2px solid ${customColors.secondary.grey}`,
    borderRadius: "10px",
  },
  title: {
    fontSize: "24px",
    marginBottom: "10px",
  },
  processFileButton: {
    alignSelf: "center",
  },
});
