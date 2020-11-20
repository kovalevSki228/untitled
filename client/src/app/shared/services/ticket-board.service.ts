import { map } from 'rxjs/operators';
import { BackendService } from './backend.service';
import { Category, Ticket, User, Comment } from '../shared.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketBoardService {
  private ticketsSubject = new BehaviorSubject<Ticket[]>([]);
  private categoriesSubject = new BehaviorSubject<Category[]>([]);
  private commentsSubject = new BehaviorSubject<Comment[]>([]);
  private ticketsCountSubject = new BehaviorSubject<number>(0);
  public tickets = this.ticketsSubject.asObservable();
  public categories = this.categoriesSubject.asObservable();
  public comments = this.commentsSubject.asObservable();

  constructor(private backendService: BackendService) { }

  public fetchTickets(): void {
    this.backendService.fetchTickets().subscribe(tickets => this.ticketsSubject.next(tickets));
  }

  public fetchCategories(): void {
    this.backendService.fetchCategories()
      .pipe(
        map(categories => categories.sort((a, b) => a.order > b.order ? 1 : -1))
      )
      .subscribe(categories => this.categoriesSubject.next(categories));
  }

  public fetchComments(): void {
    this.backendService.fetchComments().subscribe(comment => this.commentsSubject.next(comment));
  }

  public getTicketsByCategory(categoryId: number): Observable<Ticket[]> {
    return this.tickets.pipe(
      map(items =>
        items.filter(i => i.categoryId === categoryId)));
  }

  public getTicketComments(ticketId: number): Observable<Comment[]> {
    return this.comments.pipe(
      map(items =>
        items.filter(i => i.ticketId === ticketId)));
  }

  public onCategoryAdded(category: Category): void {
    this.backendService.addCategory(category).subscribe(() => this.fetchCategories());
  }

  public onTicketAdded(ticket: Ticket): void {
    this.backendService.addTicket(ticket).subscribe(() => {this.fetchTickets(); });
  }

  public onTicketUpdated(ticket: Ticket): void {
    this.backendService.updateTicket(ticket).subscribe(() => this.fetchTickets());
  }

  public onCommentAdded(comment: Comment): void {
    this.backendService.addComment(comment).subscribe(() => this.fetchComments());
  }
}
