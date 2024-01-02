import { Routes, RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'
import { HomeComponent } from './components/home/home.component'
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { ProblemComponent } from './components/problem/problem.component';
import { UserChallengesComponent } from './components/user-challenges/user-challenges.component';
import { ProblemsComponent } from './components/problems/problems.component';
import { ChallengesComponent } from './components/challenges/challenges.component';
import { guestOnly, userOnly } from './helpers/authentication.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { siteName } from './services/title.service';

const routes: Routes = [{
    path: '',
    component: HomeComponent,
    title: `Home - ${siteName}`
}, {
    path: 'sign-up',
    canActivate: [guestOnly],
    component: SignUpComponent,
    title: `Sign Up - ${siteName}`
}, {
    path: 'sign-in',
    canActivate: [guestOnly],
    component: SignInComponent,
    title: `Sign In - ${siteName}`
}, {
    path: 'problems',
    component: ProblemsComponent,
    title: `Problems - ${siteName}`
}, {
    path: 'problems/:title',
    component: ProblemComponent,
    title: siteName
}, {
    path: 'challenges',
    component: ChallengesComponent,
    title: `Challenges - ${siteName}`
}, {
    path: 'challenges/:username',
    component: UserChallengesComponent,
    title: siteName
}, {
    path: 'profile/:username',
    component: ProfileComponent,
    title: siteName
}, {
    path: '**',
    redirectTo: ''
}];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
