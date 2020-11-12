import { Ticket } from 'src/app/shared/shared.model';
import { BackendService } from './backend.services';
import { Ticket, Category } from './../shared.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TicketBoardService {
  private ticketsSubject = new BehaviorSubject<Ticket[]>([]);
  private categoriesSubject = new BehaviorSubject<Category[]>([]);
  public tickets = this.ticketsSubject.asObservable();
  public categories = this.categoriesSubject.asObservable();

  constructor(private backendService: BackendService) { }

  fetchTickets(): void {
    this.backendService.fetchTickets().subscribe(tickets => this.ticketsSubject.next(tickets));
  }

  fetchCategories(): void {
    this.backendService.fetchCategories().subscribe(category => this.categoriesSubject.next(category));
  }

  public getTicketsByCategory(categoryId: number): Ticket[] {
    return this.tickets.pipe(filter(tickets => tickets.categoryId === categoryId)) as Ticket[];
  }

  onTicketAdded(ticket: Ticket): void {
    this.backendService.addTicket(ticket).subscribe(() => this.fetchTickets());
  }
}
