import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  public categoryGroup: FormGroup;
  public submitted: boolean;
  @Input() private category: Category;

  constructor(
    public activeModal: NgbActiveModal,
    private adminDataService: AdminService) { }

  public ngOnInit(): void {
    this.categoryGroup = this.createCategoryGroup(this.category);
  }

  public addCategory(): void {
    const category = this.categoryGroup.getRawValue() as Category;
    this.submitted = true;
    if (this.categoryGroup.valid) {
      if (!this.category?.id) {
        this.adminDataService.onCategoryAdded(category);
      } else {
        this.adminDataService.onCategoryUpdated(category);
      }
      this.activeModal.close();
    }
  }

  private createCategoryGroup(category: Category): FormGroup {
    category = category ?? {} as Category;
    return new FormGroup({
      id: new FormControl(category.id),
      title: new FormControl(category.title, Validators.required),
      order: new FormControl(category.order, Validators.required)
    });
  }
}
