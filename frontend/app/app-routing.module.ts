import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LearningSessionPageComponent } from './learning-session-page/learning-session-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PackageCreationPageComponent } from './package-creation-page/package-creation-page.component';
import { AchievementsPageComponent } from './achievements-page/achievements-page.component';
import { NonStudyPackagesComponent } from './non-study-packages/non-study-packages.component';
import { LearningFactsPageComponent } from './learning-facts-page/learning-facts-page.component';
import { ModifyLearningFactPageComponent } from './modify-learning-fact-page/modify-learning-fact-page.component';
import { AddLearningFactPageComponent } from './add-learning-fact-page/add-learning-fact-page.component';
import { AboutPageComponent } from './about-page/about-page.component';
import {LocationStrategy, PathLocationStrategy} from "@angular/common";
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: 'learning-session-page/:id', component: LearningSessionPageComponent},
  { path: 'non-study-packages', component: NonStudyPackagesComponent },
  { path: 'achievements-page', component: AchievementsPageComponent },
  { path: 'package-creation-page', component: PackageCreationPageComponent },
  { path: 'learning-facts-page/:id', component: LearningFactsPageComponent },
  { path: 'modify-learning-fact-page/:packageId/:factId', component: ModifyLearningFactPageComponent },
  { path: 'add-learning-fact-page/:packageId', component: AddLearningFactPageComponent },
  { path: 'home-page', component: HomePageComponent },
  { path: 'about-page', component: AboutPageComponent },
  { path : 'login', component:LoginComponent},
  { path : 'profile', component:ProfileComponent},
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: 'home-page', pathMatch: 'full' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true,enableTracing: true})],
  exports: [RouterModule],
  providers: [
    {provide: LocationStrategy, useClass: PathLocationStrategy}
  ],
})
export class AppRoutingModule { }
