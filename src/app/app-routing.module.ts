import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './myComponents/home/home.component';
import { BooksComponent } from './myComponents/books/books.component';
import { ListsComponent } from './myComponents/lists/lists.component';
const routes: Routes = [
  {
    path:'',
    component:HomeComponent,
    children: [
      {
        path:'',
        component: BooksComponent
      },
      {
        path:'lists',
        component: ListsComponent
      }
    ]
  },
  {
    path:'lists',
    component: ListsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
