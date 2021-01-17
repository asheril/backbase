import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import {
  catchError,
  map,
  mapTo,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import * as TransactionsActions from './transactions.actions';
import { TransactionsService } from '../services/transactions/transactions.service';
import { Action, Store } from '@ngrx/store';
import {
  loadTransactions,
  loadTransactionsFailure,
  loadTransactionsSuccess,
} from './transactions.actions';
import { State } from '../../reducers';
import { selectSearchPhrase } from './transactions.selectors';

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
        withLatestFrom(this.store.select(selectSearchPhrase)),
        switchMap(([, searchPhrase]) =>
          this.transactionsService.getTransactions(searchPhrase).pipe(
            map((transactions) => loadTransactionsSuccess({ transactions })),
            catchError(() => of(loadTransactionsFailure()))
          )
        )
      );
    }
  );

  searchByPhrase$ = createEffect(
    (): Observable<Action> => {
      return this.actions$.pipe(
        ofType(TransactionsActions.searchByPhrase),
        mapTo(loadTransactions())
      );
    }
  );
}
