import { Component, OnInit, Input } from '@angular/core';
import { LogService } from 'src/app/services/log.service';
import { Log } from 'src/app/models/Log';
import { LogEntry } from 'src/app/models/LogEntry';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-log-container',
  templateUrl: './log-container.component.html',
  styleUrls: ['./log-container.component.scss']
})
export class LogContainerComponent implements OnInit {

  @Input()
  public logId: string;

  @Input()
  public name: string;

  public log: Log;
  public entries: LogEntry[];

  constructor(private logService: LogService) { }

  ngOnInit() {
    this.logService.getLog(this.logId).subscribe((log: Log) => this.log = log);
    this.logService.getEntries(this.logId).subscribe((entries: LogEntry[]) => this.entries = entries);
  }

  public sendMessage(entry: LogEntry) {
    entry.author = this.name;
    this.logService.sendEntry(this.logId, entry);
  }
}
