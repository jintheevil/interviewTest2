import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddBookModalPageRoutingModule } from './add-book-modal-routing.module';

import { AddBookModalPage } from './add-book-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddBookModalPageRoutingModule
  ],
  declarations: [AddBookModalPage]
})
export class AddBookModalPageModule {}
