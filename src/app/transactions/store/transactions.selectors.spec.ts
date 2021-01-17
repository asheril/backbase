import * as fromTransactions from './transactions.reducer';
import {
  selectTransactions,
  selectTransactionsState,
} from './transactions.selectors';
import { Transaction } from '../models';

describe('Transactions Selectors', () => {
  it('should select the feature state', () => {
    const result = selectTransactionsState({
      [fromTransactions.transactionsFeatureKey]: fromTransactions.initialState,
    });

    expect(result).toEqual({ transactions: [] });
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
});
