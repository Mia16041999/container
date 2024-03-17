const {
    sequelize,
    User,
    UserLearningPackage,
    LearningFact,
} = require('../Backend/models.js')

const learningPackages = [
    {
        title: 'TypeScript',
        category: 'Programming',
        description:'Flashcards de questions concernant le langage de programmation TypeScript',
        difficultyLevel: 5,
        questions: [
            { question: "Qu'est-ce que TypeScript et comment se différencie-t-il de JavaScript?", answer: "TypeScript est un sur-ensemble de JavaScript qui ajoute des types statiques." },
            { question: "Comment déclarer une variable de type chaîne de caractères en TypeScript?", answer: "let nomVariable: string;" },
            { question: "Quelle est la syntaxe pour créer une interface en TypeScript?", answer: "interface NomInterface { propriete: type; }" },
            { question: "Peut-on utiliser TypeScript avec des frameworks JavaScript comme React ou Angular?", answer: "Oui, TypeScript est compatible avec la plupart des frameworks JavaScript." },
            { question: "Quel est l'avantage principal de l'utilisation des types en TypeScript?", answer: "Il améliore la fiabilité du code en ajoutant une vérification de type au moment de la compilation." },
        ],
        isAchieved:false,
        isStudyProgram:true,
    },
    {
        title: 'NodeJS',
        category: 'Back-end Development',
        description:'Flashcards de questions concernant le framework de programmation NodeJS',
        difficultyLevel: 6,
        questions: [
            { question: "Qu'est-ce que Node.js?", answer: "Node.js est un environnement d'exécution JavaScript côté serveur basé sur le moteur V8 de Chrome." },
            { question: "Comment peut-on lire un fichier de manière asynchrone en Node.js?", answer: "En utilisant fs.readFile() de la bibliothèque fs (file system)." },
            { question: "Qu'est-ce qu'un middleware dans le contexte de Express.js, un framework Node.js?", answer: "Un middleware est une fonction qui a accès aux objets request et response et au prochain middleware dans le cycle de requête-réponse." },
            { question: "Comment gérer les versions de Node.js pour différents projets?", answer: "En utilisant des outils comme NVM (Node Version Manager)." },
            { question: "Quel est le rôle du package.json dans un projet Node.js?", answer: "Il sert à définir les métadonnées, les dépendances et les scripts du projet." },
        ],
        isAchieved:false,
        isStudyProgram:true,
    },
    {
        title: 'Angular',
        category: 'Front-end Framework',
        description:'Flashcards de questions concernant le framework de programmation Angular',
        difficultyLevel: 7,
        questions: [
            { question: "Qu'est-ce qu'un composant dans Angular?", answer: "Un composant est une classe avec un décorateur @Component, qui encapsule les données et la logique de présentation." },
            { question: "Comment créer un service dans Angular?", answer: "En utilisant la commande CLI 'ng generate service nomService'." },
            { question: "Quel est le rôle du data binding dans Angular?", answer: "Le data binding permet une communication bidirectionnelle entre le modèle et la vue." },
            { question: "Comment gérer la navigation dans une application Angular?", answer: "En utilisant le système de routing d'Angular." },
            { question: "Qu'est-ce qu'un module en Angular et à quoi sert-il?", answer: "Un module est un moyen de regrouper des composants, des directives, des services, etc., et organise le code en blocs fonctionnels." },
        ],
        isAchieved:false,
        isStudyProgram:true,
    },
    {
        title: 'Bootstrap',
        category: 'CSS Framework',
        description:'Flashcards de questions concernant le framework de programmation CSS : Bootstrap',
        difficultyLevel: 3,
        questions: [
            { question: "Quel est le principal avantage de l'utilisation de Bootstrap?", answer: "Bootstrap facilite la création de designs web réactifs et esthétiques avec moins d'effort." },
            { question: "Comment intégrer Bootstrap dans un projet web?", answer: "En ajoutant le lien CDN dans le fichier HTML ou en installant via npm." },
            { question: "Qu'est-ce qu'un système de grille dans Bootstrap?", answer: "Un système de grille permet de créer des mises en page réactives en utilisant des rangées et des colonnes." },
            { question: "Donnez un exemple de classe utilitaire en Bootstrap.", answer: "La classe 'text-center' pour centrer le texte." },
            { question: "Comment Bootstrap gère-t-il la responsivité?", answer: "Avec des classes préfixées pour différentes tailles d'écran (ex. col-md-6)." },
        ],
        isAchieved:false,
        isStudyProgram:false,
    },
    {
        title: 'API',
        category: 'Web Development',
        description:'Flashcards de questions concernant les APIs',
        difficultyLevel: 8,
        questions: [
            { question: "Qu'est-ce qu'une API RESTful?", answer: "Une API qui suit les principes REST, utilisant des requêtes HTTP pour la communication." },
            { question: "Comment transmettre des données dans une requête GET?", answer: "En utilisant des paramètres dans l'URL." },
            { question: "Quelle est la différence entre une réponse HTTP 200 et 404?", answer: "200 indique un succès, 404 indique que la ressource n'a pas été trouvée."},
            { question: "Comment sécuriser une API?", answer: "En utilisant des méthodes comme l'authentification OAuth, des tokens JWT, etc."},
            { question: "Qu'est-ce qu'un JSON Web Token (JWT) et à quoi sert-il?", answer: "Un JWT est un moyen sécurisé de transmettre des informations entre parties sous forme de JSON. Il est souvent utilisé pour l'authentification." },
        ],
        isAchieved:true,
        isStudyProgram:true,
    },
    {
        title: 'Objects in English',
        category: 'Langues',
        description:'Ce package contient des flashcards pour apprendre le vocabulaire des objets en anglais.',
        difficultyLevel: 3,
        questions: [
            { question: "What is the English word for \"table\"", answer: "Table" },
            { question: "How do you say \"chaise\" in English?", answer: "Chair" },
            { question: "What is the English term for \"livre\"", answer: "Book" },
            { question: "How do you pronounce \"stylo\" in English", answer: "Pen" },
            { question: "What is the English word for \"ordinateur\"", answer: "Computer" },
            { question: "How do you say \"téléphone\" in English", answer: "Phone" },
            { question: "What is the French term for \"car\"", answer: "Voiture" },
            { question: "How do you pronounce \"door\" in French?", answer: "Porte" },
            { question: "What is the English word for \"fenêtre\"?", answer: "Window" },
            { question: "How do you say \"key\" in French?", answer: "Clé/Clef" },

        ],
        isAchieved:true,
        isStudyProgram:true,
    },
    {
        title: 'Objetos en español',
        category: 'Langues',
        description:'Este paquete contiene tarjetas para aprender el vocabulario de los objetos en español.',
        difficultyLevel: 3,
        questions: [
            { question: "¿Cómo se dice \"mesa\" en inglés?", answer: "Table" },
            { question: "¿Cuál es la palabra en español para \"silla\"?", answer: "Silla" },
            { question: "¿Cómo se dice \"libro\" en inglés?", answer: "Book" },
            { question: "¿Cómo se pronuncia \"pluma\" en inglés?", answer: "Pen" },
            { question: "¿Cuál es la palabra en español para \"computadora\"?", answer: "Computer" },
            { question: "¿Cómo se dice \"teléfono\" en inglés?", answer: "Phone" },
            { question: "¿Cuál es el término en español para \"coche\"?", answer: "Car" },
            { question: "¿Cómo se pronuncia \"puerta\" en inglés?", answer: "Door" },
            { question: "¿Cuál es la palabra en español para \"ventana\"?", answer: "Window" },
            { question: "¿Cómo se dice \"llave\" en inglés?", answer: "Key" },

        ],
        isAchieved:false,
        isStudyProgram:false,
    },
    {
        title: 'Capitales européennes',
        category: 'Géographie',
        description:'Ce package contient des flashcards pour apprendre les capitales des villes européennes.',
        difficultyLevel: 3,
        questions: [
            { question: "Quelle est la capitale de la France ?", answer: "Paris" },
            { question: "Quelle est la capitale de l'Espagne ?", answer: "Madrid" },
            { question: "Quelle est la capitale de l'Italie ?", answer: "Rome" },
            { question: "Quelle est la capitale de l'Allemagne ?", answer: "Berlin" },
            { question: "Quelle est la capitale du Royaume-Uni ?", answer: "Londres" },
            { question: "Quelle est la capitale de la Grèce ?", answer: "Athènes" },
            { question: "Quelle est la capitale de la Suède ?", answer: "Stockholm" },
            { question: "Quelle est la capitale de la Pologne ?", answer: "Varsovie" },
            { question: "Quelle est la capitale de la Norvège ?", answer: "Oslo" },
            { question: "Quelle est la capitale de la Suisse ?", answer: "Berne" },

        ],
        isAchieved:false,
        isStudyProgram:false,
    },
];

