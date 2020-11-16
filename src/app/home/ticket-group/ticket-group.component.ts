import { TicketBoardService } from './../../shared/services/ticket-board.services';
import { Category, TicketPreview } from './../../shared/shared.model';
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
    this.ticketBoardService.getTicketsByCategory(this.category.id).subscribe(tickets => this.tickets = tickets);
  }

  identify(index, item): void {
    return item.id;
 }
}
