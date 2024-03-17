import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLearningFactPageComponent } from './add-learning-fact-page.component';

describe('AddLearningFactPageComponent', () => {
  let component: AddLearningFactPageComponent;
  let fixture: ComponentFixture<AddLearningFactPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddLearningFactPageComponent]
    });
    fixture = TestBed.createComponent(AddLearningFactPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
