import { BackendService } from './backend.services';
import { Category, TicketPreview } from './../shared.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TicketBoardService {
  private ticketsSubject = new BehaviorSubject<TicketPreview[]>([]);
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

  getTicketsByCategory(categoryId: number, tickets: TicketPreview[]): TicketPreview[] {
    return tickets.filter(t => t.categoryId === categoryId);
  }

  onTicketAdded(ticket: TicketPreview): void {
    this.backendService.addTicket(ticket).subscribe(() => this.fetchTickets());
  }

  onTicketUpdate(ticket: TicketPreview): void {
    this.backendService.updateTicket(ticket).subscribe(() => this.fetchTickets());
  }
}
