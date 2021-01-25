import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionsListRowComponent } from './transactions-list-row.component';
import { Transaction } from '../../models';

describe('TransactionsListRowComponent', () => {
  let component: TransactionsListRowComponent;
  let fixture: ComponentFixture<TransactionsListRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransactionsListRowComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsListRowComponent);
    component = fixture.componentInstance;
    component.transaction = {
      merchant: {},
      dates: {},
      transaction: { amountCurrency: {} },
    } as Transaction;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
