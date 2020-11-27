import { Comment } from 'src/app/shared/shared.model';
import { TicketBoardService } from '../../../shared/services/ticket-board.service';
import { Ticket } from './../../../shared/shared.model';
import { Component, Input, OnInit } from '@angular/core';
import { TicketDetailsComponent } from '../ticket-details/ticket-details.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ticket-preview',
  templateUrl: './ticket-preview.component.html',
  styleUrls: ['./ticket-preview.component.scss']
})
export class TicketPreviewComponent implements OnInit {
  @Input() ticket: Ticket;
  private comments: Comment[];

  constructor(private modalService: NgbModal,
    public ticketBoardService: TicketBoardService) { }

  public ngOnInit(): void {
    this.ticketBoardService.getTicketComments(this.ticket.id).subscribe(comments => this.comments = comments);
    this.ticketBoardService.fetchComments();
   }

  public viewDetails(): void {
    const modalRef = this.modalService.open(TicketDetailsComponent, { centered: true, scrollable: true });
    modalRef.componentInstance.ticket = this.ticket;
  }
  public get commentCount(): number {
    return this.comments.length;
  }
}
