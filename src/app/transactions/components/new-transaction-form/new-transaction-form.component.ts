import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-transaction-form',
  templateUrl: './new-transaction-form.component.html',
  styleUrls: ['./new-transaction-form.component.scss'],
})
export class NewTransactionFormComponent {
  @Input() form: FormGroup;
  @Output() submitted = new EventEmitter<void>();

  get fromAccount(): AbstractControl {
    return this.form.get('fromAccount');
  }

  get toAccount(): AbstractControl {
    return this.form.get('toAccount');
  }

  get amount(): AbstractControl {
    return this.form.get('amount');
  }

  submit(): void {
    if (this.form.valid) {
      this.submitted.emit();
    }
  }
}
