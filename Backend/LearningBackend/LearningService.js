const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const router = express.Router();


// ... Include Sequelize setup and model definitions here
const sequelize = new Sequelize(
    'anki_clone', // Name of the database
    'anki',       // Username you've created
    'yourActualPasswordHere',  // The actual password for the 'anki' user
    {
        host: 'localhost',
        port: 5432,
        dialect: 'postgres',
    }
);
// ... Include LearningFact, UserLearningPackage, and other model definitions here
const UserLearningPackage = sequelize.define('UserLearningPackage', {
    ULP_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
    },
    ULP_title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ULP_desc: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    ULP_category: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Uncategorized yet',
    },
    ULP_difficultyLevel: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { min: 1, max: 20 },
    },
    ULP_startDate: {
        type: DataTypes.DATE,
        defaultValue: null,
    },
    ULP_expectedEndDate: {
        type: DataTypes.DATE,
        defaultValue: null,
    },
    ULP_isAchieved: {             
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    ULP_isStudyProgram: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
});

const LearningFact = sequelize.define('LearningFact', {
    LF_ID: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
    },
    LF_question: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    LF_answer: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    LF_image: {
        type: DataTypes.STRING, //store the path of the image
        allowNull: true,
    },
    LF_reviewCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    LF_confidenceLevel: {           //On clique sur un bouton de difficulté ==> renvoie un integer entre 1 et 4
        type: DataTypes.INTEGER,    //Selon le integer, LF_nextDate = SLF_lastReviewedDate + X days
        allowNull: true,
    },
    LF_lastReviewedDate: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    LF_nextDate: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
    },
});

const LearningSession = sequelize.define('LearningSession', {
    LS_id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    LS_date: {
        type: DataTypes.DATE,
    },
    LS_nFlippedLF: {
        type: DataTypes.INTEGER,
    },
    LS_openedULP: {
        type: DataTypes.INTEGER,
    },
});

UserLearningPackage.hasMany(LearningFact, {foreignKey:'ULP_id'});
LearningFact.belongsTo(UserLearningPackage, {foreignKey:'ULP_id'});
//User.hasMany(UserLearningPackage, {foreignKey:'user_id'});
//UserLearningPackage.belongsTo(User, {foreignKey:'user_id'});
//User.hasMany(LearningSession);
//LearningSession.belongsTo(User);


// ... Define all async functions (like getActiveLearningPackages, addNewLearningPackage, etc.) 

async function fetchAllLearningPackages(){
    return await UserLearningPackage.findAll()
}

async function getActiveLearningPackages(){
    const ulps = await UserLearningPackage.findAll({
        where:{
            ULP_isStudyProgram:true,
            ULP_isAchieved:false
        }
    })
    const res = []
    for(const ulp of ulps){
        let ULP = {
            id:ulp.ULP_id,
            category: ulp.ULP_category,
            description: ulp.ULP_description,
            title: ulp.ULP_title,
            difficultyLevel: ulp.ULP_difficultyLevel,
            isAchieved : ulp.ULP_isAchieved,
            isStudyProgram  : ulp.ULP_isStudyProgram
        }
        const lfs = await getUlpLearningFacts(ulp.ULP_id)
        const questions = []
        for(const lf of lfs){
            questions.push({
                id:lf.LF_ID,
                question:lf.LF_question,
                answer:lf.LF_answer,
            })
        }
        ULP.questions = questions
        res.push(ULP)
    }
    return res
}

async function getAllLearningPackages(){
    const ulps = await fetchAllLearningPackages()
    const res = []
    for(const ulp of ulps){
        let ULP = {
            id:ulp.ULP_id,
            category: ulp.ULP_category,
            description: ulp.ULP_description,
            title: ulp.ULP_title,
            difficultyLevel: ulp.ULP_difficultyLevel,
            isAchieved : ulp.ULP_isAchieved,
            isStudyProgram  : ulp.ULP_isStudyProgram
        }
        const lfs = await getUlpLearningFacts(ulp.ULP_id)
        const questions = []
        for(const lf of lfs){
            questions.push({
                id:lf.LF_ID,
                question:lf.LF_question,
                answer:lf.LF_answer,
            })
        }
        ULP.questions = questions
        res.push(ULP)
    }
    return res
}

async function addNewLearningFact(lf){
    const LP = {
        LF_question: lf.question,
        LF_answer: lf.answer,
        LF_image: lf.selectedImage ? lf.selectedImage : null,
        LF_reviewCount:0,
        LF_confidenceLevel:null,
        LF_lastReviewedDate:null,
        LF_nextDate:null
    }
    return LearningFact.create(LP)
}

async function updateFact(lf){
    const lf_obj = {
        LF_reviewCount:lf.reviewCount,
        LF_confidenceLevel:lf.confidenceLevel,
        LF_lastReviewedDate:lf.lastReviewedDate,
        LF_nextDate:lf.nextDate
    }
    await LearningFact.update(lf_obj,{
        where:{
            LF_ID:lf.id
        }
    })
}

