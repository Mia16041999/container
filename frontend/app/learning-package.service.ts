import { Injectable } from '@angular/core';

export interface LearningPackage {
    id:string;
    category: string;
    description:string;
    title: string;
    difficultyLevel: number;
    startDate: Date | null;
    expectedEndDate: Date | null;
    questions: LearningFact[];
    isAchieved?: boolean;
    isStudyProgram?:boolean;
  }
  export interface LearningFact {
    id:string
    question: string;
    answer:string;
    image?: string | null; // default null and optionnal
    reviewCount: number; // default 0
    confidenceLevel: number | null;
    lastReviewedDate: Date | null;
    nextDate: Date | null;
  }
  export interface user{
    id:number;
    username:string;
  }

@Injectable({
  providedIn: 'root'
})

export class LearningPackageService {
  private learningPackages: LearningPackage[] = [] /* = [
    {
      id:1,
      category: 'Programming',
      description: 'Study module about TypeScript',
      title: 'TypeScript',
      difficultyLevel: 5,
      startDate: new Date(2023, 11, 24), //24 december
      expectedEndDate: new Date(2024, 0, 7), //+2 weeks
      questions: [
          { id:1, question: "Qu'est-ce que TypeScript et comment se différencie-t-il de JavaScript?", answer: "TypeScript est un sur-ensemble de JavaScript qui ajoute des types statiques.",image:null,reviewCount:0, confidenceLevel:null, lastReviewedDate:null, nextDate:null  },
          { id:2, question: "Comment déclarer une variable de type chaîne de caractères en TypeScript?", answer: "let nomVariable: string;", image:null,reviewCount:0, confidenceLevel:null, lastReviewedDate:null, nextDate:null },
          { id:3, question: "Quelle est la syntaxe pour créer une interface en TypeScript?", answer: "interface NomInterface { propriete: type; }", image:null,reviewCount:0, confidenceLevel:null, lastReviewedDate:null, nextDate:null  },
          { id:4, question: "Peut-on utiliser TypeScript avec des frameworks JavaScript comme React ou Angular?", answer: "Oui, TypeScript est compatible avec la plupart des frameworks JavaScript.", image:null,reviewCount:0, confidenceLevel:null, lastReviewedDate:null, nextDate:null  },
          { id:5, question: "Quel est l'avantage principal de l'utilisation des types en TypeScript?", answer: "Il améliore la fiabilité du code en ajoutant une vérification de type au moment de la compilation.", image:null,reviewCount:0, confidenceLevel:null, lastReviewedDate:null, nextDate:null },
      ],
      isAchieved:false,
      isStudyProgram:true,
  },
    {
      id:2,
      category: 'Back-end Development',
      description: 'Study module about NodeJS',
      title: 'NodeJS',
      difficultyLevel: 6,
      startDate: null,
      expectedEndDate: null,
      questions: [
          { id:1, question: "Qu'est-ce que Node.js?", answer: "Node.js est un environnement d'exécution JavaScript côté serveur basé sur le moteur V8 de Chrome.", image:null,reviewCount:0, confidenceLevel:null, lastReviewedDate:null, nextDate:null },
          { id:2, question: "Comment peut-on lire un fichier de manière asynchrone en Node.js?", answer: "En utilisant fs.readFile() de la bibliothèque fs (file system).", image:null,reviewCount:0, confidenceLevel:null, lastReviewedDate:null, nextDate:null },
          { id:3, question: "Qu'est-ce qu'un middleware dans le contexte de Express.js, un framework Node.js?", answer: "Un middleware est une fonction qui a accès aux objets request et response et au prochain middleware dans le cycle de requête-réponse.", image:null,reviewCount:0, confidenceLevel:null, lastReviewedDate:null, nextDate:null },
          { id:4, question: "Comment gérer les versions de Node.js pour différents projets?", answer: "En utilisant des outils comme NVM (Node Version Manager).", image:null,reviewCount:0, confidenceLevel:null, lastReviewedDate:null, nextDate:null },
          { id:5, question: "Quel est le rôle du package.json dans un projet Node.js?", answer: "Il sert à définir les métadonnées, les dépendances et les scripts du projet.", image:null,reviewCount:0, confidenceLevel:null, lastReviewedDate:null, nextDate:null },
      ],
      isAchieved:false,
      isStudyProgram:false,
  },
  {
    id:3,
    category: 'Front-end Framework',
    description: 'Study module about Angular',
    title: 'Angular',
    difficultyLevel: 7,
    startDate: new Date(2023, 11, 24),
    expectedEndDate: new Date(2024, 0, 7),
    questions: [
        { id:1, question: "Qu'est-ce qu'un composant dans Angular?", answer: "Un composant est une classe avec un décorateur @Component, qui encapsule les données et la logique de présentation.", image:null,reviewCount:0, confidenceLevel:null, lastReviewedDate:null, nextDate:null },
        { id:2, question: "Comment créer un service dans Angular?", answer: "En utilisant la commande CLI 'ng generate service nomService'." , image:null,reviewCount:0, confidenceLevel:null, lastReviewedDate:null, nextDate:null},
        { id:3, question: "Quel est le rôle du data binding dans Angular?", answer: "Le data binding permet une communication bidirectionnelle entre le modèle et la vue.", image:null,reviewCount:0, confidenceLevel:null, lastReviewedDate:null, nextDate:null },
        { id:4, question: "Comment gérer la navigation dans une application Angular?", answer: "En utilisant le système de routing d'Angular.", image:null,reviewCount:0, confidenceLevel:null, lastReviewedDate:null, nextDate:null },
        { id:5, question: "Qu'est-ce qu'un module en Angular et à quoi sert-il?", answer: "Un module est un moyen de regrouper des composants, des directives, des services, etc., et organise le code en blocs fonctionnels.", image:null,reviewCount:0, confidenceLevel:null, lastReviewedDate:null, nextDate:null }
  ],
  isAchieved:false,
  isStudyProgram:true,
},
{
  id:4,
  category: 'CSS Framework',
  description: 'Study module about Bootstrap',
  title: 'Bootstrap',
  difficultyLevel: 3,
  startDate: null,
  expectedEndDate: null,
  questions: [
      { id:1, question: "Quel est le principal avantage de l'utilisation de Bootstrap?", answer: "Bootstrap facilite la création de designs web réactifs et esthétiques avec moins d'effort.", image:null,reviewCount:0, confidenceLevel:null, lastReviewedDate:null, nextDate:null },
      { id:2, question: "Comment intégrer Bootstrap dans un projet web?", answer: "En ajoutant le lien CDN dans le fichier HTML ou en installant via npm.", image:null,reviewCount:0, confidenceLevel:null, lastReviewedDate:null, nextDate:null },
      { id:3, question: "Qu'est-ce qu'un système de grille dans Bootstrap?", answer: "Un système de grille permet de créer des mises en page réactives en utilisant des rangées et des colonnes.", image:null,reviewCount:0, confidenceLevel:null, lastReviewedDate:null, nextDate:null },
      { id:4, question: "Donnez un exemple de classe utilitaire en Bootstrap.", answer: "La classe 'text-center' pour centrer le texte.", image:null,reviewCount:0, confidenceLevel:null, lastReviewedDate:null, nextDate:null },
      { id:5, question: "Comment Bootstrap gère-t-il la responsivité?", answer: "Avec des classes préfixées pour différentes tailles d'écran (ex. col-md-6).", image:null,reviewCount:0, confidenceLevel:null, lastReviewedDate:null, nextDate:null },
  ],
  isAchieved:false,
  isStudyProgram:false,
},
{
  id:5,
  category: 'Web Development',
  description: 'Study module about API',
  title: 'API',
  difficultyLevel: 8,
  startDate: new Date(2023, 11, 24),
  expectedEndDate: new Date(2024, 0, 7),
  questions: [
      { id:1, question: "Qu'est-ce qu'une API RESTful?", answer: "Une API qui suit les principes REST, utilisant des requêtes HTTP pour la communication." , image:null,reviewCount:0, confidenceLevel:null, lastReviewedDate:null, nextDate:null},
      { id:2, question: "Comment transmettre des données dans une requête GET?", answer: "En utilisant des paramètres dans l'URL.", image:null,reviewCount:0, confidenceLevel:null, lastReviewedDate:null, nextDate:null },
      { id:3, question: "Quelle est la différence entre une réponse HTTP 200 et 404?", answer: "200 indique un succès, 404 indique que la ressource n'a pas été trouvée.", image:null,reviewCount:0, confidenceLevel:null, lastReviewedDate:null, nextDate:null },
      { id:4, question: "Comment sécuriser une API?", answer: "En utilisant des méthodes comme l'authentification OAuth, des tokens JWT, etc.", image:null,reviewCount:0, confidenceLevel:null, lastReviewedDate:null, nextDate:null },
      { id:5, question: "Qu'est-ce qu'un JSON Web Token (JWT) et à quoi sert-il?", answer: "Un JWT est un moyen sécurisé de transmettre des informations entre parties sous forme de JSON. Il est souvent utilisé pour l'authentification." , image:null,reviewCount:0, confidenceLevel:null, lastReviewedDate:null, nextDate:null},
  ],
  isAchieved:false,
  isStudyProgram:true,
},
 ];
 */


