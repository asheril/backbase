import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-header-logo',
  templateUrl: './header-logo.component.html',
  styleUrls: ['./header-logo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderLogoComponent {
  @Input() title: string;
}