async function getULP(id){
    return await UserLearningPackage.findOne({
        where:{
            ULP_id : id
        }
    })
}

async function ulpWithQuestions(id){
    const ulp = await getULP(id)
    const ulpObj = {
        id:ulp.ULP_id,
        category: ulp.ULP_category,
        description: ulp.ULP_description,
        title: ulp.ULP_title,
        difficultyLevel: ulp.ULP_difficultyLevel,
        isAchieved : ulp.ULP_isAchieved,
        isStudyProgram  : ulp.ULP_isStudyProgram
    }
    const lfs = await getUlpLearningFacts(ulp.ULP_id)
    const questions = []
    for(const lf of lfs){
        questions.push({
            id:lf.LF_ID,
            question:lf.LF_question,
            answer:lf.LF_answer,
            reviewCount:lf.LF_reviewCount,
            confidenceLevel:lf.LF_confidenceLevel,
            lastReviewedDate:lf.LF_lastReviewedDate,
            nextDate:lf.LF_nextDate
        })
        ulpObj.questions = questions
    }
    return ulpObj
}

async function getUlpLearningFacts(packageId){
    return await LearningFact.findAll({
        where:{
            ULP_id:packageId
        }
    })
}

async function getInactiveLearningPackages(){
    const nonStudyPackages = []
    const inactiveLP =  await UserLearningPackage.findAll({
        where : {
            ULP_isStudyProgram : false
        }
    })
    for(const ulp of inactiveLP){
        let ULP = {
            id:ulp.ULP_id,
            category: ulp.ULP_category,
            description: ulp.ULP_description,
            title: ulp.ULP_title,
            difficultyLevel: ulp.ULP_difficultyLevel,
            isAchieved : ulp.ULP_isAchieved,
            isStudyProgram  : ulp.ULP_isStudyProgram
        }
        nonStudyPackages.push(ULP)
    }
    return nonStudyPackages
}

async function getLearningFact(id){
    return await LearningFact.findAll({
        where:{
            LF_ID:id
        }
    })
}

async function addNewLearningPackage(lp){
    const ULP = {
        ULP_title: lp.title,
        ULP_desc: lp.description,
        ULP_category: lp.category,
        ULP_difficultyLevel: lp.difficultyLevel,
        ULP_startDate: null,
        ULP_expectedEndDate: null,
        ULP_isAchieved: false
    }
    return UserLearningPackage.create(ULP)
}

async function addLearningFactToLearningPackage(lf_id, lp_id){
    const lf = await LearningFact.update({ULP_id: lp_id},{
        where:{
            LF_ID:lf_id
        }
    })
}

async function editPackageByID(lf_id, changes){
    const changes_LF = {
        LF_answer: changes.answer,
        LF_question: changes.question
    }
    return await LearningFact.update(changes_LF, {
        where :{
            LF_ID : lf_id
        }
    })
}

async function deleteFact(lf_id){
    await LearningFact.destroy({
        where:{
            LF_ID:lf_id
        }
    })
}

async function deletePackage(lp_id){
    await UserLearningPackage.destroy({
        where:{
            ULP_id:lp_id
        }
    })
    await LearningFact.destroy({
        where:{
            ULP_id:lp_id
        }
    })
}

async function addLearningPackageToStudy(lp_id){
    const isStudyProgram = true
    const startDate = new Date().toISOString() // Convert to ISO string for backend compatibility
    const expectedEndDate= new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString() // +2 weeks
    UserLearningPackage.update({
        ULP_isStudyProgram:isStudyProgram,
        ULP_startDate: startDate,
        ULP_expectedEndDate: expectedEndDate
    },{
        where:{
            ULP_id:lp_id
        }
    })
}

async function removeLearningPackageFromStudy(lp_id){
    const isStudyProgram = false
    const startDate = null // Convert to ISO string for backend compatibility
    const expectedEndDate= null
    UserLearningPackage.update({
        ULP_isStudyProgram:isStudyProgram,
        ULP_startDate: startDate,
        ULP_expectedEndDate: expectedEndDate
    },{
        where:{
            ULP_id:lp_id
        }
    })
}

async function addLearningPackageToAchievements(lp_id){
    const isStudyProgram = false
    const startDate = null // Convert to ISO string for backend compatibility
    const expectedEndDate= null
    UserLearningPackage.update({
        ULP_isStudyProgram:isStudyProgram,
        ULP_startDate: startDate,
        ULP_expectedEndDate: expectedEndDate,
        ULP_isAchieved: true
    },{
        where:{
            ULP_id:lp_id
        }
    })
}

async function removeLearningPackageFromAchievements(lp_id){
    const isStudyProgram = false

    UserLearningPackage.update({
        ULP_isStudyProgram:isStudyProgram,
        ULP_isAchieved: true
    },{
        where:{
            ULP_id:lp_id
        }
    })
}

