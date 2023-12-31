import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AngularSplitModule } from 'angular-split';
import { FlexModule } from '@angular/flex-layout';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { ProblemComponent } from './components/problem/problem.component';
import { UserChallengesComponent } from './components/user-challenges/user-challenges.component';
import { NewChallengeDialogComponent } from './components/new-challenge-dialog/new-challenge-dialog.component';
import { ProblemsComponent } from './components/problems/problems.component';
import { ChallengesComponent } from './components/challenges/challenges.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NewProblemDialogComponent } from './components/new-problem-dialog/new-problem-dialog.component';
import { SearchComponent } from './components/search/search.component';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { HIGHLIGHT_OPTIONS, HighlightModule } from 'ngx-highlightjs';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        MatToolbarModule,
        MatButtonModule,
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatMenuModule,
        MatCardModule,
        MatTabsModule,
        MatTableModule,
        MatTooltipModule,
        MatExpansionModule,
        MatChipsModule,
        MatDividerModule,
        MatSlideToggleModule,
        MatListModule,
        MatDialogModule,
        MatPaginatorModule,
        MatSelectModule,
        MatProgressBarModule,
        AngularSplitModule,
        FlexModule,
        HighlightModule
    ],
    declarations: [
        AppComponent,
        NavbarComponent,
        HomeComponent,
        SignUpComponent,
        SignInComponent,
        ProblemComponent,
        UserChallengesComponent,
        NewChallengeDialogComponent,
        ProblemsComponent,
        ChallengesComponent,
        ProfileComponent,
        NewProblemDialogComponent,
        SearchComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        { provide: HIGHLIGHT_OPTIONS, useValue: {
            coreLibraryLoader: () => import('highlight.js/lib/core'),
            lineNumbersLoader: () => import('ngx-highlightjs/line-numbers'),
            languages: { python: () => import('highlight.js/lib/languages/python') },
            themePath: 'assets/styles/github.min.css'
        }}
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
