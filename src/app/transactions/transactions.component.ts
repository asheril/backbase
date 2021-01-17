import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { State } from '../reducers';
import { Store } from '@ngrx/store';
import { loadTransactions } from './store/transactions.actions';
import { selectTransactions } from './store/transactions.selectors';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionsComponent implements OnInit {
  transactions$ = this.store.select(selectTransactions);

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.store.dispatch(loadTransactions());
  }
}
