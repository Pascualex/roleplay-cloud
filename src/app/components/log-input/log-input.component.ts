import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { LogEntry } from 'src/app/models/LogEntry';

@Component({
  selector: 'app-log-input',
  templateUrl: './log-input.component.html',
  styleUrls: ['./log-input.component.scss']
})
export class LogInputComponent implements OnInit {

  @Output()
  public sendMessageEvent: EventEmitter<LogEntry> = new EventEmitter();

  public rolling: boolean = false;

  public formControl: FormGroup = new FormGroup({
    message: new FormControl('', [
      Validators.required
    ])
  });

  constructor() { }

  ngOnInit(): void { }

  public sendMessage(): void {
    if (this.formControl.invalid) { return; }
    
    const message: string = this.formControl.get('message').value;
    
    const entry: LogEntry = { message, type: 0, author: null, timestamp: null };
    this.sendMessageEvent.emit(entry);

    this.formControl.get('message').setValue('');
  }

  public sendRoll(faces: number): void {
    if (faces <= 1) return;

    const result: number = Math.floor(Math.random() * faces) + 1;    
    const message: string = result + " / D" + faces;

    const entry: LogEntry = { message, type: 1, author: null, timestamp: null };
    this.sendMessageEvent.emit(entry);

    this.rolling = false;
  }
}
