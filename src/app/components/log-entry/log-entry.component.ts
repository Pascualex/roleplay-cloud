import { Component, OnInit, Input } from '@angular/core';
import { LogEntry } from 'src/app/models/LogEntry';

@Component({
  selector: 'app-log-entry',
  templateUrl: './log-entry.component.html',
  styleUrls: ['./log-entry.component.scss']
})
export class LogEntryComponent implements OnInit {

  @Input()
  public entry: LogEntry;

  constructor() { }

  ngOnInit(): void { }
}
