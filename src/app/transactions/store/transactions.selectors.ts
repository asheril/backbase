import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromTransactions from './transactions.reducer';
import { Transaction } from '../models';

export const selectTransactionsState = createFeatureSelector<fromTransactions.State>(
  fromTransactions.transactionsFeatureKey
);

export const selectCurrentAccount = createSelector(
  selectTransactionsState,
  ({ account }: fromTransactions.State) => account
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

export const selectCurrentBalance = createSelector(
  selectTransactions,
  (transactions: Transaction[]) =>
    transactions.reduce((balance: number, transaction: Transaction) => {
      balance += parseFloat(transaction.transaction.amountCurrency.amount);
      return parseFloat(balance.toFixed(2));
    }, 0)
);
