import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LogService } from 'src/app/services/log.service';

@Component({
  selector: 'app-game-search-container',
  templateUrl: './game-search-container.component.html',
  styleUrls: ['./game-search-container.component.scss']
})
export class GameSearchContainerComponent implements OnInit {

  public searched: boolean = false;
  public awaitingResponse: boolean = false;
  public invalidGameId: boolean = false;

  public formControl: FormGroup = new FormGroup({
    gameId: new FormControl('', [
      Validators.required,
      Validators.minLength(20),
      Validators.maxLength(20)
    ])
  });

  constructor(private logService: LogService, private router: Router)  {
    this.formControl.valueChanges.subscribe(_ => {
      this.invalidGameId = false;
    });
  }

  ngOnInit(): void { }

  public async searchGame(): Promise<void> {
    this.searched = true;
    if (this.formControl.invalid) return;
    if (this.awaitingResponse || this.invalidGameId) return;
    this.awaitingResponse = true;

    const gameId: string = this.formControl.get('gameId').value;

    if (await this.logService.checkLogExists(gameId)) {
      this.router.navigate(['/log/', gameId]);
    } else {
      this.awaitingResponse = false;
      this.invalidGameId = true;
    }
  }
} 
