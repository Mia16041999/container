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
  private backendUrl = 'http://localhost:4000'; // Set this to your learning service URL

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

  async addPackage(newPackage: any): Promise<void> {
    try {
      let response = await fetch(`${this.backendUrl}/learningpackages`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newPackage)
      });
    
      if (response.ok) {
        // Assuming the server might not always return JSON
        const contentType = response.headers.get('Content-Type');
        if (contentType && contentType.includes('application/json')) {
          let data = await response.json();
          console.log('Package added:', data);
          this.router.navigate(['/non-study-packages']); // Navigate after package is added
        } else {
          console.log('Package created, no JSON returned');
          this.router.navigate(['/non-study-packages']);
        }
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error adding package:', error);
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
    }
  }
}
