import { TicketPreview, Category } from './../shared.model';
import { Injectable } from '@angular/core';
import { Ticket } from '../shared.model';
import { cloneDeep } from 'lodash';
import { Observable, of } from 'rxjs';

const TicketPreviewDB: Category[] = [
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
    }
];

const TicketDB: TicketPreview[] = [
    {
      id: 1,
      categoryId: 1,
      title: "Ticket 1",
      description: "Some quick example text to build on the card title and make up the bulk of"
    },
    {
      id: 2,
      categoryId: 1,
      title: "Ticket 1",
      description: "Some quick example text to build on the card title and make up the bulk of"
    },
    {
      id: 3,
      categoryId: 3,
      title: "Ticket 1",
      description: "Some quick example text to build on the card title and make up the bulk of"
    },
    {
      id: 4,
      categoryId: 1,
      title: "Ticket 1",
      description: "Some quick example text to build on the card title and make up the bulk of"
    },
    {
      id: 5,
      categoryId: 2,
      title: "Ticket 1",
      description: "Some quick example text to build on the card title and make up the bulk of"
    },
    {
      id: 6,
      categoryId: 3,
      title: "Ticket 1",
      description: "Some quick example text to build on the card title and make up the bulk of"
    },
    {
      id: 7,
      categoryId: 1,
      title: "Ticket 1",
      description: "Some quick example text to build on the card title and make up the bulk of"
    }
]

@Injectable({
  providedIn: 'root'
})

export class BackendServices {
  public fetchTickets(): Observable<Ticket[]> {
    return of(cloneDeep(TicketDB)); 
  }

  public fetchTicketGroups(): Observable<TicketPreview[]> {
    return of(cloneDeep(TicketPreviewDB)); 
  }
}