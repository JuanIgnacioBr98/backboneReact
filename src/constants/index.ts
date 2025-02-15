export const ROLES = {
  ADMIN: "ADMIN",
  USER: "USER",
} as const;

export enum GenderEnum {
  MALE = "Masculino",
  FEMALE = "Femenino",
}

export enum ErrorsFileNameEnum {
  "LEAD" = "errores_lead",
  "CENDEU" = "errores_cendeu",
}

export type RoleType = (typeof ROLES)[keyof typeof ROLES];
