import { Component, OnInit } from '@angular/core';
import { LearningPackage } from '../learning-package.service';

@Component({
  selector: 'app-achievements-page',
  templateUrl: './achievements-page.component.html',
  styleUrls: ['./achievements-page.component.css']
})
export class AchievementsPageComponent implements OnInit {
  achievedPackages: LearningPackage[] = [];
  private backendUrl = 'http://localhost:4000'; // Use the actual URL and port for the learning service

  constructor() {}

  async ngOnInit(): Promise<void> {
    this.achievedPackages = await this.getAchievedLearningPackages();
  }

  async getAchievedLearningPackages(): Promise<LearningPackage[]> {
    const response = await fetch(`${this.backendUrl}/achieved`);
    return await response.json();
  }
}
