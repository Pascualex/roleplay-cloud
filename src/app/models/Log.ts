import { LogEntry } from './LogEntry';
import { User } from './User';

export class Log {

  public static readonly dummy = new Log('', User.dummy, '', []);

  constructor(
    public title: string,
    public owner: User,
    public id: string,
    public entries: LogEntry[]
  ) { }
};