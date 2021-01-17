import { createReducer, on } from '@ngrx/store';
import * as TransactionsActions from './transactions.actions';
import { Transaction } from '../models';

export const transactionsFeatureKey = 'transactions';

export interface State {
  transactions: Transaction[];
}

export const initialState: State = {
  transactions: [],
};

export const reducer = createReducer(
  initialState,
  on(
    TransactionsActions.loadTransactionsSuccess,
    (state, { transactions }) => ({ ...state, transactions })
  )
);
