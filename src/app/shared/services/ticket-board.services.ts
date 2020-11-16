import { map } from 'rxjs/operators';
import { BackendService } from './backend.services';
import { Category, TicketPreview, User, Comment } from './../shared.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketBoardService {
  private ticketsSubject = new BehaviorSubject<TicketPreview[]>([]);
  private categoriesSubject = new BehaviorSubject<Category[]>([]);
  private commentsSubject = new BehaviorSubject<Comment[]>([]);
  public tickets = this.ticketsSubject.asObservable();
  public categories = this.categoriesSubject.asObservable();
  public comments = this.commentsSubject.asObservable();

  constructor(private backendService: BackendService) { }

  fetchTickets(): void {
    this.backendService.fetchTickets().subscribe(tickets => this.ticketsSubject.next(tickets));
  }

  fetchCategories(): void {
    this.backendService.fetchCategories()
      .pipe(
        map(category => category.sort((a, b) => a.order > b.order ? 1 : -1))
      )
      .subscribe(category => this.categoriesSubject.next(category));
  }

  fetchComments(): void {
    this.backendService.fetchComments().subscribe(comment => this.commentsSubject.next(comment));
  }

  getUser(): User {
    return this.backendService.getUser();
  }

  getTicketsByCategory(categoryId: number): Observable<TicketPreview[]> {
    return this.tickets.pipe(
      map(items =>
        items.filter(i => i.categoryId === categoryId)));
  }

  getCommentsByCategory(ticketId: number): Observable<Comment[]> {
    return this.comments.pipe(
      map(items =>
        items.filter(i => i.ticketId === ticketId)));
  }

  onCategoryAdded(category: Category): void {
    this.backendService.addCategory(category).subscribe(() => this.fetchCategories());
  }

  onTicketAdded(ticket: TicketPreview): void {
    this.backendService.addTicket(ticket).subscribe(() => this.fetchTickets());
  }

  onTicketUpdate(ticket: TicketPreview): void {
    this.backendService.updateTicket(ticket).subscribe(() => this.fetchTickets());
  }

  onCommentAdded(comment: Comment): void {
    this.backendService.addComment(comment).subscribe(() => this.fetchComments());
  }
}
