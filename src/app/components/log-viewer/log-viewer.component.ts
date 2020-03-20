import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewChecked, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { Log } from 'src/app/models/Log';
import { LogEntry } from 'src/app/models/LogEntry';
import { Observable } from 'rxjs';
import { User } from 'firebase';

@Component({
  selector: 'app-log-viewer',
  templateUrl: './log-viewer.component.html',
  styleUrls: ['./log-viewer.component.scss']
})
export class LogViewerComponent implements OnInit, AfterViewInit {

  @Input()
  public log: Log;

  @Input()
  public user: User;

  @ViewChild('logViewer')
  private logViewer: ElementRef;

  @ViewChildren('logEntry')
  private logEntries: QueryList<ElementRef>;

  private fixedBottom: boolean = true;

  constructor() { }

  ngOnInit(): void {
    this.scrollToBottom();
  }

  ngAfterViewInit() {
    this.logEntries.changes.subscribe(_ => this.scrollToBottom());
  }

  private scrollToBottom(): void {
    if (!this.fixedBottom) return;
    try {
      this.logViewer.nativeElement.scrollTop = this.logViewer.nativeElement.scrollHeight;
    } catch(e) { }
  }
}
