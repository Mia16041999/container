import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LearningPackage} from '../learning-package.service';

@Component({
    selector: 'app-learning-session-page',
    templateUrl: './learning-session-page.component.html',
    styleUrls: ['./learning-session-page.component.css']
})

export class LearningSessionPageComponent {
    package: any;
    currentFactID: string = "";
    showAnswer = false;
    isLastQuestion = false;
    showFinish = false;
    currentFactIndex = 0;
    learningPackages: [] = []

    constructor(
        private route: ActivatedRoute,
        private router: Router
    ) {
    }

    async getPackageById(id: string): Promise<LearningPackage | undefined> {
        return JSON.parse(
            await (
                await fetch('/api/learningpackages/' + id)
            ).text()
        )
    }

    async ngOnInit() {
        const packageId = this.route.snapshot.paramMap.get('id')!;
        this.package = await this.getPackageById(packageId);
        this.isLastQuestion = this.currentFactIndex === this.package.questions.length - 1
    }

    toggleAnswer() {
        this.showAnswer = true;
    }

    setDifficultyAndGoToNextFact(difficulty: number): void {
        this.updateFact(difficulty);
        if (this.currentFactIndex < this.package.questions.length - 1) {
            this.currentFactIndex++;
            //await this.updateFact(this.package.id, this.currentFactIndex, difficulty);
            this.showAnswer = false;
            this.isLastQuestion = this.currentFactIndex === this.package.questions.length - 1;
        } else {
            this.showFinish = true;
        }
    }

    async updateFact(confidenceLevel: number): Promise<void> {
        const fact = this.package.questions[this.currentFactIndex]
        if (fact) {
            fact.reviewCount += 1;
            fact.lastReviewedDate = new Date(); // Today
            fact.confidenceLevel = confidenceLevel;
            let nextDate;
            switch (confidenceLevel) {
                case 1:
                    nextDate = new Date(fact.lastReviewedDate.getTime() + 7 * 24 * 60 * 60 * 1000); // +1 week
                    fact.nextDate = nextDate
                    break;
                case 2:
                    nextDate = new Date(fact.lastReviewedDate.getTime() + 4 * 24 * 60 * 60 * 1000); // +4 days
                    fact.nextDate = nextDate
                    break;
                case 3:
                    nextDate = new Date(fact.lastReviewedDate.getTime() + 1 * 24 * 60 * 60 * 1000); // +1 day
                    fact.nextDate = nextDate
                    break;
                case 4:
                    nextDate = new Date(fact.lastReviewedDate.getTime()); // today
                    fact.nextDate = nextDate
                    break;
            }
            await fetch('/api/learningfact',{
                method:'PATCH',
                headers: {'Content-Type': 'application/json'},
                body:JSON.stringify(fact)
            })
        }
    }

    finishPackage() {
        this.router.navigate(['/home-page']);
    }
}