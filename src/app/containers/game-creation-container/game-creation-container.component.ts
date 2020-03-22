import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { LogService } from 'src/app/services/log.service';
import { Router } from '@angular/router';
import { Log } from 'src/app/models/Log';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-game-creation-container',
  templateUrl: './game-creation-container.component.html',
  styleUrls: ['./game-creation-container.component.scss']
})
export class GameCreationContainerComponent implements OnInit {

  public attempted: boolean = false;
  public awaitingResponse: boolean = false;

  public formControl: FormGroup = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.maxLength(40)
    ])
  });

  private user: User = null;

  constructor(
    private logService: LogService,
    private authService: AuthService,
    private router: Router
  )  { }

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe((user: User) => this.user = user);
  }

  public async createGame(): Promise<void> {
    this.attempted = true;
    if (this.formControl.invalid) return;
    if (this.awaitingResponse) return;
    if (!this.user) return;
    this.awaitingResponse = true;

    const rawTitle: string = this.formControl.get('title').value;
    const title: string = rawTitle.trim();

    const log: Log = new Log(title, this.user, null, null);
    
    const gameId: string = await this.logService.createLog(log);
    if (gameId != null) this.router.navigate(['/log/', gameId]);

    this.awaitingResponse = false;
  }
}
