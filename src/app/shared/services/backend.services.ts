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
  TICKETS: [
    {
      id: 1,
      categoryId: 1,
      title: 'Ticket 1',
      description: 'Some quick example text to build on the card title and make up the bulk of'
    },
    {
      id: 2,
      categoryId: 1,
      title: 'Ticket 1',
      description: 'Some quick example text to build on the card title and make up the bulk of'
    },
    {
      id: 3,
      categoryId: 3,
      title: 'Ticket 1',
      description: 'Some quick example text to build on the card title and make up the bulk of'
    },
    {
      id: 4,
      categoryId: 1,
      title: 'Ticket 1',
      description: 'Some quick example text to build on the card title and make up the bulk of'
    },
    {
      id: 5,
      categoryId: 2,
      title: 'Ticket 1',
      description: 'Some quick example text to build on the card title and make up the bulk of'
    },
    {
      id: 6,
      categoryId: 3,
      title: 'Ticket 1',
      description: 'Some quick example text to build on the card title and make up the bulk of'
    },
    {
      id: 7,
      categoryId: 1,
      title: 'Ticket 1',
      description: 'Some quick example text to build on the card title and make up the bulk of'
    }
  ] as TicketPreview[]
};

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private static createResponse<T>(data: T): Observable<T> {
    return of(cloneDeep(data));
  }

  public fetchTickets(): Observable<Ticket[]> {
    return BackendService.createResponse<Ticket[]>(DATABASE.TICKETS);
  }

  public fetchCategories(): Observable<Category[]> {
    return BackendService.createResponse<Category[]>(DATABASE.CATEGORIES);
  }

  public addTicket(ticket: Ticket): Observable<Ticket> {
    const newTicket = cloneDeep(ticket) as Ticket;
    newTicket.id = generateId();
    DATABASE.TICKETS.push(ticket);
    console.log(ticket);
    return of(ticket);
  }
}
