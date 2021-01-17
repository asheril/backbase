import { reducer, initialState } from './transactions.reducer';
import { loadTransactionsSuccess } from './transactions.actions';
import { Transaction } from '../models';

describe('Transactions Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  describe('loadTransactionsSuccess action', () => {
    it('should store transactions', () => {
      const transactions = [<Transaction>{}];
      const action = loadTransactionsSuccess({ transactions });

      const result = reducer(initialState, action);

      expect(result).toEqual({ transactions });
    });
  });
});
