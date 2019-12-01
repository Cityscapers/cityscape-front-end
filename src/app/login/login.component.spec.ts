import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {AppModule} from '../app.module';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [AppModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should do things on init', () => {
    spyOn(component, 'createForm');
    component.ngOnInit();
    expect(component.createForm).toHaveBeenCalled();
    expect(component.errorMessage).toBe('');
  });
  it('should create a form', () => {
    component.createForm();
    expect(component.loginForm.controls.email.value).toBe('');
    expect(component.loginForm.controls.password.value).toBe('');
  });
  it('should try to login',  () => {
    component.tryLogin('asdf');
    expect(component.errorMessage).toBeDefined();
  });
  it('should do google login', async () => {
    spyOn(component.authService, 'doGoogleLogin').and.returnValue(Promise.resolve('test'));
    spyOn(component.router, 'navigate');
    await component.tryGoogleLogin();
    expect(component.router.navigate).toHaveBeenCalled();
  });
});
