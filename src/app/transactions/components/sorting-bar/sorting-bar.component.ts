import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Sorter } from '../../models';

@Component({
  selector: 'app-sorting-bar',
  templateUrl: './sorting-bar.component.html',
  styleUrls: ['./sorting-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SortingBarComponent {
  @Input() activeId: string;
  @Output() changed = new EventEmitter<Sorter>();
}
