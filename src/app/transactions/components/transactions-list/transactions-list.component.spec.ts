import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionsListComponent } from './transactions-list.component';
import {
  loadTransactions,
  searchByPhrase,
} from '../../store/transactions.actions';
import { By } from '@angular/platform-browser';
import { SearchInputComponent } from '../search-input/search-input.component';
import { MockComponent } from 'ng-mocks';
import { SortingBarComponent } from '../sorting-bar/sorting-bar.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Sorter, Transaction } from '../../models';
import {
  selectCurrentAsc,
  selectCurrentSorter,
  selectSearchPhrase,
  selectTransactionsFilteredSorted,
} from '../../store/transactions.selectors';
import { SortingButtonComponent } from '../sorting-button/sorting-button.component';
import { TransactionsListRowComponent } from '../transactions-list-row/transactions-list-row.component';

describe('TransactionsListComponent', () => {
  let component: TransactionsListComponent;
  let fixture: ComponentFixture<TransactionsListComponent>;
  let store: MockStore<any>;
  let transactions: Transaction[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TransactionsListComponent,
        MockComponent(SearchInputComponent),
        MockComponent(SortingBarComponent),
        MockComponent(SortingButtonComponent),
        MockComponent(TransactionsListRowComponent),
      ],
      providers: [provideMockStore()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsListComponent);
    store = TestBed.inject(MockStore);
    transactions = [{} as Transaction, {} as Transaction];
    store.overrideSelector(selectTransactionsFilteredSorted, transactions);
    store.overrideSelector(selectSearchPhrase, 'phrase');
    store.overrideSelector(selectCurrentSorter, Sorter.Amount);
    store.overrideSelector(selectCurrentAsc, true);
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

  it('should render transaction rows', () => {
    const transactionsListRowComponents: TransactionsListRowComponent[] = fixture.debugElement
      .queryAll(By.directive(TransactionsListRowComponent))
      .map((debugElement) => debugElement.componentInstance);
    expect(transactionsListRowComponents[0].transaction).toEqual(
      transactions[0]
    );
    expect(transactionsListRowComponents[1].transaction).toEqual(
      transactions[1]
    );
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
