import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryNewEditComponent } from './library-new-edit.component';

describe('LibraryNewEditComponent', () => {
  let component: LibraryNewEditComponent;
  let fixture: ComponentFixture<LibraryNewEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibraryNewEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibraryNewEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
