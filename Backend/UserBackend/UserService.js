const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const router = express.Router();


// Sequelize setup and model definitions
const sequelizeUser = new Sequelize(
    'user_db',        // Name of the user database
    'new_user',       // Username for the user database
    'new_password',   // Password for the 'new_user' role
    {
        host: 'localhost',
        port: 5432,
        dialect: 'postgres',
    }
);

const User = sequelizeUser.define('User', {
    user_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    session_id: {
        type: DataTypes.UUID,
        allowNull: true,
        defaultValue: DataTypes.UUIDV4,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: 'createdAt',
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    }
});

// Handler functions
async function checkPassword(username, password) {
    const user = await User.findOne({ where: { username: username } });
    if (user && await bcrypt.compare(password, user.password)) {
        return true;
    } else {
        return false;
    }
}

async function addNewUser(username, password) {
    const isNotAvailable = await User.findOne({ where: { username: username } });
    if (isNotAvailable) {
        console.log(`Username ${username} is already in use.`);
        return false;
    } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ username, password: hashedPassword });
        console.log(`Created new user with ID: ${newUser.user_id}`);
        return newUser.user_id;
    }
}
router.use(express.json()); // Built-in middleware for json
 

router.get('/login', function (req, res) {
    res.sendFile('index.html', { root: './frontend/dist' });
});

router.get('/register', function (req, res) {
    res.sendFile('index.html', { root: './frontend/dist' });
});

function generateSessionID() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

router.post('/login', async function (req, res) {
    const { username, password } = req.body;
    console.log('Login attempt for username:', username);
    const correctPassword = await checkPassword(username, password);
    console.log('Password check result:', correctPassword);
    if (correctPassword) {
        const session_id = generateSessionID();
        res.status(200).json({ session_id });
    } else {
        res.sendStatus(401);
    }
});

router.post('/signup', async function (req, res) {
    const { username, password } = req.body;
    const userCreationResult = await addNewUser(username, password);
    if (!userCreationResult) {
        res.status(409).send('Username is already in use');
    } else {
        res.status(201).json({ user_id: userCreationResult });
    }
});

module.exports = router;