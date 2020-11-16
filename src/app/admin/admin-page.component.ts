import { CategoryDeleteComponent } from './category-delete/category-delete.component';
import { CategoryDetailsComponent } from './category-details/category-details.component';
import { AdminBoardService } from './../shared/services/admin-board.service';
import { Category } from './../shared/shared.model';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  public categories: Category[];
  private countTickets: number;
  constructor(
    private adminBoardService: AdminBoardService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.adminBoardService.categories.subscribe(categories => this.categories = categories);
    this.adminBoardService.fetchCategories();
  }

  onEditCategory(category: Category): void {
    const modalRef = this.modalService.open(CategoryDetailsComponent);
    modalRef.componentInstance.category = category;
    modalRef.result.then();
    console.log('edit', modalRef.result.then());
  }

  onDeleteCategory(category: Category): void {
    const modalRef = this.modalService.open(CategoryDeleteComponent);
    modalRef.componentInstance.isDelete = this.getCountTicketsFromCategory(category.id) === 0;
    console.log('delete', modalRef.result.then());
  }

  getCountTicketsFromCategory(categoryId: number): number {
    this.adminBoardService.getCountTicketsFromCategory(categoryId).subscribe(countTickets => this.countTickets = countTickets);
    return this.countTickets;
  }

}
