import * as fromTransactions from './transactions.reducer';
import {
  selectSearchPhrase,
  selectTransactions,
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
    const transactions = [<Transaction>{}];
    const result = selectTransactions({
      [fromTransactions.transactionsFeatureKey]: {
        ...fromTransactions.initialState,
        transactions,
      },
    });

    expect(result).toEqual(transactions);
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
});
