import { customColors } from "../../../../themes/customColors";

export const makeStyles = () => ({
  mainContainer:{
  },
  headerContainer: {
    display: "flex",
    padding: "2em 4em",
    justifyContent: "space-between",
  },
  navbarContainer: {
    display: "flex",
    padding: "0 4em",
    justifyContent: "center",
    gap: 10
  },
  navbarButtons: {
    padding: "0 2em",
  },
  navbarButtonSelected: {
    padding: "0 2em",
    border: 2,
    backgroundColor: customColors.primary.primaryBackground,
    color: customColors.secondary.white
  },
  mainContentContainer: {
    display: "flex",
  },
  leftContent:{
    display: "flex",
    borderRight: `2px solid ${customColors.secondary.grey}`,
  },
  rightContent:{
    width: "60%",
  },
  rightContentTitle: {
    fontWeight: 600,
    fontSize: '25px',
  },
  editButton: {
    backgroundColor: customColors.secondary.orange,
    color: customColors.secondary.white,
    borderRadius: "5px",
    padding: "3px"
  },
  iconNotification: {
    width: 20, 
    height: 20
  }
});
