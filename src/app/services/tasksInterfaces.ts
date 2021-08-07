export interface IndividualTaskInterface {
  id: number;
  board: string;

  title: string;
  description?: string;
  time: number | string;
  assignTo?: string;

  updatedOn?: number; // this value for change task board only
}

export interface Iboards {
  [key: string]: string;
}

export interface Ilimits {
  [key: string]: number;
}