import { Routes, RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'
import { HomeComponent } from './components/home/home.component'
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { ProblemComponent } from './components/problem/problem.component';
import { guestOnly } from './helpers/authentication.guard';

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
    path: 'problems/:title',
    component: ProblemComponent
}, {
    path: '**',
    redirectTo: ''
}];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
