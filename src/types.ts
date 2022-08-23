export interface Session {
  uid: string;
  finished: boolean;
  startTime: Date;
  endTime: Date | undefined | null;
}

export interface TotalWorkTime {
  totalMsWorked: number;
  numDaysWorked: number;
  totalMsShouldWork: number;
}
