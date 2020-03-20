import { LogEntry } from './LogEntry';

export class Log {

  constructor(
    public id: string,
    public title: string,
    public entries: LogEntry[] = []
  ) { }
};