export default interface IPreFilterSegment {
  id: string;
  segment: string;
  value: string;
  overdueDaysTC: number;
  overdueDaysPP: number;
  globalMaxAmount: number;
  maxTransactionAmount: number;
  affectation: number;
  globalIndebtedness: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IEditSegmentParams {
  body: {
    overdueDaysTC?: number;
    overdueDaysPP?: number;
    globalMaxAmount?: number;
    maxTransactionAmount?: number;
    affectation?: number;
    globalIndebtedness?: number;
  };
  id: string;
}
