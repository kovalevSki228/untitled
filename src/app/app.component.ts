import { TicketDetailsComponent } from './home/ticket-group/ticket-details/ticket-details.component';

import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'untitled';

  constructor(private modalService: NgbModal) {}

  open(): void {
    const modalRef = this.modalService.open(TicketDetailsComponent).result.then();
  }
}
