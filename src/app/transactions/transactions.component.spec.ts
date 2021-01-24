import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionsComponent } from './transactions.component';
import { MockComponent } from 'ng-mocks';
import { TransactionsListComponent } from './components/transactions-list/transactions-list.component';
import { By } from '@angular/platform-browser';
import { NewTransactionComponent } from './components/new-transaction/new-transaction.component';

describe('TransactionsComponent', () => {
  let component: TransactionsComponent;
  let fixture: ComponentFixture<TransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TransactionsComponent,
        MockComponent(TransactionsListComponent),
        MockComponent(NewTransactionComponent),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the transactions list container', () => {
    expect(
      fixture.debugElement.query(By.directive(TransactionsListComponent))
    ).toBeTruthy();
  });

  it('should render the new transaction container', () => {
    expect(
      fixture.debugElement.query(By.directive(NewTransactionComponent))
    ).toBeTruthy();
  });
});
