import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessPortalComponent } from './process-portal.component';

describe('ProcessPortalComponent', () => {
  let component: ProcessPortalComponent;
  let fixture: ComponentFixture<ProcessPortalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessPortalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
