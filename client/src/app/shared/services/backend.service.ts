import { Ticket } from 'src/app/shared/shared.model';
import { Category, Comment, User } from '../shared.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { cloneDeep } from 'lodash';
import { Observable, of } from 'rxjs';
import { generateId } from '../shared.utils';
import { environment } from 'src/environments/environment';

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
  private apiUrl: string = environment.apiUrl;

  private static createResponse<T>(data: T): Observable<T> {
    return of(cloneDeep(data));
  }

  constructor(private http: HttpClient) { }

  public fetchCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}category`);
  }

  public fetchTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.apiUrl}ticket`);
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
    return this.http.post<Category>(`${this.apiUrl}category`, newCategory);
  }

  public updateCategory(category: Category): Observable<Category> {
    const newCategory = cloneDeep(category) as Category;
    return this.http.put<Category>(`${this.apiUrl}category/edit`, newCategory);
  }

  public deleteCategory(categoryId: number): Observable<Category> {
    return this.http.delete<Category>(`${this.apiUrl}category/delete/${categoryId}`);
  }

  public addTicket(ticket: Ticket): Observable<Ticket> {
    const newTicket = cloneDeep(ticket) as Ticket;
    newTicket.id = 0;
    return this.http.post<Ticket>(`${this.apiUrl}ticket`, newTicket);
  }

  public updateTicket(ticket: Ticket): Observable<Ticket> {
    const newTicket = cloneDeep(ticket) as Ticket;
    return this.http.put<Ticket>(`${this.apiUrl}ticket/edit`, newTicket);
  }

  public addComment(comment: Comment): Observable<Comment> {
    const newComment = cloneDeep(comment) as Comment;
    newComment.id = generateId();
    DATABASE.COMMENT.push(newComment);
    return BackendService.createResponse(comment);
  }
}
