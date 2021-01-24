import * as fromTransactions from './transactions.reducer';
import {
  selectCurrentBalance,
  selectSearchPhrase,
  selectTransactions,
  selectTransactionsFilteredSorted,
  selectTransactionsState,
} from './transactions.selectors';
import { Transaction } from '../models';

describe('Transactions Selectors', () => {
  it('should select the feature state', () => {
    const result = selectTransactionsState({
      [fromTransactions.transactionsFeatureKey]: fromTransactions.initialState,
    });

    expect(result).toEqual(fromTransactions.initialState);
  });

  it('should select transactions', () => {
    const transactions = [{} as Transaction];
    const result = selectTransactions({
      [fromTransactions.transactionsFeatureKey]: {
        ...fromTransactions.initialState,
        transactions,
      },
    });

    expect(result).toEqual(transactions);
  });

  it('should select filtered transactions', () => {
    const transactions = [
      { merchant: { name: 'abc' } } as Transaction,
      { merchant: { name: 'def' } } as Transaction,
    ];
    const result = selectTransactionsFilteredSorted({
      [fromTransactions.transactionsFeatureKey]: {
        ...fromTransactions.initialState,
        transactions,
        sorter: null,
        phrase: 'abc',
      },
    });

    expect(result).toEqual([{ merchant: { name: 'abc' } } as Transaction]);
  });

  it('should select search phrase', () => {
    const phrase = 'phrase';
    const result = selectSearchPhrase({
      [fromTransactions.transactionsFeatureKey]: {
        ...fromTransactions.initialState,
        phrase,
      },
    });

    expect(result).toEqual(phrase);
  });

  it('should select current balance', () => {
    const result = selectCurrentBalance.projector([
      { transaction: { amountCurrency: { amount: 5 } } },
      { transaction: { amountCurrency: { amount: 10 } } },
      { transaction: { amountCurrency: { amount: -15 } } },
      { transaction: { amountCurrency: { amount: -10 } } },
      { transaction: { amountCurrency: { amount: 15 } } },
    ]);

    expect(result).toEqual(5);
  });
});
