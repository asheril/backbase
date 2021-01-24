import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMapTo, map, mapTo, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import * as TransactionsActions from './transactions.actions';
import { TransactionsService } from '../services/transactions/transactions.service';
import { Action, Store } from '@ngrx/store';
import {
  addTransactionFailure,
  addTransactionSuccess,
  loadTransactions,
  loadTransactionsFailure,
  loadTransactionsSuccess,
} from './transactions.actions';
import { State } from '../../reducers';

@Injectable()
export class TransactionsEffects {
  constructor(
    private store: Store<State>,
    private actions$: Actions,
    private transactionsService: TransactionsService
  ) {}

  loadTransactions$ = createEffect(
    (): Observable<Action> => {
      return this.actions$.pipe(
        ofType(TransactionsActions.loadTransactions),
        switchMap(() =>
          this.transactionsService.getTransactions().pipe(
            map((transactions) => loadTransactionsSuccess({ transactions })),
            catchError(() => of(loadTransactionsFailure()))
          )
        )
      );
    }
  );

  addTransaction$ = createEffect(
    (): Observable<Action> => {
      return this.actions$.pipe(
        ofType(TransactionsActions.addTransaction),
        switchMap(({ transaction }) =>
          this.transactionsService.addTransaction(transaction).pipe(
            concatMapTo([addTransactionSuccess(), loadTransactions()]),
            catchError(() => of(addTransactionFailure()))
          )
        )
      );
    }
  );
}
