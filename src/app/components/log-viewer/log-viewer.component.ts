import { Component, OnInit, Input } from '@angular/core';
import { Log } from 'src/app/models/Log';
import { LogEntry } from 'src/app/models/LogEntry';

@Component({
  selector: 'app-log-viewer',
  templateUrl: './log-viewer.component.html',
  styleUrls: ['./log-viewer.component.scss']
})
export class LogViewerComponent implements OnInit {

  @Input()
  public entries: LogEntry[];

  constructor() { }

  ngOnInit(): void { }
}
