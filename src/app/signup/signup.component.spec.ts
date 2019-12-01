import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupComponent } from './signup.component';
import {AppModule} from '../app.module';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [  ],
      imports: [ AppModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should try register and fail', () => {
    component.tryRegister('test');
    expect(component.errorMessage).toBeDefined();
  });
  it('should try register and succeed', async () => {
    spyOn(component.authService, 'doRegister').and.returnValue(Promise.resolve('good'));
    await component.tryRegister('test');
    expect(component.successMessage).toEqual('Your account has been created');
  });
  it('should do google login', async () => {
    spyOn(component.authService, 'doGoogleLogin').and.returnValue(Promise.resolve('test'));
    spyOn(component.router, 'navigate');
    await component.tryGoogleLogin();
    expect(component.router.navigate).toHaveBeenCalled();
  });
});
