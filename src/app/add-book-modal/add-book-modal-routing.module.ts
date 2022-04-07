import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddBookModalPage } from './add-book-modal.page';

const routes: Routes = [
  {
    path: '',
    component: AddBookModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddBookModalPageRoutingModule {}
