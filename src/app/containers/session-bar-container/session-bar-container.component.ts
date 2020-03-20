import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-session-bar-container',
  templateUrl: './session-bar-container.component.html',
  styleUrls: ['./session-bar-container.component.scss']
})
export class SessionBarContainerComponent implements OnInit {

  public user: User;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe((user: User) => {
      this.user = user;
    });
  }

  public async logout(): Promise<void> {
    await this.authService.logout();
    this.router.navigate(['login']);
  }
}
