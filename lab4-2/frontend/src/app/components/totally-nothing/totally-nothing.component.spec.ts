import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotallyNothingComponent } from './totally-nothing.component';

describe('TotallyNothingComponent', () => {
  let component: TotallyNothingComponent;
  let fixture: ComponentFixture<TotallyNothingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TotallyNothingComponent]
    });
    fixture = TestBed.createComponent(TotallyNothingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
