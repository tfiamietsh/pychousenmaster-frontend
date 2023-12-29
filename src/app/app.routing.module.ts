import { Routes, RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'
import { HomeComponent } from './components/home/home.component'
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { ProblemComponent } from './components/problem/problem.component';
import { UserChallengesComponent } from './components/user-challenges/user-challenges.component';
import { ProblemsComponent } from './components/problems/problems.component';
import { guestOnly, userOnly } from './helpers/authentication.guard';

const routes: Routes = [{
    path: '',
    component: HomeComponent,
    title: ''
}, {
    path: 'sign-up',
    canActivate: [guestOnly],
    component: SignUpComponent
}, {
    path: 'sign-in',
    canActivate: [guestOnly],
    component: SignInComponent
}, {
    path: 'problems',
    component: ProblemsComponent
}, {
    path: 'problems/:title',
    component: ProblemComponent
}, {
    path: 'challenges/:username',
    component: UserChallengesComponent
}, {
    path: '**',
    redirectTo: ''
}];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
