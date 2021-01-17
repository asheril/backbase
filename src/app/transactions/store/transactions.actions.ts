import { createAction, props } from '@ngrx/store';
import { Sorter, Transaction } from '../models';

export const loadTransactions = createAction(
  '[Transactions] Load Transactions'
);

export const loadTransactionsSuccess = createAction(
  '[Transactions] Load Transactions Success',
  props<{ transactions: Transaction[] }>()
);

export const loadTransactionsFailure = createAction(
  '[Transactions] Load Transactions Failure'
);

export const searchByPhrase = createAction(
  '[Transactions] Search By Phrase',
  props<{ phrase: string }>()
);

export const sortBySorter = createAction(
  '[Transactions] Search By Sorter',
  props<{ sorter: Sorter }>()
);
