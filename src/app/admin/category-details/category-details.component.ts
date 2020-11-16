import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from './../../shared/shared.model';
import { AdminBoardService } from './../../shared/services/admin-board.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css']
})
export class CategoryDetailsComponent implements OnInit {
  @Input() category: Category;
  public categoryGroup: FormGroup;
  public submitted: boolean;

  constructor(
    public activeModal: NgbActiveModal,
    private adminBoardService: AdminBoardService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.categoryGroup = this.creatCategoryGroup(this.category);
  }

  creatCategoryGroup(category: Category): FormGroup {
    category = category ?? {} as Category;
    return this.fb.group({
      id: [category.id],
      title: [category.title, Validators.required],
      order: [category.order, Validators.required]
    });
  }

  addCategory(): void {
    const category = this.categoryGroup.getRawValue() as Category;
    this.submitted = true;
    if (this.categoryGroup.valid) {
      if (!this.category?.id) {
        this.adminBoardService.onCategoryAdded(category);
      } else {
        this.adminBoardService.onCategoryUpdate(category);
      }
      this.activeModal.close('Close click');
    }
  }
}
