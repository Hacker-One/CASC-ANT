import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionNewsComponent } from './transaction-news.component';

describe('TransactionNewsComponent', () => {
  let component: TransactionNewsComponent;
  let fixture: ComponentFixture<TransactionNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
