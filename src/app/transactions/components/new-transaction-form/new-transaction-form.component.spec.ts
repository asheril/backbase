import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewTransactionFormComponent } from './new-transaction-form.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

describe('NewTransactionFormComponent', () => {
  let component: NewTransactionFormComponent;
  let fixture: ComponentFixture<NewTransactionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewTransactionFormComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTransactionFormComponent);
    component = fixture.componentInstance;
    component.form = new FormGroup({
      fromAccount: new FormControl(null),
      toAccount: new FormControl(null),
      amount: new FormControl(null),
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
