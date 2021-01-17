import { createReducer, on } from '@ngrx/store';
import * as TransactionsActions from './transactions.actions';
import { Sorter, Transaction } from '../models';

export const transactionsFeatureKey = 'transactions';

export interface State {
  transactions: Transaction[];
  phrase: string;
  sorter: Sorter;
}

export const initialState: State = {
  transactions: [],
  phrase: null,
  sorter: null,
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
    sorter,
  }))
);
