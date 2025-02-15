import { customColors } from "../../themes/customColors";

export const makeStyles = () => ({
  container: {
    alignItems: "center",
    justifyContent: "space-between",
    width: "200px",
    color: customColors.secondary.greyBorder,
  },
  reportContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    gap: "10px",
    marginTop: "5px",
  },

  iconContainer: {
    border: `2px ${customColors.secondary.greyBorder} solid`,
    padding: "5px",
    borderRadius: "10px",
  },
});
