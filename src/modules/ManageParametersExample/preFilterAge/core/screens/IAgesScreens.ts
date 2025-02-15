import IPreFilterAge from "../entities/IPreFilterAge";

export interface IAgesScreens {
  onGetAgesSuccess: (value: IPreFilterAge[]) => void;
  onGetAgesError: (error: string) => void;

  onEditAgeSuccess: () => void;
  onEditAgeError: (error: string) => void;
}
