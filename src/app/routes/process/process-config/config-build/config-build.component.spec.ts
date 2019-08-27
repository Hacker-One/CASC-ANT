import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigBuildComponent } from './config-build.component';

describe('ConfigBuildComponent', () => {
  let component: ConfigBuildComponent;
  let fixture: ComponentFixture<ConfigBuildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigBuildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigBuildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
