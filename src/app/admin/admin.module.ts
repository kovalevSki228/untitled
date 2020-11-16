import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CategoryDeleteComponent } from './category-delete/category-delete.component';
import { ReactiveFormsModule, FormGroup, FormsModule } from '@angular/forms';



@NgModule({
  declarations: [CategoryDeleteComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule
  ]
})
export class AdminModule { }
