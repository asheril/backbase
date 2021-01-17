import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, map, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import * as TransactionsActions from './transactions.actions';
import { TransactionsService } from '../services/transactions/transactions.service';
import { Action } from '@ngrx/store';
import {
  loadTransactionsFailure,
  loadTransactionsSuccess,
} from './transactions.actions';

@Injectable()
export class TransactionsEffects {
  constructor(
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
}
