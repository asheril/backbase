import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SortingButtonComponent } from './sorting-button.component';
import { SortingBarComponent } from '../sorting-bar/sorting-bar.component';
import { Component } from '@angular/core';
import { MockComponent } from 'ng-mocks';
import { By } from '@angular/platform-browser';

describe('SortingButtonComponent', () => {
  let component: SortingButtonComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  @Component({
    template:
      '<app-sorting-bar activeId="id"><app-sorting-button id="id"></app-sorting-button></app-sorting-bar>',
  })
  class TestHostComponent {}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TestHostComponent,
        SortingButtonComponent,
        MockComponent(SortingBarComponent),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.debugElement.query(By.directive(SortingButtonComponent))
      .componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
