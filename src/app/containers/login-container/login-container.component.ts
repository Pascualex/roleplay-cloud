import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from '../../validators/CustomValidators';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-container',
  templateUrl: './login-container.component.html',
  styleUrls: ['./login-container.component.scss']
})
export class LoginContainerComponent implements OnInit {

  @Output()
  public switchToSignUpEvent: EventEmitter<void> = new EventEmitter();

  public attempted: boolean = false;
  public awaitingResponse: boolean = false;
  public invalidCredentials: boolean = false;

  public formControl: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
      CustomValidators.noWhitespace
    ])
  });

  constructor(private authService: AuthService, private router: Router) {
    this.formControl.valueChanges.subscribe(_ => {
      this.invalidCredentials = false;
    });
  }

  ngOnInit(): void { }

  public async login(): Promise<void> {
    this.attempted = true;

    if (this.formControl.invalid) return;
    if (this.awaitingResponse || this.invalidCredentials) return;

    this.awaitingResponse = true;

    const email: string = this.formControl.get('email').value;
    const password: string = this.formControl.get('password').value;

    if (await this.authService.login(email, password)) {
      this.router.navigate(['home']);
    } else {
      this.invalidCredentials = true;
    }
    
    this.awaitingResponse = false;
  }

  public switchToSignUp(): void {
    this.switchToSignUpEvent.emit();
  }
}