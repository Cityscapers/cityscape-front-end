import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import {AppModule} from '../app.module';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ],
      imports: [AppModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set user info', () => {
    spyOn(component, 'setUserInfo');
    component.setUserInfo();
    expect(component.setUserInfo).toHaveBeenCalled();
  });

  it('should set favorite state', () => {
    let m = component.calculateFavoriteState([]);
    expect(m).toBe('No favorite state!');
  });
});
