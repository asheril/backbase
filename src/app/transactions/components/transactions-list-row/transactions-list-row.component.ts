import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Transaction } from '../../models';

@Component({
  selector: 'app-transactions-list-row',
  templateUrl: './transactions-list-row.component.html',
  styleUrls: ['./transactions-list-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionsListRowComponent {
  @Input() transaction: Transaction;

  get date(): string {
    return new Date(this.transaction.dates.valueDate).toLocaleString('en', {
      month: 'short',
      day: '2-digit',
    });
  }

  get merchantName(): string {
    return this.transaction.merchant.name;
  }

  get paymentType(): string {
    return this.transaction.transaction.type;
  }

  get amount(): string {
    return this.transaction.transaction.amountCurrency.amount;
  }
}
