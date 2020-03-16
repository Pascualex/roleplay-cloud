import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-search-container',
  templateUrl: './game-search-container.component.html',
  styleUrls: ['./game-search-container.component.scss']
})
export class GameSearchContainerComponent implements OnInit {

  public gameId: string = '';
  public invalid: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void { }

  public searchGame(): void {
    if (this.gameId != null && this.gameId.length == 20) {
      this.router.navigate(['/log/', this.gameId]);
    } else {
      this.invalid = true;
    }
  }

  public onChange(event: KeyboardEvent) {
    this.gameId = (event.target as HTMLInputElement).value;
    if (this.gameId != null && this.gameId.length == 20) {
      this.invalid = false;
    }
  }
} 
