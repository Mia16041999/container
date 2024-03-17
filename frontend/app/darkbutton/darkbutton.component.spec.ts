import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DarkbuttonComponent } from './darkbutton.component';

describe('DarkbuttonComponent', () => {
  let component: DarkbuttonComponent;
  let fixture: ComponentFixture<DarkbuttonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DarkbuttonComponent]
    });
    fixture = TestBed.createComponent(DarkbuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
