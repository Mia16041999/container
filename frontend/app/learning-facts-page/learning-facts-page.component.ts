import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LearningFact, LearningPackage} from '../learning-package.service';

@Component({
  selector: 'app-learning-facts-page',
  templateUrl: './learning-facts-page.component.html',
  styleUrls: ['./learning-facts-page.component.css']
})
export class LearningFactsPageComponent implements OnInit {
  package?: LearningPackage;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {}
  async ngOnInit(): Promise<void> {
    const packageId : string | undefined = this.router.url.split('/').pop()
    this.package = await this.getPackageById(packageId)
  }

  async getPackageById(id: string | undefined): Promise<LearningPackage> {
    return JSON.parse(
      await(
          await fetch('/api/learningpackages/'+id, {
            headers:{
              'Cache-Control':'no-store'
            }
          })
      ).text()
    )
  }
  modifyFact(pkg :LearningPackage, fact: LearningFact, event: Event): void {
    event.stopPropagation();
    this.router.navigate(['/modify-learning-fact-page', pkg.id, fact.id]);
  }
  addFact(id:string): void {
    this.router.navigate(['/add-learning-fact-page', id]);
  }
  async deleteFact(factId: string): Promise<void>{
    const fact : any = this.package?.questions.find(function(elem){
      return elem.id === factId
    })
    this.package?.questions.splice(this.package?.questions.indexOf(fact), 1)
    await fetch('/api/learningfact/'+factId, {
      method:'DELETE'
    })
  }
}
