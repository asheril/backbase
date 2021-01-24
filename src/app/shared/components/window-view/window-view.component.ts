import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-window-view',
  templateUrl: './window-view.component.html',
  styleUrls: ['./window-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WindowViewComponent {
  @Input() title: string;
}
