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
      title: 'Todo',
      ticket: [] as Ticket[]
    },
    {
      id: 2,
      title: 'In Progress',
      ticket: [] as Ticket[]
    },
    {
      id: 3,
      title: 'Done',
      ticket: [] as Ticket[]
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

  public addTicket(ticket: Ticket): Observable<Ticket> {
    const newTicket = cloneDeep(ticket) as Ticket;
    newTicket.id = generateId();
    DATABASE.TICKETS.push(newTicket);
    console.log(ticket);
    return of(ticket);
  }
}
