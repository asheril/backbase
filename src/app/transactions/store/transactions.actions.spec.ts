import * as fromTransactions from './transactions.actions';

describe('loadTransactions', () => {
  it('should return an action', () => {
    expect(fromTransactions.loadTransactions().type).toBe(
      '[Transactions] Load Transactions'
    );
  });
});
