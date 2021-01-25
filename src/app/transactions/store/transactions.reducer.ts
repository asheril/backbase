import { createReducer, on } from '@ngrx/store';
import * as TransactionsActions from './transactions.actions';
import { Account, Sorter, Transaction } from '../models';

export const transactionsFeatureKey = 'transactions';

export interface State {
  account: Account;
  transactions: Transaction[];
  phrase: string;
  sorter: Sorter;
  asc: boolean;
}

export const initialState: State = {
  account: { name: 'Free Checking', id: '4692' },
  transactions: [],
  phrase: null,
  sorter: Sorter.Date,
  asc: true,
};

export const reducer = createReducer(
  initialState,
  on(
    TransactionsActions.loadTransactionsSuccess,
    (state, { transactions }) => ({ ...state, transactions })
  ),
  on(TransactionsActions.searchByPhrase, (state, { phrase }) => ({
    ...state,
    phrase,
  })),
  on(TransactionsActions.sortBySorter, (state, { sorter }) => ({
    ...state,
    asc: state.sorter === sorter ? !state.asc : state.asc,
    sorter,
  }))
);
