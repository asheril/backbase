import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { concatMap } from 'rxjs/operators';
import { EMPTY, Observable } from 'rxjs';

import * as TransactionsActions from './transactions.actions';

@Injectable()
export class TransactionsEffects {
  loadTransactionss$ = createEffect(
    (): Observable<any> => {
      return this.actions$.pipe(
        ofType(TransactionsActions.loadTransactions),
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        concatMap(() => EMPTY)
      );
    }
  );

  constructor(private actions$: Actions) {}
}
