import { createReducer, on } from '@ngrx/store';
import * as TransactionsActions from './transactions.actions';
import { Transaction } from '../models';

export const transactionsFeatureKey = 'transactions';

export interface State {
  transactions: Transaction[];
  phrase: string;
}

export const initialState: State = {
  transactions: [],
  phrase: null,
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
  }))
);