  constructor() {
      this.getLearningPackages().then((res) =>{
          this.learningPackages = res
      })
  }
  async getLearningPackages(): Promise<LearningPackage[]> {
    const response =  await fetch('/api/learningpackages')
    const text = await response.text()
    return JSON.parse(text)
  }
  async getPackageById(id: string): Promise<LearningPackage | undefined> {
    return JSON.parse(
      await(
          await fetch('/api/learningpackages/'+id)
      ).text()
    )
  }
  /*
  getNextId(): number {
    return this.learningPackages.length > 0
      ? Math.max(...this.learningPackages.map(p => p.id)) + 1
      : 1;
  }
  */
  addPackage(newPackage: LearningPackage) { // for creation
    this.learningPackages.push(newPackage);
  }
  deletePackage(id: string): void {
    this.learningPackages = this.learningPackages.filter(p => p.id !== id);
  }
  achievePackage(id: string): void {
    const pkg = this.learningPackages.find(p => p.id === id);
    if (pkg) {
      pkg.isAchieved = true;
      console.log(`Package ${id} achieved`, pkg);
    }
  }
  addPackageToStudy(id: string): void {
    const pkg = this.learningPackages.find(p => p.id === id);
    if (pkg) {
      pkg.isStudyProgram = true;
      pkg.startDate = new Date(); //Today
      pkg.expectedEndDate = new Date(pkg.startDate.getTime() + 14 * 24 * 60 * 60 * 1000); //Today + 2 weeks
    }
  }

