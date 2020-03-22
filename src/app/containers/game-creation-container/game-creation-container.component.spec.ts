import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameCreationContainerComponent } from './game-creation-container.component';

describe('GameCreationContainerComponent', () => {
  let component: GameCreationContainerComponent;
  let fixture: ComponentFixture<GameCreationContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameCreationContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameCreationContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
