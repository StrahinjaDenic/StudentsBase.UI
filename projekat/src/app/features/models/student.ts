export interface Student {
  id: number;
  index: number;
  name: string;
  surname: string;
  dateOfEntry: Date;
  dateOfBirth?: Date;
  placeOfBirth: string;
  coAndPrIds: number[];
}
