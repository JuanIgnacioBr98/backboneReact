import { customColors } from "../../themes/customColors";

export const makeStyles = () => ({
  closeModalContainer: {
    padding: "1em 2em",
  },
  modalButtonsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "15px",
  },
  infoIcon:{
    marginTop:"1px",
    marginRight: "5px"
  },
  buttonCancel: {
    borderRadius: "20px",
    padding: "1em 1em",
  },
  buttonSave: {
    borderRadius: "20px",
    padding: "1em 1em",
    backgroundColor: customColors.primary.primaryBackground,
    color: customColors.secondary.white
  }
});
