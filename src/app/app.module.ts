import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { EditionComponent } from './components/edition/edition.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LazyLoadImageModule } from 'ng-lazyload-image';

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
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { CloudinaryModule } from '@cloudinary/ng';
import { DialogComponent } from './pages/home/dialog/dialog.component';
import { WandComponent } from './components/shared/wand/wand.component'; 


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    EditionComponent,
    ImagePipe,
    DialogComponent,
    WandComponent
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
    MatMenuModule,
    MatDialogModule,
    LazyLoadImageModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
