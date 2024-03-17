import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LearningPackage } from '../learning-package.service';

@Component({
  selector: 'app-non-study-packages',
  templateUrl: './non-study-packages.component.html',
  styleUrls: ['./non-study-packages.component.css']
})
export class NonStudyPackagesComponent implements OnInit {
  nonStudiedPackages: LearningPackage[] = [];
  private backendUrl = 'http://localhost:4000'; // Update to the correct backend URL

  constructor(private router: Router) {}

  async ngOnInit(): Promise<void> {
    try {
      this.nonStudiedPackages = await this.getNonActiveLearningPackages();
    } catch (error) {
      console.error('Failed to load non-study packages:', error);
      // Handle the error accordingly, maybe show a message to the user.
    }
  }

  async getNonActiveLearningPackages(): Promise<LearningPackage[]> {
    const response = await fetch(`${this.backendUrl}/non-study-packages`);
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    try {
      const data = await response.json();
      return data as LearningPackage[];
    } catch (error) {
      throw new Error('Data received is not valid JSON.');
    }
  }

  modifyPackage(id: string, event: Event): void {
    event.stopPropagation();
    this.router.navigate(['/modify-learning-package', id]); // Assuming this is the correct route
  }

  async deletePackage(id: string, event: Event): Promise<void> {
    event.stopPropagation();
    try {
      await fetch(`${this.backendUrl}/learningpackages/${id}`, { method: 'DELETE' });
      this.nonStudiedPackages = this.nonStudiedPackages.filter(p => p.id !== id);
    } catch (error) {
      console.error('Failed to delete package:', error);
      // Handle the error accordingly.
    }
  }

  async addPackageToStudy(id: string, event: Event): Promise<void> {
    event.stopPropagation();
    try {
      const response = await fetch(`${this.backendUrl}/learningpackages/${id}/add-to-study`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
      });
      if (!response.ok) {
        throw new Error('Failed to add package to study.');
      }
      this.nonStudiedPackages = this.nonStudiedPackages.filter(p => p.id !== id);
    } catch (error) {
      console.error('Failed to add package to study:', error);
      // Handle the error accordingly.
    }
  }
}
