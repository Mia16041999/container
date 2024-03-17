import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningSessionPageComponent } from './learning-session-page.component';

describe('LearningSessionPageComponent', () => {
  let component: LearningSessionPageComponent;
  let fixture: ComponentFixture<LearningSessionPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LearningSessionPageComponent]
    });
    fixture = TestBed.createComponent(LearningSessionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