async function getAchievedLearningPackages(){
    const ulps = await UserLearningPackage.findAll({
        where:{
            ULP_isAchieved:true
        }
    })
    const res = []
    for(const ulp of ulps)
    res.push({
        id: ulp.ULP_id,
        category: ulp.ULP_category,
        description: ulp.ULP_description,
        title: ulp.ULP_title,
        difficultyLevel: ulp.ULP_difficultyLevel,
        isAchieved: ulp.ULP_isAchieved,
        isStudyProgram: ulp.ULP_isStudyProgram
    })
    return res
}

router.use(express.json()); // Built-in middleware for json
// Define all learning service routes

router.get('/', function (req, res) {
    res.sendFile('index.html', {root: './frontend/dist'})
})
router.get('/home-page', function (req, res) {
    res.sendFile('index.html', {root: './frontend/dist'})
})
router.get('/non-study-packages', function (req, res) {
    res.sendFile('index.html', {root: './frontend/dist'})
})
router.get('/lesson-list/:id', function (req, res) {
    res.sendFile('index.html', {root: './frontend/dist'})
})
router.get('/lesson/:id', function (req, res) {
    res.sendFile('index.html', {root: './frontend/dist'})
})
router.get('/test-page1', function (req, res) {
    res.sendFile('index.html', {root: './frontend/dist'})
})
router.get('/achievements-page', function (req, res) {
    res.sendFile('index.html', {root: './frontend/dist'})
})
router.get('/package-creation-page', function (req, res) {
    res.sendFile('index.html', {root: './frontend/dist'})
})
router.get('/learning-facts-page/:id', function (req, res) {
    res.sendFile('index.html', {root: './frontend/dist'})
})
router.get('/modify-learning-fact-page/:packageId/:factId', function (req, res) {
    res.sendFile('index.html', {root: './frontend/dist'})
})
router.get('/add-learning-fact-page/:packageId', function (req, res) {
    res.sendFile('index.html', {root: './frontend/dist'})
})
router.get('/login', function (req, res) {
    res.sendFile('index.html', {root: './frontend/dist'})
})
router.get('/register', function (req, res) {
    res.sendFile('index.html', {root: './frontend/dist'})
})
router.get('/profile', function (req, res) {
    res.sendFile('index.html', {root: './frontend/dist'})
})
router.get('/about-page', function (req, res) {
    res.sendFile('index.html', {root: './frontend/dist'})
})

router.get('/main.js', function (req, res) {
    res.sendFile('main.js', {root: './frontend/dist'})
})
router.get('/vendor.js', function (req, res) {
    res.sendFile('vendor.js', {root: './frontend/dist'})
})
router.get('/polyfills.js', function (req, res) {
    res.sendFile('polyfills.js', {root: './frontend/dist'})
})
router.get('/runtime.js', function (req, res) {
    res.sendFile('runtime.js', {root: './frontend/dist'})
})
router.get('/styles.css', function (req, res) {
    res.sendFile('styles.css', {root: './frontend/dist'})
})

router.get('/api/learningpackages/active', async function (req, res) {
    try {
        const packages = await getActiveLearningPackages();
        res.json(packages); // Make sure you send back JSON
    } catch (error) {
        console.error("Error fetching active learning packages:", error);
        res.status(500).json({ error: 'Internal Server Error' }); // Error should also be in JSON format
    }
});


router.get('/api/learningpackages/:id',
    async function (req, res) {
        res.json(await ulpWithQuestions(req.params['id']))
    })
router.post('/api/learningpackages',
    async function (req, res) {
        const changes = req.body
        await addNewLearningPackage(changes)
        res.sendStatus(201)
    }
)
router.get('/api/non-study-packages', async function (req, res) {
    res.json(await getInactiveLearningPackages())
})


router.patch('/api/learningfact/:id', async function(req, res){
	await editPackageByID(req.params['id'], req.body)
	res.sendStatus(200)
})

router.get('/api/learningfact/:id', async function (req, res) {
    const lf = await getLearningFact(req.params['id'])
    res.json(lf)
})
router.post('/api/learningpackages/:id', async function (req, res) {
    const {LF_ID} = await addNewLearningFact(req.body)
    await addLearningFactToLearningPackage(LF_ID, req.params['id'])
    res.sendStatus(201)
})
router.delete('/api/learningfact/:id', async function (req, res) {
    await deleteFact(req.params['id'])
})
router.delete('/api/learningpackages/:id', async function (req, res) {
    await deletePackage(req.params['id'])
})
router.patch('/api/learningpackages/:id/add-to-study', async function (req, res) {
    await addLearningPackageToStudy(req.params['id'])
})
router.patch('/api/learningpackages/:id/remove-package', async function (req, res) {
    await removeLearningPackageFromStudy(req.params['id'])
})
router.patch('/api/learningpackages/:id/achieve', async function (req, res) {
    await addLearningPackageToAchievements(req.params['id'])
})
router.get('/api/achieved', async function (req, res) {
    res.json(await getAchievedLearningPackages())
})
router.patch('/api/learningfact', async function (req, res) {
    await updateFact(req.body)
})
 
module.exports = router; 