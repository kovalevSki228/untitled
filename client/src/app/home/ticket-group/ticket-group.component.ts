import { TicketDetailsComponent } from './ticket-details/ticket-details.component';
import { TicketBoardService } from '../../shared/services/ticket-board.service';
import { Category, Ticket } from './../../shared/shared.model';
import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ticket-group',
  templateUrl: './ticket-group.component.html',
  styleUrls: ['./ticket-group.component.scss']
})
export class TicketGroupComponent implements OnInit {
  @Input() public category: Category;
  public tickets: Ticket[];

  constructor(
    private ticketBoardService: TicketBoardService,
    private modalService: NgbModal) {
  }

  public ngOnInit(): void {
    this.ticketBoardService.getTicketsByCategory(this.category.id)
      .subscribe(tickets => {
        this.tickets = tickets;
      });
  }

  public addTicket(categoryid: number): void {
    const modalRef = this.modalService.open(TicketDetailsComponent, { centered: true, scrollable: true });
    modalRef.componentInstance.categoryId = categoryid;
  }

  public identify(index: number, item: Ticket): number {
    return item.id;
  }

  public get ticketsCount(): number {
    return this.tickets.length;
  }

  public onTicketsDropped(droppedTickets: Ticket[]) {
    this.tickets = droppedTickets;
    const updatedTicket = this.tickets.find(t => t.categoryId !== this.category.id);
    if (updatedTicket) {
      updatedTicket.categoryId = this.category.id;
      this.ticketBoardService.onTicketUpdated(updatedTicket);
    }
  }
}
