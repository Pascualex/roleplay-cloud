import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-log-input',
  templateUrl: './log-input.component.html',
  styleUrls: ['./log-input.component.scss']
})
export class LogInputComponent implements OnInit {

  @Output()
  public sendMessageEvent: EventEmitter<string> = new EventEmitter();

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
    this.sendMessageEvent.emit(message);

    this.formControl.get('message').setValue('');
  }
}
