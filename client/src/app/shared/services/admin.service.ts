import { TicketBoardService } from './ticket-board.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Category, Ticket } from '../shared.model';
import { CategoryDataService } from './category-data.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  public categories: Observable<Category[]>;
  private categoriesSubject = new BehaviorSubject<Category[]>([]);

  public static countTicketsByCategory(tickets: Ticket[], categoryId: number): number {
    return tickets.filter(t => t.categoryId === categoryId).length;
  }

  constructor(
    private categoryDataService: CategoryDataService,
    private ticketBoardService: TicketBoardService) {
    this.categories = this.categoriesSubject.asObservable();
  }

  public onCategoryAdded(category: Category): void {
    this.categoryDataService.addCategory(category).subscribe(() => this.ticketBoardService.fetchCategories());
  }

  public onCategoryUpdated(category: Category): void {
    this.categoryDataService.updateCategory(category).subscribe(() => this.ticketBoardService.fetchCategories());
  }

  public onCategoryDeleted(categoryId: number): void {
    this.categoryDataService.deleteCategory(categoryId).subscribe(() => this.ticketBoardService.fetchCategories());
  }
}
