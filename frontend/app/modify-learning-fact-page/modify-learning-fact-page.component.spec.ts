import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyLearningFactPageComponent } from './modify-learning-fact-page.component';

describe('ModifyLearningFactPageComponent', () => {
  let component: ModifyLearningFactPageComponent;
  let fixture: ComponentFixture<ModifyLearningFactPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModifyLearningFactPageComponent]
    });
    fixture = TestBed.createComponent(ModifyLearningFactPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
