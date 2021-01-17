import { reducer, initialState } from './transactions.reducer';
import {
  loadTransactionsSuccess,
  searchByPhrase,
} from './transactions.actions';
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

      expect(result).toEqual({ ...initialState, transactions });
    });
  });

  describe('searchByPhrase action', () => {
    it('should store search phrase', () => {
      const phrase = 'phrase';
      const action = searchByPhrase({ phrase });

      const result = reducer(initialState, action);

      expect(result).toEqual({ ...initialState, phrase });
    });
  });
});
