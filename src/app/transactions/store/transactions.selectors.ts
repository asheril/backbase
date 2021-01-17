import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromTransactions from './transactions.reducer';

export const selectTransactionsState = createFeatureSelector<fromTransactions.State>(
  fromTransactions.transactionsFeatureKey
);
