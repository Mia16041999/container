import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageCreationPageComponent } from './package-creation-page.component';

describe('PackageCreationPageComponent', () => {
  let component: PackageCreationPageComponent;
  let fixture: ComponentFixture<PackageCreationPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PackageCreationPageComponent]
    });
    fixture = TestBed.createComponent(PackageCreationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
