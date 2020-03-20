import { User } from './User';

export class LogEntry {

  constructor(
    public message: string,
    public type: number,
    public timestamp: Date,
    public author: User = null
  ) { }
};