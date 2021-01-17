import { Action, createReducer, on } from '@ngrx/store';
import * as TransactionsActions from './transactions.actions';

export const transactionsFeatureKey = 'transactions';

export interface State {

}

export const initialState: State = {

};


export const reducer = createReducer(
  initialState,

  on(TransactionsActions.loadTransactions, state => state),

);

