import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionsListComponent } from './transactions-list.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { loadTransactions } from '../../store/transactions.actions';

describe('TransactionsListComponent', () => {
  let component: TransactionsListComponent;
  let fixture: ComponentFixture<TransactionsListComponent>;
  let store: MockStore<any>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransactionsListComponent],
      providers: [provideMockStore()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsListComponent);
    store = TestBed.inject(MockStore);
    spyOn(store, 'dispatch');
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load transactions on init', () => {
    expect(store.dispatch).toHaveBeenCalledWith(loadTransactions());
  });
});
