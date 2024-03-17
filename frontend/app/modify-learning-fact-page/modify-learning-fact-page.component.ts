import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LearningFact } from '../learning-package.service';

@Component({
    selector: 'app-modify-learning-fact-page',
    templateUrl: './modify-learning-fact-page.component.html',
    styleUrls: ['./modify-learning-fact-page.component.css']
})
export class ModifyLearningFactPageComponent implements OnInit {
    factForm: FormGroup;
    packageId: string;
    factId: string;

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
    ) {
        this.packageId = this.route.snapshot.params['packageId'];
        this.factId = this.route.snapshot.params['factId'];

        this.factForm = this.fb.group({
            question: ['', Validators.required],
            answer: ['', Validators.required]
        });
    }

    ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
        this.packageId = this.router.url.split('/')[2]
        this.factId = this.router.url.split('/')[3]
      });
    }

    async modifyFact(factId : string): Promise<void> {
        const updatedFact = this.factForm.value
        const res = await fetch(`/api/learningfact/${factId}`, {
            method: 'PATCH', // or 'PATCH' depending on your API design
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedFact)
        })
        if(res.status === 200){
            return
        }
        else{
            throw Error('fact not modified and error thrown')
        }
    }

    onSubmit():void {
        if (this.factForm.valid) {
            this.modifyFact(this.factId).then((res)=>{
                window.location.href = '/learning-facts-page/'+this.packageId
            });
            //await this.modifyFact(this.packageId, this.currentFact);

            this.router.navigate(['/learning-facts-page', this.packageId]);
        }
    }

    goBack() {
      this.router.navigate(['/learning-facts-page', this.packageId]);
    }

}
