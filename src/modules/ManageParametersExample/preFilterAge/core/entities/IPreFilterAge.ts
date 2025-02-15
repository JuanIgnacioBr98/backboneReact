import { GenderEnum } from "../../../../../constants";

export default interface IPreFilterAge {
    id: string;
    segment: string;
    gender: GenderEnum;
    maxAge: number;
    minAge: number;
    agePermanence: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface IEditAgeParams {
    body: {
        maxAge?: number;
        minAge?: number;
        agePermanence?: number;
    },
    id: string,
}