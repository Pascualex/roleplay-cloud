import { Component, OnInit, Input } from '@angular/core';
import { LogService } from 'src/app/services/log.service';
import { Log } from 'src/app/models/Log';
import { LogEntry } from 'src/app/models/LogEntry';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-log-container',
  templateUrl: './log-container.component.html',
  styleUrls: ['./log-container.component.scss']
})
export class LogContainerComponent implements OnInit {

  @Input()
  public logId: string;

  public log: Log;
  public user: User;

  constructor(private logService: LogService, private authService: AuthService) {
    this.authService.getCurrentUser().subscribe((user: User) => {
      this.user = user;
    });
  }

  ngOnInit() {
    this.logService.getLog(this.logId).subscribe((log: Log) => this.log = log);
  }

  public async sendMessage(entry: LogEntry) {
    if (this.user == null) return;
    entry.author = this.user;
    this.logService.sendEntry(this.logId, entry);
  }
}
