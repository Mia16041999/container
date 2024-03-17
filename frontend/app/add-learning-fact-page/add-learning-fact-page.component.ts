import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {LearningPackage} from '../learning-package.service';

@Component({
  selector: 'app-add-learning-fact-page',
  templateUrl: './add-learning-fact-page.component.html',
  styleUrls: ['./add-learning-fact-page.component.css']
})

export class AddLearningFactPageComponent implements OnInit {
  factForm: FormGroup;
  packageId!: string;
  selectedImage: File | null = null;


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.factForm = this.fb.group({
      question: ['', Validators.required],
      answer: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    this.packageId = this.router.url.split('/')[2]
    console.log("ID OF PACKAGE IS : "+this.packageId)
  }
  onImageSelected(event: Event): void {
    const element = event.target as HTMLInputElement;
    const files = element.files;
    if (files && files.length > 0) {
      this.selectedImage = files[0];
    } else {
      this.selectedImage = null;
    }
  }

  /*
  3. Processus d'Upload :
Côté Client (Angular) : L'utilisateur télécharge une image via le formulaire. L'image est envoyée au serveur via une requête HTTP POST avec FormData.
Côté Serveur : Le serveur reçoit l'image, effectue les validations nécessaires, et la stocke soit dans le système de fichiers, soit dans un service cloud.
Génération de l'URL : Après le stockage, le serveur génère une URL pour l'image.
Mise à jour de la Base de Données : Le serveur met à jour la base de données PostgreSQL avec la nouvelle URL de l'image pour le fait d'apprentissage spécifique.
Réponse au Client : Le serveur envoie une réponse au client, éventuellement avec l'URL de l'image ou une confirmation que l'opération a réussi.
*/
/*
4. Utilisation de l'URL de l'Image :
Dans votre application Angular, après avoir reçu l'URL de l'image du serveur, vous pouvez l'affecter à la propriété image de l'objet LearningFact avant de l'envoyer à la base de données.
Exemple de Code Côté Serveur (Pseudo-Code) :
javascript
Copy code
app.post('/upload', (req, res) => {
  // Traiter l'image téléchargée...
  // Stocker l'image...
  // Générer l'URL...

  const imageUrl = 'path/to/image.jpg';
  // Mettre à jour la base de données avec imageUrl...

  res.send({ imageUrl });
});
*/

  async onSubmit() {
    if (this.factForm.valid) {
      const pkg = await this.getPackageById(this.packageId);
      if (pkg) 
      {
        const newFact = {
          question: this.factForm.value.question,
          answer: this.factForm.value.answer,
          image:this.selectedImage ? 'path/to/image' : null,
          reviewCount:0,
          confidenceLevel:null,
          lastReviewedDate:new Date(),
          nextDate:null,
        };
        await this.addFact(this.packageId, newFact);
        window.location.href = '/learning-facts-page/'+this.packageId
        // this.router.navigate(['/learning-facts-page', this.packageId]);
      }
      else
      {
        console.error('Package not found');
        window.location.href = '/'
        this.router.navigate(['/']);
      }
    }
  }

  async addFact(packageId: string, newFact: {
    image: string | null;
    confidenceLevel: null;
    question: any;
    answer: any;
    reviewCount: number;
    lastReviewedDate: Date;
    nextDate: null
  }) {
    const pkg = await this.getPackageById(packageId);
    if (pkg) {
      await fetch(`/api/learningpackages/${packageId}`, {
        method: 'POST', // or 'PATCH' depending on your API design
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newFact)
      })
    }
  }

  async getPackageById(id: string): Promise<LearningPackage | undefined> {
    return JSON.parse(
      await(
          await fetch('/api/learningpackages/'+id)
      ).text()
    )
  }
}
