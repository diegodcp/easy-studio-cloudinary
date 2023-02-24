import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { EditionComponent } from './components/edition/edition.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'edition',
    component: EditionComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
