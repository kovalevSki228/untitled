import { TicketBoardService } from './../../shared/services/ticket-board.services';
import { BackendService } from './../../shared/services/backend.services';
import { Category, Ticket, TicketPreview } from './../../shared/shared.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ticket-group',
  templateUrl: './ticket-group.component.html',
  styleUrls: ['./ticket-group.component.scss']
})
export class TicketGroupComponent implements OnInit {
  @Input() category: Category;
  public tickets: TicketPreview[];

  constructor(
    private ticketBoardService: TicketBoardService) {}

  ngOnInit(): void {
    this.ticketBoardService.tickets.subscribe(tickets => this.tickets = tickets);
  }

  getTicketsByCategory(): Ticket[] {
    return this.ticketBoardService.getTicketsByCategory(this.category.id, this.tickets);
  }

  // getTickets(): Ticket[] {
  //   return this.tickets.filter(t => t.categoryId === this.category.id);
  // }

  identify(index, item): void {
    return item.id;
 }
}
