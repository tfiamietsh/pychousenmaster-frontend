import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatMenuModule
    ],
    declarations: [
        AppComponent,
        NavbarComponent
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
