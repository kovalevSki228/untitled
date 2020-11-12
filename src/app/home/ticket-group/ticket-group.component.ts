import { BackendService } from './../../shared/services/backend.services';
import { Category, Ticket } from './../../shared/shared.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ticket-group',
  templateUrl: './ticket-group.component.html',
  styleUrls: ['./ticket-group.component.scss']
})
export class TicketGroupComponent implements OnInit {
  @Input() category: Category;
  public tickets: Ticket[];

  constructor(public backendService: BackendService) { }

  ngOnInit(): void {
    this.backendService.fetchTickets()
        .subscribe(tickets => this.tickets = tickets);
  }

  getTickets(): Ticket[] {
    return this.tickets.filter(t => t.categoryId === this.category.id);
  }
}
