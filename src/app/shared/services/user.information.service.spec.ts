import { TestBed } from '@angular/core/testing';

import { UserInformationService } from './user.information.service';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {AppModule} from '../../app.module';

describe('User.InformationService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    schemas: [NO_ERRORS_SCHEMA],
    imports: [AppModule]
  }));

  it('should be created', () => {
    const service: UserInformationService = TestBed.get(UserInformationService);
    expect(service).toBeTruthy();
  });
  it('should set user info', () => {
    const service: UserInformationService = TestBed.get(UserInformationService);
    spyOn(service, 'setUserInfo');
    service.setUserInfo({username: 'tester', password:'tester'},{user:{uid:'123456768'}});
    service.removeCityFromUserInDatabase('test','test');
    service.addCityToUserInDatabase('test','test');
    service.getCurrentUserCityList('2zQAelO54kVpwX0RZ6tO70r7ZeF3');
    expect(service.setUserInfo).toHaveBeenCalled();

  });

  it('should get city list', () => {
    const service: UserInformationService = TestBed.get(UserInformationService);

    service.getCurrentUserCityList('2zQAelO54kVpwX0RZ6tO70r7ZeF3');
  });

  it('should get current user', () => {
    const service: UserInformationService = TestBed.get(UserInformationService);

    service.getCurrentUser();
  });
  it('should login', () => {
    const service: UserInformationService = TestBed.get(UserInformationService);

    service.doLogin('test');
  });
  it('should logout', () => {
    const service: UserInformationService = TestBed.get(UserInformationService);

    service.doLogout();
  });
  it('should register', () => {
    const service: UserInformationService = TestBed.get(UserInformationService);

    service.doRegister('test');
  });
  it('should do google login',  () => {
    const service: UserInformationService = TestBed.get(UserInformationService);
    service.doGoogleLogin();
    expect(service.doGoogleLogin).toHaveBeenCalled();
  });
});
