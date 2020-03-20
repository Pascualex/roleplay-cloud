import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-authentication-view',
  templateUrl: './authentication-view.component.html',
  styleUrls: ['./authentication-view.component.scss']
})
export class AuthenticationViewComponent implements OnInit {

  public signUp: boolean = false;

  constructor() { }

  ngOnInit(): void { }
}
