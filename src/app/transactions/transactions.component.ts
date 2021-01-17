import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { State } from '../reducers';
import { Store } from '@ngrx/store';
import {
  loadTransactions,
  searchByPhrase,
  sortBySorter,
} from './store/transactions.actions';
import {
  selectCurrentSorter,
  selectSearchPhrase,
  selectTransactions,
} from './store/transactions.selectors';
import { Sorter } from './models';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionsComponent implements OnInit {
  transactions$ = this.store.select(selectTransactions);
  searchPhrase$ = this.store.select(selectSearchPhrase);
  currentSorter$ = this.store.select(selectCurrentSorter);
  sorter = Sorter;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.store.dispatch(loadTransactions());
  }

  searchByPhrase(phrase: string): void {
    this.store.dispatch(searchByPhrase({ phrase }));
  }

  searchBySorter(sorter: Sorter): void {
    this.store.dispatch(sortBySorter({ sorter }));
  }
}
