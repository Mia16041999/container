# Anki clone

## Tech stack & libraries
- Angular
- NodeJS
- ExpressJS
- Postgres
- Sequelize
- LocalStorage for the dark mode (darkreader package)
  
## Features 
- Adding/Editing/Storing/Deleting learning packages
- Adding/Editing/Deleting learning facts
- Learning sessions for each package
- Achieving a package
- Dark mode

## Documentation
### <p align="center">Home</p>
![Home page](https://github.com/raacee/anki_clone/blob/main/images/1homepage.PNG)<p align="center">*Home page*</p>

The home page contains first a navigation bar at its top. This aims to navigate through the different pages of the application to access to the many features implemented.
- We first have **Home** to go to this home page at any moment.
- Secondly, we have a **Packages** dropdown that we will explain just after.
- Thirdly, there is the **Achivements** page that resume all the learning packages that had been studied.
- And fourthly, an **About** page that we will see, summarizes the project.
On the right of the navigation bar, there is a button **Light** that can switch to a **Dark** mode when the user click on it.

We can see three icones on each learning packages that are in the study program :
- **Modify** : access to the learning facts that the user can edit, delete, or add new ones.
![Modify button](https://github.com/raacee/anki_clone/blob/main/images/12homepage.PNG)
- **Delete** : to delete the learning package.
![Delete button](https://github.com/raacee/anki_clone/blob/main/images/13homepage.PNG)
- **Success/Achieve** : to consider the learning package as achieved, so the user has finished studying it and considers it successful.
![Achieve button](https://github.com/raacee/anki_clone/blob/main/images/14homepage.PNG)


### <p align="center">"Packages" dropdown</p>
![Packages dropdown](https://github.com/raacee/anki_clone/blob/main/images/2packagesdropdown.PNG)<p align="center">*Packages dropdown*</p>

The **Packages** dropdown redirects to two pages : 
- The **All packages** : available learning packages created packages by the user, but currently not in its study program (stand-by).
- The **Create a package** : allow the user to create its own learning packages.
#### <p align="center">All packages</p>
![Available learning packages (from Packages)](https://github.com/raacee/anki_clone/blob/main/images/3nonstudypackages.PNG)<p align="center">*Available learning packages (from Packages)*</p>

The packages created by the user that can be modified, delete, or add to the study program (--> home's learning packages)
As the learning packages on the home, we can distinguish the packets by their title, their category and difficulty level.
#### <p align="center">Create a package</p>
![Learning package creation (from Packages)](https://github.com/raacee/anki_clone/blob/main/images/4packagecreation.PNG)<p align="center">*Learning package creation (from Packages)*</p>

The creation of a learning package is easy. The user has to fill the form containing the title, the description, the category and the difficulty level of the learning package. While all these fields are not filled, the *Create Package* button is desactivated.
When the user submit the form, the package is created in the page **All packages** but is empty.
> Here is a test :

![Field required](https://github.com/raacee/anki_clone/blob/main/images/41packagecreation.PNG)<p align="center">*Field required*</p>![Submit button activated](https://github.com/raacee/anki_clone/blob/main/images/42packagecreation.PNG)<p align="center">*Submit button activated*</p>

![The learning package is created](https://github.com/raacee/anki_clone/blob/main/images/43packagecreation.PNG)<p align="center">*The learning package is created*</p>

The created learning package :
![The learning package created is empty](https://github.com/raacee/anki_clone/blob/main/images/44packagecreation.PNG)<p align="center">*The learning package created is empty*</p>


### <p align="center">Learning Facts (flashcards)</p>
> To access to the learning facts of a learning package, click on the *Modify* button :

![The learning facts of the 'TypeScirpt' learning package](https://github.com/raacee/anki_clone/blob/main/images/51modifylearningpackage.PNG)<p align="center">*The learning facts of the 'TypeScirpt' learning package*</p>

We can see the detailled learning facts of the concerned learning package :
- The question in bold,
- the answer in italic just below,
- and the details regarding the learning fact with its review count, the confidence level of the user, the last reviewed date of the learning fact and the next review date based on the confidence level (from 1 to 4, see later).

Also, we distinguish three buttons :
- **Add Fact** : allows to add a learning fact to the package.
- **Modify** : edits the concerned learning fact.
- **Delete** : deletes the concerde learning fact.

#### <p align="center">Add Fact</p>
The creation of a learning fact is easy. The user has to fill the form containing the question and the answer. While all these fields are not filled, the *Add Fact* button is desactivated.
When the user submit the form, the learning fact is created.
> Here is a test :

![Field required](https://github.com/raacee/anki_clone/blob/main/images/52addlearningfact.PNG)<p align="center">*Field required*</p>![Submit button activated](https://github.com/raacee/anki_clone/blob/main/images/53addlearningfact.PNG)<p align="center">*Submit button activated*</p>

![The learning fact is created](https://github.com/raacee/anki_clone/blob/main/images/54addlearningfact.PNG)<p align="center">*The learning fact is created*</p>

#### <p align="center">Modify Fact</p>
It is pretty much the same as the creation of a learning fact, but now it is to edit an existing learning fact. The fields are still required, and there is a *Cancel* button to return back.
![The learning fact is created](https://github.com/raacee/anki_clone/blob/main/images/6modifylearningfact.PNG)<p align="center">*The learning fact is created*</p>

#### <p align="center">Delete Fact</p>
By clicking this button, the user deletes the concerned learning fact from the associated learning package.
![The learning fact before "delete"](https://github.com/raacee/anki_clone/blob/main/images/61deletelearningfact.PNG)<p align="center">*The learning fact before "delete"*</p>

![After "delete" : the learning fact has been deleted](https://github.com/raacee/anki_clone/blob/main/images/62deletelearningfact.PNG)<p align="center">*After "delete" : the learning fact has been deleted*</p>

### <p align="center">Achievements</p>
![The learning packages achieved (study is over and done)](https://github.com/raacee/anki_clone/blob/main/images/7achievements.PNG)<p align="center">*The learning packages achieved (study is over and done)*</p>

### <p align="center">About</p>
There is a small text about the project, by who it is made, how, when, why etc... to know a little bit more about the purpose of this application.
![Summary and context of the application](https://github.com/raacee/anki_clone/blob/main/images/8about.PNG)<p align="center">*Summary and context of the application*</p>

### <p align="center">Light/Dark mode</p>
As discussed earlier, there is a **Light** and **Dark** mode on the top right of the navigation bar.
All the previous images are in *Light mode*, but here is some on *Dark mode* :
![Dark mode of the home](https://github.com/raacee/anki_clone/blob/main/images/91darkmode.PNG)<p align="center">*Dark mode of the home*</p>

![Dark mode of the available learning packages](https://github.com/raacee/anki_clone/blob/main/images/92darkmode.PNG)<p align="center">*Dark mode of the available learning packages*</p>

![Dark mode of the learning facts of a learning package](https://github.com/raacee/anki_clone/blob/main/images/93darkmode.PNG)<p align="center">*Dark mode of the learning facts of a learning package*</p>

### <p align="center">Learning Session</p>
When the user clicks on a learning package from its study program (home), it launches a learning session that goes through the learning facts of the learning package.
![Learning fact's question](https://github.com/raacee/anki_clone/blob/main/images/100questionlearningfact.PNG)<p align="center">*Learning fact's question*</p>

![Learning fact's answer and difficulty of the learning fact](https://github.com/raacee/anki_clone/blob/main/images/100answerlearningfact.PNG)<p align="center">*Learning fact's answer and difficulty of the learning fact*</p>

![End of the learning session](https://github.com/raacee/anki_clone/blob/main/images/100finishlearningfact.PNG)<p align="center">*End of the learning session*</p>

### <p align="center">Login page</p>
When the user goes on the website, he is directed to the login page where he need to insert his username and password. After logging in he is directed to the home page.
![Login Page](https://github.com/raacee/anki_clone/blob/main/images/login_page.png)<p align="center">*Login Page*</p>
<br></br> Once the user is connected we can see his username when he naviagtes to the profile page.
### <p align="center">Profile page</p>
If the user goes to Settings : <br></br>
![Settings](https://github.com/raacee/anki_clone/blob/main/images/settings.png)<p align="center">*Settings*</p>

The user will be directed to his own profile page : 
![Profile page](https://github.com/raacee/anki_clone/blob/main/images/profile_page.png)<p align="center">*Profile Page*</p>



