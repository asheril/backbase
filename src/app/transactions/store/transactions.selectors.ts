import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromTransactions from './transactions.reducer';

export const selectTransactionsState = createFeatureSelector<fromTransactions.State>(
  fromTransactions.transactionsFeatureKey
);

export const selectTransactions = createSelector(
  selectTransactionsState,
  ({ transactions }: fromTransactions.State) => transactions
);

export const selectSearchPhrase = createSelector(
  selectTransactionsState,
  ({ phrase }: fromTransactions.State) => phrase
);

export const selectCurrentSorter = createSelector(
  selectTransactionsState,
  ({ sorter }: fromTransactions.State) => sorter
);
