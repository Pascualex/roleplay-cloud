import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-log-input',
  templateUrl: './log-input.component.html',
  styleUrls: ['./log-input.component.scss']
})
export class LogInputComponent implements OnInit {

  @Output()
  public sendMessageEvent: EventEmitter<string> = new EventEmitter();

  private message: string;

  constructor() { }

  ngOnInit(): void { }

  public sendMessage(): void {
    if (this.message != null && this.message.length <= 256) {
      console.log("Manda: ", this.message);
      this.sendMessageEvent.emit(this.message);
    }
  }

  public onChange(event: KeyboardEvent) {
    this.message = (event.target as HTMLInputElement).value;
    console.log("Actualiza: ", this.message);
  }
}
