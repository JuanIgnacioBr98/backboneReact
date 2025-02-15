import { customColors } from "../../themes/customColors";

const NUMBER_SIZE = "32px";
export const makeStyles = () => ({
  title: {},
  subtitle: {
    fontSize: "12px",
  },
  number: {
    fontSize: NUMBER_SIZE,
    color: customColors.primary.primaryBackground,
  },
  errorNumber: {
    fontSize: NUMBER_SIZE,
    color: customColors.secondary.error,
  },
  registerColumn: {
    display: "flex",
    flexDirection: "column",
    marginLeft: "-15%",
    marginRight: "5%",
  },
  errorColumn: {
    display: "flex",
    flexDirection: "column",
    marginLeft: "5%",
    alignSelf: "center",
  },
});
