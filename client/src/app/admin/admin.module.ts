import { AdminPageComponent } from './admin-page.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DeleteCategoryModalComponent } from './delete-category-modal/delete-category-modal.component';
import { ReactiveFormsModule, FormGroup, FormsModule } from '@angular/forms';
import { InlineSVGModule } from 'ng-inline-svg';

@NgModule({
  declarations: [
    DeleteCategoryModalComponent,
    CategoryFormComponent,
    AdminPageComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    NgbModule,
    InlineSVGModule.forRoot()
  ]
})
export class AdminModule { }
