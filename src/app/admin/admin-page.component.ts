import { DeleteCategoryModalComponent } from './delete-category-modal/delete-category-modal.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { Category } from './../shared/shared.model';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from './../shared/services/admin.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  public categories: Category[];
  private countTickets: number;
  constructor(
    private adminService: AdminService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.adminService.categories.subscribe(categories => this.categories = categories);
    this.adminService.countTickets.subscribe(count => this.countTickets = count);
    this.adminService.fetchCategories();
  }

  editCategory(category: Category): void {
    const modalRef = this.modalService.open(CategoryFormComponent);
    modalRef.componentInstance.category = category;
    console.log('edit', modalRef.result);
  }

  deleteCategory(category: Category): void {
    const modalRef = this.modalService.open(DeleteCategoryModalComponent);
  }

  getTicketCount(categoryId: number): number {
    this.adminService.getTicketCount(categoryId);
    return this.countTickets;
  }
}
