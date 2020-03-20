import { LogEntry } from './LogEntry';

export class Log {

  public static readonly dummy = new Log('', '', []);

  constructor(
    public id: string,
    public title: string,
    public entries: LogEntry[] = []
  ) { }
};