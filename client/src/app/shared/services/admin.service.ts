import { TicketBoardService } from './ticket-board.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Category, Ticket } from '../shared.model';
import { BackendService } from './backend.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  public categories = new Observable();
  public countTickets = new Observable();
  private categoriesSubject = new BehaviorSubject<Category[]>([]);
  private countTicketsSubject = new BehaviorSubject<number>(0);

  public static countTicketsByCategory(tickets: Ticket[], categoryId: number): number {
    return tickets.filter(t => t.categoryId === categoryId).length;
  }

  constructor(
    private backendService: BackendService,
    private ticketBoardService: TicketBoardService) {
    this.categories = this.categoriesSubject.asObservable();
    this.countTickets = this.countTicketsSubject.asObservable();
  }

  public onCategoryAdded(category: Category): void {
    this.backendService.addCategory(category).subscribe(() => this.ticketBoardService.fetchCategories());
  }

  public onCategoryUpdated(category: Category): void {
    this.backendService.updateCategory(category).subscribe(() => this.ticketBoardService.fetchCategories());
  }

  public onCategoryDeleted(categoryId: number): void {
    this.backendService.deleteCategory(categoryId).subscribe(() => this.ticketBoardService.fetchCategories());
  }
}
