import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationBtnComponent } from './application-btn.component';

describe('ApplicationBtnComponent', () => {
  let component: ApplicationBtnComponent;
  let fixture: ComponentFixture<ApplicationBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
