import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonStudyPackagesComponent } from './non-study-packages.component';

describe('NonStudyPackagesComponent', () => {
  let component: NonStudyPackagesComponent;
  let fixture: ComponentFixture<NonStudyPackagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NonStudyPackagesComponent]
    });
    fixture = TestBed.createComponent(NonStudyPackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