async function createLearningPackagesAndFacts() {
    const user = await User.create({ username: 'user1', password: '123' });
    const userid = user.user_id
    for (const pkg of learningPackages) {
        let startDate = new Date();
        startDate.setHours(1, 0, 0, 0);
        let expectedEndDate= new Date(startDate.getTime() + 2 * 7 * 24 * 60 * 60 * 1000);
        /*
        if (!pkg.isStudyProgram) {
            startDate = null;
            expectedEndDate = null;
        }
         */
        const lastReviewedDate = new Date();
        lastReviewedDate.setHours(1, 0, 0, 0);

        const userLearningPackage = await UserLearningPackage.create({
            ULP_title: pkg.title,
            ULP_desc: pkg.description,
            ULP_category: pkg.category,
            ULP_difficultyLevel: pkg.difficultyLevel,
            ULP_startDate: startDate,
            ULP_expectedEndDate: expectedEndDate,
            ULP_isAchieved: pkg.isAchieved,
            ULP_isStudyProgram: pkg.isStudyProgram,
            user_id: userid,
        });

        for (const q of pkg.questions) {
            await LearningFact.create({
                LF_question: q.question,
                LF_answer: q.answer,
                LF_lastReviewedDate: lastReviewedDate,
                LF_nextDate: lastReviewedDate,
                ULP_id: userLearningPackage.ULP_id
            });
            //LearningFact.update({})
            console.log('LearningFact created');
        }

    }
}



async function initializeDatabase(force) {
    await sequelize.sync({force:force});
    console.log('Tables created successfully!');
    await createLearningPackagesAndFacts();
    console.log('Learning packages and facts created successfully!');
}

initializeDatabase(true);
