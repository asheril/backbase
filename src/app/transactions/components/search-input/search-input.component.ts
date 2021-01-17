import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  takeUntil,
} from 'rxjs/operators';

const debounceTimeMilliSeconds = 500;

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchInputComponent implements OnInit, OnDestroy {
  @Input() phrase: string;
  @Output() changed = new EventEmitter<string>();
  control: FormControl;
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.control = new FormControl(this.phrase);
    this.control.valueChanges
      .pipe(
        debounceTime(debounceTimeMilliSeconds),
        takeUntil(this.destroy$),
        map((value) => (value === '' ? null : value)),
        distinctUntilChanged()
      )
      .subscribe((value) => this.changed.emit(value));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
