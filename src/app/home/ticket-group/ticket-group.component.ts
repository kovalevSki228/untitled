import { BackendServices } from './../../shared/services/backend.services';
import { Category, Ticket } from './../../shared/shared.model';
import { Component, Input, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators'

@Component({
  selector: 'app-ticket-group',
  templateUrl: './ticket-group.component.html',
  styleUrls: ['./ticket-group.component.css']
})
export class TicketGroupComponent implements OnInit {
  @Input() ticketGroup: Category;
  public tickets: Ticket[];

  constructor(public backendService: BackendServices) { }

  ngOnInit(): void {
    this.backendService.fetchTickets()
        .subscribe(tickets => this.tickets = tickets);
  }

  getTicked() {
    return  this.tickets.filter(t => t.categoryId === this.ticketGroup.id);
  }
}
