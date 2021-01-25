import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  selectCurrentAsc,
  selectCurrentSorter,
  selectSearchPhrase,
  selectTransactionsFilteredSorted,
} from '../../store/transactions.selectors';
import { Sorter } from '../../models';
import { Store } from '@ngrx/store';
import { State } from '../../../reducers';
import {
  loadTransactions,
  searchByPhrase,
  sortBySorter,
} from '../../store/transactions.actions';

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionsListComponent implements OnInit {
  transactions$ = this.store.select(selectTransactionsFilteredSorted);
  searchPhrase$ = this.store.select(selectSearchPhrase);
  currentSorter$ = this.store.select(selectCurrentSorter);
  currentAsc$ = this.store.select(selectCurrentAsc);
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
