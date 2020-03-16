import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameSearchContainerComponent } from './game-search-container.component';

describe('GameSearchContainerComponent', () => {
  let component: GameSearchContainerComponent;
  let fixture: ComponentFixture<GameSearchContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameSearchContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameSearchContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
