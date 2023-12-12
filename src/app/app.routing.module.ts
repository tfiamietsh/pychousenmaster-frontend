import { Routes, RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'
import { HomeComponent } from './components/home/home.component'
import { SignUpComponent } from './components/sign-up/sign-up.component';

const routes: Routes = [{
    path: '',
    component: HomeComponent,
    title: ''
}, {
    path: 'sign-up',
    component: SignUpComponent
}, {
    path: '**',
    redirectTo: ''
}];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
