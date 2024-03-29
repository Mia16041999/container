import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LearningFact, LearningPackage } from '../learning-package.service';

@Component({
  selector: 'app-learning-facts-page',
  templateUrl: './learning-facts-page.component.html',
  styleUrls: ['./learning-facts-page.component.css']
})
export class LearningFactsPageComponent implements OnInit {
  package?: LearningPackage;
  private backendUrl = 'http://localhost:4000'; // This should point to your Learning Service

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  async ngOnInit(): Promise<void> {
    const packageId: string | undefined = this.router.url.split('/').pop();
    if (packageId) {
      this.package = await this.getPackageById(packageId);
    }
  }

  async getPackageById(id: string): Promise<LearningPackage> {
    const response = await fetch(`${this.backendUrl}/learningpackages/${id}`, {
      headers: {
        'Cache-Control': 'no-store'
      }
    });
    return await response.json();
  }

  modifyFact(pkg: LearningPackage, fact: LearningFact, event: Event): void {
    event.stopPropagation();
    this.router.navigate(['/modify-learning-fact-page', pkg.id, fact.id]);
  }

  addFact(id: string): void {
    this.router.navigate(['/add-learning-fact-page', id]);
  }

  async deleteFact(factId: string): Promise<void> {
    if (this.package) {
      const fact: LearningFact | undefined = this.package.questions.find(elem => elem.id === factId);
      if (fact) {
        this.package.questions.splice(this.package.questions.indexOf(fact), 1);
        await fetch(`${this.backendUrl}/learningfact/${factId}`, {
          method: 'DELETE'
        });
      }
    }
  }
}
