import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../../reducers';
import {
  selectCurrentAccount,
  selectCurrentBalance,
} from '../../store/transactions.selectors';
import {
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { combineLatest, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { addTransaction } from '../../store/transactions.actions';

@Component({
  selector: 'app-new-transaction',
  templateUrl: './new-transaction.component.html',
  styleUrls: ['./new-transaction.component.scss'],
})
export class NewTransactionComponent implements OnInit, OnDestroy {
  currentAccount$ = this.store.select(selectCurrentAccount);
  currentBalance$ = this.store.select(selectCurrentBalance);
  form: FormGroup = new FormGroup(
    {
      currentBalance: new FormControl(null),
      fromAccount: new FormControl({ value: null, disabled: true }),
      toAccount: new FormControl(null, { validators: [Validators.required] }),
      amount: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.pattern(/^\d+(\.\d{2})?$/),
        ],
      }),
    },
    { validators: [this.validateMinimumAmount(500)] }
  );
  private destroyed$ = new Subject<void>();

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    combineLatest([this.currentAccount$, this.currentBalance$])
      .pipe(takeUntil(this.destroyed$))
      .subscribe(([currentAccount, currentBalance]) => {
        this.form.get('currentBalance').setValue(currentBalance);
        this.form
          .get('fromAccount')
          .setValue(
            `${currentAccount.name} (${currentAccount.id}) - ${currentBalance}`
          );
        this.form.get('toAccount').reset();
        this.form.get('amount').reset();
      });
  }

  addTransaction(): void {
    this.store.dispatch(
      addTransaction({
        transaction: {
          merchant: {
            name: this.form.get('toAccount').value,
            accountNumber: '',
          },
          categoryCode: '#12a580',
          dates: { valueDate: Date.now() },
          transaction: {
            type: '',
            creditDebitIndicator: '',
            amountCurrency: {
              amount: `-${this.form.get('amount').value}`,
              currencyCode: 'EUR',
            },
          },
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  private validateMinimumAmount(
    threshold: number
  ): (form: FormGroup) => ValidationErrors {
    return (form: FormGroup) => {
      const currentBalance = form.get('currentBalance').value;
      const amount = parseFloat(form.get('amount').value);

      return currentBalance - amount < threshold ? { error: true } : null;
    };
  }
}
