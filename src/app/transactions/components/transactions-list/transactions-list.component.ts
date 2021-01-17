import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Transaction } from '../../models';

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionsListComponent {
  @Input() transactions: Transaction[];
}
