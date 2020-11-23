import { AdminService } from './../../shared/services/admin.service';
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
  @Input() category: Category;
  public tickets: Ticket[];

  constructor(
    private ticketBoardService: TicketBoardService,
    private adminService: AdminService,
    private modalService: NgbModal) { }

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

  public identify(index, item): void {
    return item.id;
  }

  public get ticketsCount(): number {
    return this.tickets.length;
  }
}