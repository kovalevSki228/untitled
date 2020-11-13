import { TicketPreview, Category } from './../shared.model';
import { Injectable } from '@angular/core';
import { Ticket } from '../shared.model';
import { cloneDeep } from 'lodash';
import { Observable, of } from 'rxjs';
import { generateId } from '../shared.utils';

const DATABASE = {
  CATEGORIES: [
    {
      id: 1,
      title: 'Todo'
    },
    {
      id: 2,
      title: 'In Progress'
    },
    {
      id: 3,
      title: 'Done'
    }] as Category[],
  TICKETS: [] as TicketPreview[]
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

  public addTicket(ticket: TicketPreview): Observable<TicketPreview> {
    const newTicket = cloneDeep(ticket) as TicketPreview;
    newTicket.id = generateId();
    DATABASE.TICKETS.push(newTicket);
    console.log("Added", newTicket);
    return of(ticket);
  }

  public updateTicket(ticket: TicketPreview): Observable<TicketPreview> {
    const newTicket = cloneDeep(ticket) as TicketPreview;
    const oldTicketIndex = DATABASE.TICKETS.findIndex(t => t.id === newTicket.id);
    DATABASE.TICKETS[oldTicketIndex] = newTicket;
    console.log("Update", newTicket);
    return of(ticket);
  }
}
