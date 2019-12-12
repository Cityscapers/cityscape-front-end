import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CitySearchComponent } from './city-search.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {AppModule} from '../../../../app.module';
import * as firebase from 'firebase';

describe('CitySearchComponent', () => {
  let component: CitySearchComponent;
  let fixture: ComponentFixture<CitySearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [AppModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should search for city', () => {
    component.searchForCity({target: {value: 'Bentonville'}});
    spyOn(component.searchService, 'searchForCity');
    expect(component.searchService.searchForCity).toHaveBeenCalled();
  });

  it('should try to add a city', async () => {
    spyOn(component.userService, 'getCurrentUserCityList').and.returnValue(Promise.resolve
    ([{ city: 'Fayetteville', state: 'Arkansas'}]));
    await component.addCity({city: 'Fayetteville', state: 'Arkansas'});
    expect(component.toastService.error).toHaveBeenCalled();
    expect(component.toastService.success).toHaveBeenCalled();
  });
  it('should do something', () => {
    expect(component).toBeDefined();
  });
});
