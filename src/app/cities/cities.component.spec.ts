import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import { CitiesComponent } from './cities.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {RouterTestingModule} from "@angular/router/testing";


describe('CitiesComponent', () => {
  let component: CitiesComponent;
  let fixture: ComponentFixture<CitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CitiesComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [HttpClientTestingModule, RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getLocationKey', () => {
    spyOn(component, 'getLocationKey');
    expect(component.getLocationKey).toHaveBeenCalled();
  });

  it('should call getForecast', () => {
    spyOn(component, 'getForecast');
    expect(component.getForecast).toHaveBeenCalled();
  });
});
