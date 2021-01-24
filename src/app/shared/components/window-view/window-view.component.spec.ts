import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WindowViewComponent } from './window-view.component';

describe('WindowViewComponent', () => {
  let component: WindowViewComponent;
  let fixture: ComponentFixture<WindowViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WindowViewComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WindowViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
