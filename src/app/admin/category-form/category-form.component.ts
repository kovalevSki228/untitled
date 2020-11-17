import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from '../../shared/shared.model';
import { AdminService } from '../../shared/services/admin.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {
  @Input() category: Category;
  public categoryGroup: FormGroup;
  public submitted: boolean;

  constructor(
    public activeModal: NgbActiveModal,
    private adminService: AdminService,
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
        this.adminService.onCategoryAdded(category);
      } else {
        this.adminService.onCategoryUpdated(category);
      }
      this.activeModal.close();
    }
  }
}
