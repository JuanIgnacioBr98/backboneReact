import { customColors } from "../../themes/customColors";

export const makeStyles = () => ({
  container: {
    display: "flex",
    alignItems: "center",
    width: "300px",
    color: customColors.secondary.greyBorder,
    border: `2px ${customColors.secondary.greyBorder} solid`,
    padding: "20px",
    borderRadius: "15px",
    cursor: "pointer",
    justifyContent: "space-between",
  },
});
