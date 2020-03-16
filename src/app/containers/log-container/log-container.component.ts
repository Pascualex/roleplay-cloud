import { Component, OnInit, Input } from '@angular/core';
import { LogService } from 'src/app/services/log.service';
import { Log } from 'src/app/models/Log';
import { LogEntry, Timestamp } from 'src/app/models/LogEntry';

@Component({
  selector: 'app-log-container',
  templateUrl: './log-container.component.html',
  styleUrls: ['./log-container.component.scss']
})
export class LogContainerComponent implements OnInit {

  @Input()
  public logId: string;

  public log: Log;
  public entries: LogEntry[];

  constructor(private logService: LogService) { }

  ngOnInit() {
    this.logService.getLog(this.logId).subscribe(
      (log: Log) => {
        this.log = log;
        this.logService.getEntries(log).subscribe(
          (entries: LogEntry[]) => {
            this.entries = entries;
          }
        );
      }
    );
  }

  public sendMessage(message: string) {
    const entry: LogEntry = { message, timestamp: Timestamp.now() };
    this.logService.sendEntry(this.log, entry);
  }
}
