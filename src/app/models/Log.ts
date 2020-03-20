import { LogEntry } from './LogEntry';

export class Log {

  public static readonly dummy = new Log('', '', []);

  constructor(
    public title: string,
    public id: string,
    public entries: LogEntry[] = [],
  ) { }
};