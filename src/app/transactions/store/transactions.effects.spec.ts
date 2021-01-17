import { async, TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, ReplaySubject, throwError } from 'rxjs';

import { TransactionsEffects } from './transactions.effects';
import { TransactionsService } from '../services/transactions/transactions.service';
import {
  loadTransactions,
  loadTransactionsFailure,
  loadTransactionsSuccess,
} from './transactions.actions';
import { Transaction } from '../models';

describe('TransactionsEffects', () => {
  let actions$: ReplaySubject<any>;
  let effects: TransactionsEffects;
  let transactionsService: jasmine.SpyObj<TransactionsService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TransactionsEffects,
        provideMockActions(() => actions$),
        {
          provide: TransactionsService,
          useValue: jasmine.createSpyObj<TransactionsService>([
            'getTransactions',
          ]),
        },
      ],
    });

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
    it('should dispatch loadTransactionsSuccess on success', async(() => {
      const transactions = [<Transaction>{}];
      transactionsService.getTransactions.and.returnValue(of(transactions));
      actions$.next(loadTransactions());

      effects.loadTransactions$.subscribe(
        (action) =>
          expect(action).toEqual(loadTransactionsSuccess({ transactions })),
        fail
      );
    }));

    it('should dispatch loadTransactionsFailure on error', async(() => {
      transactionsService.getTransactions.and.returnValue(
        throwError(new Error('error'))
      );
      actions$.next(loadTransactions());

      effects.loadTransactions$.subscribe(
        (action) => expect(action).toEqual(loadTransactionsFailure()),
        fail
      );
    }));
  });
});
