import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticationContainerComponent } from './authentication-container.component';

describe('AuthenticationContainerComponent', () => {
  let component: AuthenticationContainerComponent;
  let fixture: ComponentFixture<AuthenticationContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthenticationContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenticationContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
