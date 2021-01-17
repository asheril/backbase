import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionsComponent } from './transactions.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { loadTransactions, searchByPhrase } from './store/transactions.actions';
import { MockComponent } from 'ng-mocks';
import { TransactionsListComponent } from './components/transactions-list/transactions-list.component';
import { Sorter, Transaction } from './models';
import {
  selectCurrentSorter,
  selectSearchPhrase,
  selectTransactions,
} from './store/transactions.selectors';
import { By } from '@angular/platform-browser';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { SortingBarComponent } from './components/sorting-bar/sorting-bar.component';

describe('TransactionsComponent', () => {
  let component: TransactionsComponent;
  let fixture: ComponentFixture<TransactionsComponent>;
  let store: MockStore<any>;
  let transactions: Transaction[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TransactionsComponent,
        MockComponent(TransactionsListComponent),
        MockComponent(SearchInputComponent),
        MockComponent(SortingBarComponent),
      ],
      providers: [provideMockStore()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsComponent);
    store = TestBed.inject(MockStore);
    transactions = [<Transaction>{}];
    store.overrideSelector(selectTransactions, transactions);
    store.overrideSelector(selectSearchPhrase, 'phrase');
    store.overrideSelector(selectCurrentSorter, Sorter.Amount);
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

  it('should render transactions list', () => {
    const transactionsListComponent: TransactionsListComponent = fixture.debugElement.query(
      By.directive(TransactionsListComponent)
    ).componentInstance;
    expect(transactionsListComponent.transactions).toEqual(transactions);
  });

  it('should render the search', () => {
    const searchInputComponent: SearchInputComponent = fixture.debugElement.query(
      By.directive(SearchInputComponent)
    ).componentInstance;
    expect(searchInputComponent.phrase).toEqual('phrase');
  });

  it('should start searching on user action', () => {
    const searchInputComponent: SearchInputComponent = fixture.debugElement.query(
      By.directive(SearchInputComponent)
    ).componentInstance;
    searchInputComponent.changed.emit('search');
    expect(store.dispatch).toHaveBeenCalledWith(
      searchByPhrase({ phrase: 'search' })
    );
  });
});
