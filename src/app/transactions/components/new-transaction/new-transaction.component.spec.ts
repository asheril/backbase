import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewTransactionComponent } from './new-transaction.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MockComponent } from 'ng-mocks';
import { NewTransactionFormComponent } from '../new-transaction-form/new-transaction-form.component';
import {
  selectCurrentAccount,
  selectCurrentBalance,
} from '../../store/transactions.selectors';
import { Account } from '../../models';

describe('NewTransactionComponent', () => {
  let component: NewTransactionComponent;
  let fixture: ComponentFixture<NewTransactionComponent>;
  let store: MockStore<any>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        NewTransactionComponent,
        MockComponent(NewTransactionFormComponent),
      ],
      providers: [provideMockStore()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTransactionComponent);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    store.overrideSelector(selectCurrentAccount, {} as Account);
    store.overrideSelector(selectCurrentBalance, 0);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
