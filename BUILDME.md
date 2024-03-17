# App setup and running
## Setup the database
We're using a postgres database. So you need to have it installed.
You then need to set it up. There are two ways : [using a user made for the app](#making-a-user-for-the-app) 
OR [using the postgres admin user](#using-the-postgres-admin-user). The easier way being the second one, though we don't recommend it.   
Using the admin user is not recommended as this could give malicious code access to your whole database.  
Once your database is set, you can [populate the database](#populating-the-database), [build, and run the application](#build-and-run-the-application)

### Making a user for the app
You can do the following using the ```psql``` shell or a GUI client for postgres. 
Make sure to connect to the database using the postgres user. This can be done in psql with ```\c postgres```.  

First you need to have postgres installed with a database called ```anki_clone```,
a user called ```anki```. The sequelize library use these credentials to connect to the database.
This can be achieved in psql with :
```
postgres=# CREATE USER anki;
postgres=# CREATE DATABASE anki_clone;
```
You have to grant authorizations to anki on the public schema.
```sql
postgres=# GRANT ALL ON SCHEMA public TO anki ;
postgres=# GRANT ALL ON DATABASE anki_clone TO anki ;
postgres=# ALTER DATABASE anki_clone OWNER TO anki;
```

### Using the postgres admin user
You'll need to first create the ```anki_clone``` database as user ```postgres```.
This can be achieved in psql with :
```
postgres=# CREATE DATABASE anki_clone;
```
You need to modify the credentials in the ```model.js``` file:
```js
const sequelize = new Sequelize(
    'anki_clone',
    'postgres',
    < password >,
    {
        host: 'localhost',
        port: 5432,
        dialect: 'postgres',
    });
```
so that you connect to the database with the admin user postgres. 
Do not forget to replace the < password > parameter with the password of your postgres user,
or ```null``` if it doesn't have one.

## Populating the database
You can now check if the app connects to the database using ```node dbconfig/connectionTest.js```  
You can populate the database using ```node dbconfig/populate.js```

## Build and run the application
Clone the project and cd into it. You should be in the same folder as the ```package.json``` file.

To build & serve the app :
1. Install the dependencies with ```npm install```
2. Build the front end files with ```npm run build``` or ```ng build --output-hashing none```
3. Serve the files with ```node backend/server.js```