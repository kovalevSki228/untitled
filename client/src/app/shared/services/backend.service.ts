import { Ticket } from 'src/app/shared/shared.model';
import { Category, Comment, User } from '../shared.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { cloneDeep } from 'lodash';
import { Observable, of } from 'rxjs';
import { generateId } from '../shared.utils';

const DATABASE = {
  CATEGORIES: [
    {
      id: 1,
      order: 0,
      title: 'Todo'
    },
    {
      id: 2,
      order: 1,
      title: 'In Progress'
    },
    {
      id: 3,
      order: 2,
      title: 'Done'
    }] as Category[],
  TICKETS: [] as Ticket[],
  COMMENT: [] as Comment[],
  USER: [
    {
      id: 1,
      name: 'kovalevSki',
      password: 'Password1!'
    }] as User[]
};

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient) { }

  private static createResponse<T>(data: T): Observable<T> {
    return of(cloneDeep(data));
  }

  public fetchCategories(): Observable<Category[]> {
    //return this.http.request<Category[]>('https://localhost:44332/api/category');
    return this.http.get<Category[]>('https://localhost:44332/api/category');
  }

  public fetchTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>('https://localhost:44332/api/ticket');
  }

  public fetchComments(): Observable<Comment[]> {
    return BackendService.createResponse(DATABASE.COMMENT);
  }

  public getUser(): User {
    return DATABASE.USER[0];
  }

  public addCategory(category: Category): Observable<Category> {
    const newCategory = cloneDeep(category) as Category;
    newCategory.id = 0;
    return this.http.post<Category>('https://localhost:44332/api/category/create', newCategory);
  }

  public updateCategory(category: Category): Observable<Category> {
    const newCategory = cloneDeep(category) as Category;
    return this.http.post<Category>('https://localhost:44332/api/category/edit', newCategory);
  }

  public deleteCategory(categoryId: number): Observable<Category> {
    return this.http.post<Category>('https://localhost:44332/api/category/delete', categoryId);
  }

  public addTicket(ticket: Ticket): Observable<Ticket> {
    const newTicket = cloneDeep(ticket) as Ticket;
    newTicket.id = 0;
    return this.http.post<Ticket>('https://localhost:44332/api/ticket/create', newTicket);
  }

  public updateTicket(ticket: Ticket): Observable<Ticket> {
    const newTicket = cloneDeep(ticket) as Ticket;
    const oldTicketIndex = DATABASE.TICKETS.findIndex(t => t.id === newTicket.id);
    DATABASE.TICKETS[oldTicketIndex] = newTicket;
    console.log('Update', newTicket);
    return BackendService.createResponse(ticket);
  }

  public addComment(comment: Comment): Observable<Comment> {
    const newComment = cloneDeep(comment) as Comment;
    newComment.id = generateId();
    DATABASE.COMMENT.push(newComment);
    console.log('Added', newComment);
    return BackendService.createResponse(comment);
  }
}
