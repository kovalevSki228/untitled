import { TicketBoardService } from './ticket-board.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category, Ticket } from '../shared.model';
import { BackendService } from './backend.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private categoriesSubject = new BehaviorSubject<Category[]>([]);
  public categories = this.categoriesSubject.asObservable();
  private countTicketsSubject = new BehaviorSubject<number>(0);
  public countTickets = this.countTicketsSubject.asObservable();

  constructor(
    private backendService: BackendService,
    private ticketBoardService: TicketBoardService) { }

  public onCategoryAdded(category: Category): void {
    this.backendService.addCategory(category).subscribe(() => this.ticketBoardService.fetchCategories());
  }

  public onCategoryUpdated(category: Category): void {
    this.backendService.updateCategory(category).subscribe(() => this.ticketBoardService.fetchCategories());
  }

  public onCategoryDeleted(categoryId: number): void {
    this.backendService.deleteCategory(categoryId).subscribe(() => this.ticketBoardService.fetchCategories());
  }

  public static countTicketsByCategory(tickets: Ticket[], categoryId: number): number {
    return tickets.filter(t => t.categoryId === categoryId).length;
  }

  // cannotDelete(categoryId: number): boolean {
  //   return !this.getTicketCount(categoryId);
  // }

  // getTicketCount(categoryId: number): void {
  //   this.getCountTicketsFromCategory(categoryId)
  //     .subscribe(countTickets => this.countTicketsSubject.next(countTickets));
  // }
}
