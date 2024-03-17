import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningFactsPageComponent } from './learning-facts-page.component';

describe('LearningFactsPageComponent', () => {
  let component: LearningFactsPageComponent;
  let fixture: ComponentFixture<LearningFactsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LearningFactsPageComponent]
    });
    fixture = TestBed.createComponent(LearningFactsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
