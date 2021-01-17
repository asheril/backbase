import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionsListComponent {}
