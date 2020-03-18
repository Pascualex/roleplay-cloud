import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionBarContainerComponent } from './session-bar-container.component';

describe('SessionBarContainerComponent', () => {
  let component: SessionBarContainerComponent;
  let fixture: ComponentFixture<SessionBarContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionBarContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionBarContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
