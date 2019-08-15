import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnNewEditComponent } from './column-new-edit.component';

describe('ColumnNewEditComponent', () => {
  let component: ColumnNewEditComponent;
  let fixture: ComponentFixture<ColumnNewEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColumnNewEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnNewEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
