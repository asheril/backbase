import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionsRoutingModule } from './transactions-routing.module';
import { TransactionsListComponent } from './components/transactions-list/transactions-list.component';
import { StoreModule } from '@ngrx/store';
import * as fromTransactions from './store/transactions.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TransactionsEffects } from './store/transactions.effects';

@NgModule({
  declarations: [TransactionsListComponent],
  imports: [CommonModule, TransactionsRoutingModule, StoreModule.forFeature(fromTransactions.transactionsFeatureKey, fromTransactions.reducer), EffectsModule.forFeature([TransactionsEffects])]
})
export class TransactionsModule {}
