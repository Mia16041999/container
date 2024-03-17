import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {LearningPackage} from '../learning-package.service';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.css']
})

export class HomePageComponent implements OnInit {
    constructor(
        private route: ActivatedRoute,
        private router: Router,
    ) {
    }

    learningPackages!: LearningPackage[];

    async ngOnInit(): Promise<void> {
        this.setCurrentQuote();
        this.learningPackages = await this.getActiveLearningPackages()
    }
    openLearningSession(packageId: string): void {
        this.router.navigate(['learning-session-page', packageId]);
    }

    quotes: string[] = [
        "The only way to do great work is to love what you do. – Steve Jobs",
        "Learning never exhausts the mind. – Leonardo da Vinci",
        "Develop a passion for learning. If you do, you will never cease to grow. – Anthony J. D'Angelo"
    ];
    currentQuote!: string;

    setCurrentQuote(): void {
        const weekNumber = this.getWeekNumber(new Date());
        this.currentQuote = this.quotes[weekNumber % this.quotes.length];
    }

    getWeekNumber(date: Date): number {
        const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
        const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
        return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
    }

    //dirige vers page d'édition du lf
    modifyPackage(id: string, event: Event): void {
        event.stopPropagation();
        this.router.navigate(['/learning-facts-page', id]);
    }

    async getActiveLearningPackages(): Promise<LearningPackage[]> {
        return JSON.parse(await(await fetch('/api/learningpackages/active')).text())
    }

    async deletePackage(id: string, event: Event): Promise<void> {
        event.stopPropagation();
        this.learningPackages = this.learningPackages.filter(p => p.id !== id);
        // send delete of package
        await fetch(`/api/learningpackages/${id}/remove-package`, {
            method: 'PATCH'
        })
    }

    async achievePackage(id: string, event: Event): Promise<void> {
        event.stopPropagation();
        this.learningPackages = this.learningPackages.filter(p => p.id !== id);
        await fetch(`/api/learningpackages/${id}/achieve`, {
            method: 'PATCH'
        })
        // this.loadLearningPackages(); // Refresh
        // this.router.navigate(['/achievements-page']);
    }
}
