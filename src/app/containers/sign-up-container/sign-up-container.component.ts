import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from '../../validators/CustomValidators';
import { AuthService, RegisterResponse } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-sign-up-container',
  templateUrl: './sign-up-container.component.html',
  styleUrls: ['./sign-up-container.component.scss']
})
export class SignUpContainerComponent implements OnInit {

  @Output()
  public switchToLoginEvent: EventEmitter<void> = new EventEmitter();

  public attempted: boolean = false;
  public awaitingResponse: boolean = false;
  public invalidEmail: boolean = false;
  public created: boolean = false;
  public unexpectedError: boolean = false;

  public formControl: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      CustomValidators.email
    ]),
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(16),
      CustomValidators.noWhitespace
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
      CustomValidators.noWhitespace
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
      CustomValidators.noWhitespace,
      CustomValidators.matchOtherField('password')
    ])
  });

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void { 
    this.formControl.valueChanges.subscribe(_ => {
      this.invalidEmail = false;
      this.unexpectedError = false;
    });

    this.formControl.get('password').valueChanges.subscribe(() => {
      this.formControl.get('confirmPassword').updateValueAndValidity();
    });
  }

  public async signUp(): Promise<void> {
    this.attempted = true;

    if (this.formControl.invalid) return;
    if (this.awaitingResponse || this.invalidEmail) return;

    this.awaitingResponse = true;
    this.unexpectedError = false;

    const email: string = this.formControl.get('email').value;
    const username: string = this.formControl.get('username').value;
    const password: string = this.formControl.get('password').value;
    
    const user: User = new User(username);

    const response: RegisterResponse = await this.authService.register(email, password, user);

    if (response == RegisterResponse.OK) {
      this.created = true;

      if (await this.authService.login(email, password)) {
        this.router.navigate(['home']);
      } else {
        this.created = false;
        this.unexpectedError = true;
      }
    } else if (response == RegisterResponse.EMAIL_COLLISION) {
      this.invalidEmail = true;
    } else {
      this.unexpectedError = true;
    }

    this.awaitingResponse = false;
  }

  public switchToLogin(): void {
    this.switchToLoginEvent.emit();
  }
}