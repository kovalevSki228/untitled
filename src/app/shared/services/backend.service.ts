import { TicketPreview, Category, Comment, User } from '../shared.model';
import { Injectable } from '@angular/core';
import { Ticket } from '../shared.model';
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
  TICKETS: [] as TicketPreview[],
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
  private static createResponse<T>(data: T): Observable<T> {
    return of(cloneDeep(data));
  }

  public fetchCategories(): Observable<Category[]> {
    return BackendService.createResponse(DATABASE.CATEGORIES);
  }

  public fetchTickets(): Observable<TicketPreview[]> {
    return BackendService.createResponse(DATABASE.TICKETS);
  }

  public fetchComments(): Observable<Comment[]> {
    return BackendService.createResponse(DATABASE.COMMENT);
  }

  public getUser(): User {
    return DATABASE.USER[0];
  }

  public addCategory(category: Category): Observable<Category> {
    const newCategory = cloneDeep(category) as Category;
    newCategory.id = generateId();
    DATABASE.CATEGORIES.push(newCategory);
    console.log('Added', newCategory);
    return BackendService.createResponse(newCategory);
  }

  public updateCategory(category: Category): Observable<Category> {
    const newCategory = cloneDeep(category) as Category;
    const oldCategoryIndex = DATABASE.CATEGORIES.findIndex(t => t.id === newCategory.id);
    DATABASE.CATEGORIES[oldCategoryIndex] = newCategory;
    console.log('Update', newCategory);
    return BackendService.createResponse(newCategory);
  }

  public addTicket(ticket: TicketPreview): Observable<TicketPreview> {
    const newTicket = cloneDeep(ticket) as TicketPreview;
    newTicket.id = generateId();
    DATABASE.TICKETS.push(newTicket);
    console.log('Added', newTicket);
    return BackendService.createResponse(ticket);
  }

  public updateTicket(ticket: TicketPreview): Observable<TicketPreview> {
    const newTicket = cloneDeep(ticket) as TicketPreview;
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
