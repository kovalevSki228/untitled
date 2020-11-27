import { TicketDataService } from './ticket-data.service';
import { map } from 'rxjs/operators';
import { Category, Ticket, Comment } from '../shared.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CategoryDataService } from './category-data.service';
import { CommentDataService } from './comment-data.service';

@Injectable({
  providedIn: 'root'
})
export class TicketBoardService {
  public tickets: Observable<Ticket[]>;
  public categories: Observable<Category[]>;
  public comments: Observable<Comment[]>;
  private ticketsSubject = new BehaviorSubject<Ticket[]>([]);
  private categoriesSubject = new BehaviorSubject<Category[]>([]);
  private commentsSubject = new BehaviorSubject<Comment[]>([]);

  constructor(
    private ticketDataService: TicketDataService,
    private categoryDataService: CategoryDataService,
    private commentDataService: CommentDataService) {
    this.tickets = this.ticketsSubject.asObservable();
    this.categories = this.categoriesSubject.asObservable();
    this.comments = this.commentsSubject.asObservable();
  }

  public fetchTickets(): void {
    this.ticketDataService.fetchTickets().subscribe(tickets => this.ticketsSubject.next(tickets));
  }

  public fetchCategories(): void {
    this.categoryDataService.fetchCategories()
      .pipe(
        map(categories => categories.sort((a, b) => a.order > b.order ? 1 : -1))
      )
      .subscribe(categories => this.categoriesSubject.next(categories));
  }

  public fetchComments(): void {
    this.commentDataService.fetchComments().subscribe(comment => this.commentsSubject.next(comment));
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
    this.categoryDataService.addCategory(category).subscribe(() => this.fetchCategories());
  }

  public onTicketAdded(ticket: Ticket): void {
    this.ticketDataService.addTicket(ticket).subscribe(() => {this.fetchTickets(); });
  }

  public onTicketUpdated(ticket: Ticket): void {
    this.ticketDataService.updateTicket(ticket).subscribe(() => this.fetchTickets());
  }

  public onCommentAdded(comment: Comment): void {
    this.commentDataService.addComment(comment).subscribe(() => this.fetchComments());
  }
}
