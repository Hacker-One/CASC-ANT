import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjaxTableComponent } from './ajax-table.component';

describe('AjaxTableComponent', () => {
  let component: AjaxTableComponent;
  let fixture: ComponentFixture<AjaxTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjaxTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjaxTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
