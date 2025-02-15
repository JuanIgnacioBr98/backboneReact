import { customColors } from "../../../../themes/customColors";

export const makeStyles = () => ({
  editButton: {
    backgroundColor: customColors.secondary.orange,
    color: customColors.secondary.white,
    borderRadius: "5px",
    padding: "3px"
  },
  modalContentContainer: {
    display:"flex",
    justifyContent: "space-around",
    gap:"20px"
  },
  iconNotification: {
    width: 20, 
    height: 20
  }
});
