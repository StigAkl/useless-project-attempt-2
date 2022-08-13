export interface Session {
  uid: string;
  finished: boolean;
  startTime: Date;
  endTime: Date | undefined | null;
}