  modifyFact(packageId: string, updatedFact: LearningFact): void {
    const pkg = this.learningPackages.find(p => p.id === packageId);
    if (pkg) {
      const fact = pkg.questions.find(f => f.id === updatedFact.id);
      if (fact) {
        fact.question = updatedFact.question;
        fact.answer = updatedFact.answer;
        // other attributs are unchanged
      }
    }
  }
  async addFact(packageId: string, newFact: LearningFact) {
    const pkg = await this.getPackageById(packageId);
    if (pkg) {
      pkg.questions.push(newFact);

    }
  }
  /*
  updateFact(packageId: string, factId: string, confidenceLevel:number): void {
    const pkg = this.learningPackages.find(p => p.id === packageId);
    const fact = pkg?.questions.find(f => f.id === factId);
    if (fact) {
      fact.reviewCount += 1;
      fact.lastReviewedDate = new Date(); // Today
      fact.confidenceLevel = confidenceLevel;
      switch (confidenceLevel) {
        case 1:
          fact.nextDate = new Date(fact.lastReviewedDate.getTime() + 7 * 24 * 60 * 60 * 1000); // +1 week
          break;
        case 2:
          fact.nextDate = new Date(fact.lastReviewedDate.getTime() + 4 * 24 * 60 * 60 * 1000); // +4 days
          break;
        case 3:
          fact.nextDate = new Date(fact.lastReviewedDate.getTime() + 1 * 24 * 60 * 60 * 1000); // +1 day
          break;
        case 4:
          fact.nextDate = new Date(fact.lastReviewedDate.getTime()); // today
          break;
      }
    }
  }
  */
  async loadLearningPackages(): Promise<void> {
    this.learningPackages = this.getActiveLearningPackages();
  }
  getNonActiveLearningPackages(): LearningPackage[] {
    return this.learningPackages.filter(p => !p.isStudyProgram);
  }
  getActiveLearningPackages(): LearningPackage[] {
    return this.learningPackages.filter(p => !p.isAchieved && p.isStudyProgram);
  }
  getAchievedLearningPackages(): LearningPackage[] {
    return this.learningPackages.filter(p => p.isAchieved);
  }
}
