import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-package-creation-page',
  templateUrl: './package-creation-page.component.html',
  styleUrls: ['./package-creation-page.component.css']
})
export class PackageCreationPageComponent {
  packageForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.packageForm = this.fb.group({
      title: ['', Validators.required],
      desc: ['', Validators.required],
      category: ['', Validators.required],
      difficultyLevel: [1, [Validators.required, Validators.min(1), Validators.max(20)]]
    });
  }

  async addPackage(newPackage: {
    expectedEndDate: null;
    difficultyLevel: any;
    description: any;
    title: any;
    category: any;
    isAchieved: boolean;
    startDate: null
  }): Promise<void> {
    try {
      let response = await fetch('/api/learningpackages', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newPackage)
      });
      let data: any = await response.json();
      return console.log('Package added:', data);
    } catch (error) {
      return console.error('Error adding package:', error);
    }
  }

  onSubmit() {
    if (this.packageForm.valid) {
      const newPackage = {
        title: this.packageForm.value.title,
        description: this.packageForm.value.desc,
        category: this.packageForm.value.category,
        difficultyLevel: this.packageForm.value.difficultyLevel,
        startDate: null,
        expectedEndDate: null,
        isAchieved: false
      };
      this.addPackage(newPackage);
    //await this.addPackage(newPackage);
      this.router.navigate(['/non-study-packages']);
    }
  }
}