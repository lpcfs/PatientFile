import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginBusyComponent } from './login-busy.component';

describe('LoginBusyComponent', () => {
  let component: LoginBusyComponent;
  let fixture: ComponentFixture<LoginBusyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginBusyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginBusyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
