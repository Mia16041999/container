import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LearningPackage } from '../learning-package.service';

@Component({
  selector: 'app-non-study-packages',
  templateUrl: './non-study-packages.component.html',
  styleUrls: ['./non-study-packages.component.css']
})
export class NonStudyPackagesComponent {
  nonStudiedPackages: LearningPackage[] = [];

  constructor(private router: Router) {}

    async ngOnInit(): Promise<void> {
      this.nonStudiedPackages = await this.getNonActiveLearningPackages();
      console.log(this.nonStudiedPackages)
  }

  async getNonActiveLearningPackages(): Promise<LearningPackage[]> {
    const response =  await fetch('/api/non-study-packages')
    const text = await response.text()
    return JSON.parse(text)
  }

  modifyPackage(id: string, event: Event): void {
    event.stopPropagation();
    this.router.navigate(['/learning-facts-page', id]);
  }
  async deletePackage(id: string, event:Event): Promise<void> {
    event.stopPropagation()
    fetch(`/api/learningpackages/${id}`, { method: 'DELETE' })
        .then(response => response.json())
        .then(() => {
            console.log(`Package ${id} deleted`);
            // Update the local state or refresh the list from the backend
        })
        .catch(error => console.error('Error deleting package:', error));
    this.nonStudiedPackages = this.nonStudiedPackages.filter(p => p.id !== id);
  }

  async addPackageToStudy(id: string, event: Event): Promise<void> {
    event.stopPropagation();
    this.nonStudiedPackages = this.nonStudiedPackages.filter(p => p.id !== id);
    await fetch(`/api/learningpackages/${id}/add-to-study`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
    })

  }
}
