import { TestBed } from '@angular/core/testing';

import { CitySearchService } from './city-search.service';
import {Observable, of} from 'rxjs';

describe('CitySearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CitySearchService = TestBed.get(CitySearchService);
    expect(service).toBeTruthy();
  });

  it('should search for city', () => {
    const service: CitySearchService = TestBed.get(CitySearchService);
    const val = service.searchForCity('Bentonville');
    const test = of([{city: 'Bentonville', state: 'Arkansas'}]);
    expect(val.subscribe).toEqual(test.subscribe);

  });
});
