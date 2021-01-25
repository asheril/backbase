import { Component, Host, Input } from '@angular/core';
import { SortingBarComponent } from '../sorting-bar/sorting-bar.component';
import { Sorter } from '../../models';

@Component({
  selector: 'app-sorting-button',
  templateUrl: './sorting-button.component.html',
  styleUrls: ['./sorting-button.component.scss'],
})
export class SortingButtonComponent {
  @Input() id: Sorter;

  constructor(@Host() private host: SortingBarComponent) {}

  get isActive(): boolean {
    return this.id === this.host.activeId;
  }

  get isAsc(): boolean {
    return this.host.asc;
  }

  click(): void {
    this.host.changed.emit(this.id);
  }
}
