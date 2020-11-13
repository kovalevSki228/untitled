import { Ticket } from 'src/app/shared/shared.model';
import { TicketPreview } from './../../../shared/shared.model';
import { Component, Input, OnInit } from '@angular/core';
import { TicketDetailsComponent } from '../ticket-details/ticket-details.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ticket-preview',
  templateUrl: './ticket-preview.component.html',
  styleUrls: ['./ticket-preview.component.scss']
})
export class TicketPreviewComponent implements OnInit {
  @Input() ticket: TicketPreview;

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void { }

  open(): void {
    console.log("View", this.ticket);
    const modalRef = this.modalService.open(TicketDetailsComponent);
    modalRef.componentInstance.ticket = this.ticket;
    modalRef.result.then();
  }

}
