import { Component, OnInit } from '@angular/core';
import { LearningPackage } from '../learning-package.service';

@Component({
  selector: 'app-achievements-page',
  templateUrl: './achievements-page.component.html',
  styleUrls: ['./achievements-page.component.css']
})
export class AchievementsPageComponent implements OnInit {
  achievedPackages: LearningPackage[] = [];

  constructor() {}

  async ngOnInit(): Promise<void> {
    this.achievedPackages = await this.getAchievedLearningPackages();
  }

  async getAchievedLearningPackages(){
    return JSON.parse(
      await (
          await fetch('/api/achieved')
      ).text()
    )
  }
}
