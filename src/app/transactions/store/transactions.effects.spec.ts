import { TestBed, waitForAsync } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { of, ReplaySubject, throwError } from 'rxjs';

import { TransactionsEffects } from './transactions.effects';
import { TransactionsService } from '../services/transactions/transactions.service';
import {
  loadTransactions,
  loadTransactionsFailure,
  loadTransactionsSuccess,
  searchByPhrase,
} from './transactions.actions';
import { Sorter, Transaction } from '../models';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  selectCurrentSorter,
  selectSearchPhrase,
} from './transactions.selectors';

describe('TransactionsEffects', () => {
  let store: MockStore<any>;
  let actions$: ReplaySubject<any>;
  let effects: TransactionsEffects;
  let transactionsService: jasmine.SpyObj<TransactionsService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TransactionsEffects,
        provideMockStore(),
        provideMockActions(() => actions$),
        {
          provide: TransactionsService,
          useValue: jasmine.createSpyObj<TransactionsService>([
            'getTransactions',
          ]),
        },
      ],
    });

    store = TestBed.inject(MockStore);
    actions$ = new ReplaySubject();
    effects = TestBed.inject(TransactionsEffects);
    transactionsService = TestBed.inject(
      TransactionsService
    ) as jasmine.SpyObj<TransactionsService>;
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('loadTransactions$', () => {
    const phrase = 'phrase';
    const sorter = Sorter.Amount;

    beforeEach(() => {
      store.overrideSelector(selectSearchPhrase, phrase);
      store.overrideSelector(selectCurrentSorter, sorter);
    });

    it(
      'should load transactions based on the current search phrase and sorter',
      waitForAsync(() => {
        transactionsService.getTransactions.and.returnValue(of([]));
        actions$.next(loadTransactions());

        effects.loadTransactions$.subscribe(
          () =>
            expect(transactionsService.getTransactions).toHaveBeenCalledWith(
              phrase,
              sorter
            ),
          fail
        );
      })
    );

    it(
      'should dispatch loadTransactionsSuccess on success',
      waitForAsync(() => {
        const transactions = [<Transaction>{}];
        transactionsService.getTransactions.and.returnValue(of(transactions));
        actions$.next(loadTransactions());

        effects.loadTransactions$.subscribe(
          (action) =>
            expect(action).toEqual(loadTransactionsSuccess({ transactions })),
          fail
        );
      })
    );

    it(
      'should dispatch loadTransactionsFailure on error',
      waitForAsync(() => {
        transactionsService.getTransactions.and.returnValue(
          throwError(new Error('error'))
        );
        actions$.next(loadTransactions());

        effects.loadTransactions$.subscribe(
          (action) => expect(action).toEqual(loadTransactionsFailure()),
          fail
        );
      })
    );
  });

  describe('searchByPhrase$', () => {
    it(
      'should dispatch loadTransactions',
      waitForAsync(() => {
        actions$.next(searchByPhrase({ phrase: 'phrase' }));

        effects.searchByPhrase$.subscribe(
          (action) => expect(action).toEqual(loadTransactions()),
          fail
        );
      })
    );
  });
});
