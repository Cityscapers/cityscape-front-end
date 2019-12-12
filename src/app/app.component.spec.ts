import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import { AppComponent } from './app.component';
import {AppModule} from './app.module';
import {NO_ERRORS_SCHEMA} from '@angular/core';


describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Cityscape'`, () => {
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Cityscape');
  });

  it('should render title', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('Cityscape app is running!');
  });

  it( 'should reference database when user logged in', () => {
    spyOnProperty(component, 'isUserLoggedIn', 'get').and.returnValue(true);
    component.setCurrentUsername();
    expect(component.currentUsername).toBeDefined();
  });
});
