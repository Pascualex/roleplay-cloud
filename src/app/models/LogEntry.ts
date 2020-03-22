import { User } from './User';

export class LogEntry {

  constructor(
    public message: string,
    public type: LogEntryType,
    public timestamp: Date,
    public author: User
  ) { }
};

export enum LogEntryType {
  message = 0,
  roll = 1
};