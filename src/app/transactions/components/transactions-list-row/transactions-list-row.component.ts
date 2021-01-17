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
}
