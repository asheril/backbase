import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionsRoutingModule } from './transactions-routing.module';
import { TransactionsComponent } from './transactions.component';
import { StoreModule } from '@ngrx/store';
import * as fromTransactions from './store/transactions.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TransactionsEffects } from './store/transactions.effects';
import { TransactionsListComponent } from './components/transactions-list/transactions-list.component';
import { TransactionsListRowComponent } from './components/transactions-list-row/transactions-list-row.component';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SortingBarComponent } from './components/sorting-bar/sorting-bar.component';
import { SortingButtonComponent } from './components/sorting-button/sorting-button.component';

@NgModule({
  declarations: [
    TransactionsComponent,
    TransactionsListComponent,
    TransactionsListRowComponent,
    SearchInputComponent,
    SortingBarComponent,
    SortingButtonComponent,
  ],
  imports: [
    CommonModule,
    TransactionsRoutingModule,
    StoreModule.forFeature(
      fromTransactions.transactionsFeatureKey,
      fromTransactions.reducer
    ),
    EffectsModule.forFeature([TransactionsEffects]),
    ReactiveFormsModule,
  ],
})
export class TransactionsModule {}
