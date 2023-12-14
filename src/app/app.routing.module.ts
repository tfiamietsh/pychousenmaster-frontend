import { Routes, RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'
import { HomeComponent } from './components/home/home.component'
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';

const routes: Routes = [{
    path: '',
    component: HomeComponent,
    title: ''
}, {
    path: 'sign-up',
    component: SignUpComponent
}, {
    path: 'sign-in',
    component: SignInComponent
}, {
    path: '**',
    redirectTo: ''
}];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
