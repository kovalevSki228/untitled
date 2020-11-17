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

  constructor(private backendService: BackendService) { }

  fetchCategories(): void {
    this.backendService.fetchCategories()
      .pipe(
        map(category => category.sort((a, b) => a.order > b.order ? 1 : -1))
      )
      .subscribe(category => {
        this.categoriesSubject.next(category);
        console.log(category);
      });
  }

  onCategoryAdded(category: Category): void {
    this.backendService.addCategory(category).subscribe(() => this.fetchCategories());
  }

  onCategoryUpdated(category: Category): void {
    this.backendService.updateCategory(category).subscribe(() => this.fetchCategories());
  }

  getTicketCount(categoryId: number): void {
    this.backendService.fetchTickets()
      .pipe(
        map(items => items.filter(i => i.categoryId === categoryId).length))
      .subscribe(countTickets => this.countTicketsSubject.next(countTickets));
  }

  static countTicketsByCategory(tickets: Ticket[], categoryId: number): number {
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
