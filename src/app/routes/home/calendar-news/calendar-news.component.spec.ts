import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarNewsComponent } from './calendar-news.component';

describe('CalendarNewsComponent', () => {
  let component: CalendarNewsComponent;
  let fixture: ComponentFixture<CalendarNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
