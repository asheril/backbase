import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionsRoutingModule } from './transactions-routing.module';
import { TransactionsListComponent } from './components/transactions-list/transactions-list.component';

@NgModule({
  declarations: [TransactionsListComponent],
  imports: [CommonModule, TransactionsRoutingModule]
})
export class TransactionsModule {}
