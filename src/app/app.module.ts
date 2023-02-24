import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { EditionComponent } from './components/edition/edition.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ImagePipe } from "./pipes/image.pipe";

import { HttpClientModule } from '@angular/common/http';

import { NgxDropzoneModule } from 'ngx-dropzone';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSliderModule } from '@angular/material/slider'; 
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon'; 
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatMenuModule } from '@angular/material/menu';

import { CloudinaryModule } from '@cloudinary/ng'; 


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    EditionComponent,
    ImagePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxDropzoneModule,
    MatButtonModule,
    MatSnackBarModule,
    HttpClientModule,
    CloudinaryModule,
    MatSliderModule,
    MatButtonToggleModule,
    MatIconModule,
    MatProgressBarModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
