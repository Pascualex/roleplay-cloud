import { Component, OnInit, Input } from '@angular/core';
import { LogEntry, LogEntryType } from 'src/app/models/LogEntry';

@Component({
  selector: 'app-log-entry',
  templateUrl: './log-entry.component.html',
  styleUrls: ['./log-entry.component.scss']
})
export class LogEntryComponent implements OnInit {

  @Input()
  public entry: LogEntry;

  @Input()
  public reverse: boolean = false;

  public roll = LogEntryType.roll;

  constructor() { }

  ngOnInit(): void { }
}
