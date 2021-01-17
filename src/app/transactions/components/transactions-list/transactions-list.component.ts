import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { State } from '../../../reducers';
import { Store } from '@ngrx/store';
import { loadTransactions } from '../../store/transactions.actions';

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionsListComponent implements OnInit {
  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.store.dispatch(loadTransactions());
  }
}
