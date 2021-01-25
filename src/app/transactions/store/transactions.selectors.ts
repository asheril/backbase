import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromTransactions from './transactions.reducer';
import { Sorter, Transaction } from '../models';

export const selectTransactionsState = createFeatureSelector<fromTransactions.State>(
  fromTransactions.transactionsFeatureKey
);

export const selectCurrentAccount = createSelector(
  selectTransactionsState,
  ({ account }: fromTransactions.State) => account
);

export const selectSearchPhrase = createSelector(
  selectTransactionsState,
  ({ phrase }: fromTransactions.State) => phrase
);

export const selectCurrentSorter = createSelector(
  selectTransactionsState,
  ({ sorter }: fromTransactions.State) => sorter
);

export const selectCurrentAsc = createSelector(
  selectTransactionsState,
  ({ asc }: fromTransactions.State) => asc
);

export const selectTransactions = createSelector(
  selectTransactionsState,
  ({ transactions }: fromTransactions.State) => transactions
);

export const selectTransactionsFilteredSorted = createSelector(
  selectTransactionsState,
  selectSearchPhrase,
  selectCurrentSorter,
  selectCurrentAsc,
  (
    { transactions }: fromTransactions.State,
    phrase: string,
    sorter: Sorter,
    asc: boolean
  ) => {
    return transactions
      .filter((transaction) =>
        phrase
          ? transaction.merchant.name
              .toLowerCase()
              .includes(phrase.toLowerCase())
          : true
      )
      .sort((a, b) => {
        if (!asc) {
          [a, b] = [b, a];
        }
        switch (sorter) {
          case Sorter.Amount:
            return (
              parseFloat(a.transaction.amountCurrency.amount) -
              parseFloat(b.transaction.amountCurrency.amount)
            );
          case Sorter.Beneficiary:
            return a.merchant.name.localeCompare(b.merchant.name);
          case Sorter.Date:
            return a.dates.valueDate - b.dates.valueDate;
        }
      });
  }
);

export const selectCurrentBalance = createSelector(
  selectTransactions,
  (transactions: Transaction[]) =>
    transactions.reduce((balance: number, transaction: Transaction) => {
      balance += parseFloat(transaction.transaction.amountCurrency.amount);
      return parseFloat(balance.toFixed(2));
    }, 0)
);
