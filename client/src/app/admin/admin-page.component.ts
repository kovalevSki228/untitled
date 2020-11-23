import { TicketBoardService } from './../shared/services/ticket-board.service';
import { DeleteCategoryModalComponent } from './delete-category-modal/delete-category-modal.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { Category, Ticket } from './../shared/shared.model';
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
  private tickets: Ticket[];

  constructor(
    private adminService: AdminService,
    private ticketBoardService: TicketBoardService,
    private modalService: NgbModal) { }

  public ngOnInit(): void {
    this.ticketBoardService.categories.subscribe(categories => this.categories = categories);
    this.ticketBoardService.tickets.subscribe(tickets => this.tickets = tickets);
    this.ticketBoardService.fetchCategories();
    this.ticketBoardService.fetchTickets();
  }

  public editCategory(category: Category): void {
    const modalRef = this.modalService.open(CategoryFormComponent);
    modalRef.componentInstance.category = category;
  }

  public deleteCategory(category: Category): void {
    const modalRef = this.modalService.open(DeleteCategoryModalComponent);
    modalRef.componentInstance.isDeleteActionAvailable = !this.getTicketCount(category.id);
    modalRef.result.then(() => this.adminService .onCategoryDeleted(category.id));
  }

  public getTicketCount(categoryId: number): number {
    return AdminService.countTicketsByCategory(this.tickets, categoryId);
  }
}
